import Question from './Question.js';

class MultipleChoiceQuestion extends Question {
  constructor(id, text, options, correctAnswer) {
    super(id, text, 'multiple-choice');
    this._options = options;
    this._correctAnswer = correctAnswer;
  }

  get options() {
    return this._options;
  }

  get correctAnswer() {
    return this._correctAnswer;
  }

  render() {
    let html = `
      <div class="question-card" data-question-id="${this._id}">
        <div class="question-title">
          <span class="question-number">Question ${this._id}:</span> ${this._text}
        </div>
        <div class="options">
    `;

    this._options.forEach((option, index) => {
      const isSelected = this._selectedAnswer == index;
      html += `
        <label class="option ${isSelected ? "selected" : ""}" 
               data-question-id="${this._id}" data-answer="${index}">
          <input type="radio" name="question-${this._id}" value="${index}" 
                 ${isSelected ? "checked" : ""}>
          <span>${option}</span>
        </label>
      `;
    });

    html += "</div></div>";
    return html;
  }

  isCorrect() {
    if (this._selectedAnswer === null) return false;
    return parseInt(this._selectedAnswer) === this._correctAnswer;
  }
}

export default MultipleChoiceQuestion;
