class QuizUI {
  constructor(quizManager, container) {
    this._quizManager = quizManager;
    this._container = container;
  }

  init() {
    this._render();
    this._attachEventListeners();
  }

  _render() {
    if (this._quizManager.isCompleted) {
      this._renderResults();
    } else {
      this._renderQuiz();
    }
  }

  _renderQuiz() {
    let html = '<div class="quiz-content fade-in">';

    // Add progress counter
    const progress = this._quizManager.getProgress();
    html += `
      <div class="question-counter">
        <strong>${progress.answered}</strong> of <strong>${progress.total}</strong> questions answered
      </div>
      
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progress.percentage}%"></div>
      </div>
    `;

    // Add all questions
    this._quizManager.questions.forEach((question) => {
      html += question.render();
    });

    html += "</div>";

    // Add control buttons
    html += `
      <div class="controls">
        <button class="btn btn-reset" onclick="resetQuiz()">🔄 Reset Quiz</button>
        <button class="btn btn-submit" onclick="submitQuiz()">✅ Submit Quiz</button>
      </div>
    `;

    this._container.innerHTML = html;
    this._updateCompletedBar();
  }

  _renderResults() {
    const score = this._quizManager.calculateScore();
    const passClass = score.passed ? "pass" : "fail";
    const emoji = score.passed ? "🎉" : "😞";
    const message = score.passed
      ? `Congratulations! You passed with ${score.percentage.toFixed(1)}%`
      : `You need ${
          this._quizManager.passThreshold * 100
        }% to pass. You scored ${score.percentage.toFixed(1)}%`;

    const html = `
      <div class="results fade-in">
        <div class="score ${passClass}">
          ${emoji}<br>
          ${score.correct} / ${score.total}
        </div>
        <div class="result-message ${passClass}">
          <strong>${message}</strong>
        </div>
        <button class="btn btn-reset" onclick="startNewQuiz()">🆕 Start New Quiz</button>
      </div>
    `;

    this._container.innerHTML = html;
  }

  _attachEventListeners() {
    // Event delegation for option clicks
    this._container.addEventListener('click', (e) => {
      if (e.target.closest('.option')) {
        const option = e.target.closest('.option');
        const questionId = option.dataset.questionId;
        const answer = option.dataset.answer;
        
        // Update the quiz manager
        this._quizManager.selectAnswer(questionId, answer);
        
        // Update the UI
        this._updateOptionSelection(questionId, answer);
      }
    });
  }

  _updateOptionSelection(questionId, selectedAnswer) {
    // Update UI - remove selected class from all options for this question
    const questionCard = this._container.querySelector(
      `[data-question-id="${questionId}"]`
    );
    const allOptions = questionCard.querySelectorAll(".option");
    allOptions.forEach((opt) => opt.classList.remove("selected"));

    // Add selected class to clicked option
    const selectedOption = questionCard.querySelector(
      `[data-answer="${selectedAnswer}"]`
    );
    selectedOption.classList.add("selected");

    // Check the radio button
    const radio = selectedOption.querySelector('input[type="radio"]');
    radio.checked = true;

    // Update progress
    this._updateProgress();
  }

  _updateProgress() {
    const progress = this._quizManager.getProgress();
    const counter = this._container.querySelector(".question-counter");
    const progressFill = this._container.querySelector(".progress-fill");

    if (counter) {
      counter.innerHTML = `<strong>${progress.answered}</strong> of <strong>${progress.total}</strong> questions answered`;
    }
    if (progressFill) {
      progressFill.style.width = `${progress.percentage}%`;
    }

    this._updateCompletedBar();
  }

  _updateCompletedBar() {
    const progress = this._quizManager.getProgress();
    const progressFill = this._container.querySelector(".progress-fill");

    if (progressFill) {
      if (progress.percentage === 100) {
        progressFill.style.background = "#28a745";
      } else {
        progressFill.style.background = "";
      }
    }
  }
}

export default QuizUI;
