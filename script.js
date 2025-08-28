// Quiz data - all questions in one place
const quizData = [
  {
    id: 1,
    question:
      "Which of the following is NOT a primitive data type in JavaScript?",
    type: "multiple-choice",
    options: ["string", "number", "object", "boolean"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "JavaScript is a statically typed language.",
    type: "true-false",
    correctAnswer: false,
  },
  {
    id: 3,
    question: 'What does the "==" operator do in JavaScript?',
    type: "multiple-choice",
    options: [
      "Strict equality comparison",
      "Type coercion comparison",
      "Assignment",
      "Not equal comparison",
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question:
      'The "let" keyword allows variable redeclaration in the same scope.',
    type: "true-false",
    correctAnswer: false,
  },
  {
    id: 5,
    question: "Which method is used to add an element to the end of an array?",
    type: "multiple-choice",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: 0,
  },
  {
    id: 6,
    question: "JavaScript supports function hoisting.",
    type: "true-false",
    correctAnswer: true,
  },
  {
    id: 7,
    question: "What is the correct way to create an object in JavaScript?",
    type: "multiple-choice",
    options: [
      "var obj = {};",
      "var obj = [];",
      "var obj = ();",
      'var obj = "";',
    ],
    correctAnswer: 0,
  },
  {
    id: 8,
    question: "Which of these is the correct way to comment in JavaScript?",
    type: "multiple-choice",
    options: [
      "&lt;!-- comment --&gt;",
      "/* comment */",
      "# comment",
      "// comment",
    ],
    correctAnswer: 3,
  },
  {
    id: 9,
    question:
      'The "this" keyword in JavaScript always refers to the global object.',
    type: "true-false",
    correctAnswer: false,
  },
  {
    id: 10,
    question: 'What will "typeof null" return in JavaScript?',
    type: "multiple-choice",
    options: ["null", "undefined", "object", "boolean"],
    correctAnswer: 2,
  },
  {
    id: 11,
    question: 'Arrow functions have their own "this" binding.',
    type: "true-false",
    correctAnswer: false,
  },
  {
    id: 12,
    question: "Which method converts a JSON string to a JavaScript object?",
    type: "multiple-choice",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.object()",
    ],
    correctAnswer: 1,
  },
];

// Global variables to track quiz state
let userAnswers = {}; // Store user's selected answers
let isQuizCompleted = false;
let passThreshold = 0.7; // 70% to pass

// Get DOM elements
const appContainer = document.getElementById("app");

// Initialize the quiz when page loads
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    renderQuiz();
  }, 1000);
});

// Render the entire quiz
function renderQuiz() {
  let html = '<div class="quiz-content fade-in">';

  // Add progress counter
  const progress = getProgress();
  html += `
    <div class="question-counter">
      <strong>${progress.answered}</strong> of <strong>${progress.total}</strong> questions answered
    </div>
    
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${progress.percentage}%"></div>
    </div>
  `;

  // Add all questions
  quizData.forEach((questionData) => {
    html += renderQuestion(questionData);
  });

  html += "</div>";

  // Add control buttons
  html += `
    <div class="controls">
      <button class="btn btn-reset" onclick="resetQuiz()">🔄 Reset Quiz</button>
      <button class="btn btn-submit" onclick="submitQuiz()">✅ Submit Quiz</button>
    </div>
  `;

  appContainer.innerHTML = html;

  // Add event listeners to all options
  addOptionListeners();

  // Update progress bar color after rendering
  updateCompletedBar();
}

// Add click listeners to all option labels
function addOptionListeners() {
  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.addEventListener("click", function () {
      const questionId = this.dataset.questionId;
      const answer = this.dataset.answer;
      selectAnswer(questionId, answer);
    });
  });
}

// Handle answer selection
function selectAnswer(questionId, answer) {
  // Store the answer
  userAnswers[questionId] = answer;

  // Update UI - remove selected class from all options for this question
  const questionCard = document.querySelector(
    `[data-question-id="${questionId}"]`
  );
  const allOptions = questionCard.querySelectorAll(".option");
  allOptions.forEach((opt) => opt.classList.remove("selected"));

  // Add selected class to clicked option
  const selectedOption = questionCard.querySelector(
    `[data-answer="${answer}"]`
  );
  selectedOption.classList.add("selected");

  // Check the radio button
  const radio = selectedOption.querySelector('input[type="radio"]');
  radio.checked = true;

  // Update progress
  updateProgress();
}

// Update progress display
function updateProgress() {
  const progress = getProgress();
  const counter = document.querySelector(".question-counter");
  const progressFill = document.querySelector(".progress-fill");

  if (counter) {
    counter.innerHTML = `<strong>${progress.answered}</strong> of <strong>${progress.total}</strong> questions answered`;
  }
  if (progressFill) {
    progressFill.style.width = `${progress.percentage}%`;
  }

  updateCompletedBar();
}

// Update progress bar color based on completion
function updateCompletedBar() {
  const progress = getProgress();
  const progressFill = document.querySelector(".progress-fill");

  if (progressFill) {
    if (progress.percentage === 100) {
      progressFill.style.background = "#28a745";
    } else {
      progressFill.style.background = "";
    }
  }
}

// Calculate progress
function getProgress() {
  const answered = Object.keys(userAnswers).length;
  const total = quizData.length;
  return {
    answered: answered,
    total: total,
    percentage: (answered / total) * 100,
  };
}

// Reset the quiz
function resetQuiz() {
  userAnswers = {};
  isQuizCompleted = false;
  renderQuiz();
}

// Submit the quiz (placeholder)
function submitQuiz() {
  // Check for unanswered questions
  const unansweredCount = quizData.length - Object.keys(userAnswers).length;

  if (unansweredCount > 0) {
    const confirmSubmit = confirm(
      `You have ${unansweredCount} unanswered question(s). Submit anyway?`
    );
    if (!confirmSubmit) {
      return;
    }
  }

  alert("Quiz submitted! Results functionality coming next...");
}

// Render a single question
function renderQuestion(questionData) {
  let html = `
    <div class="question-card" data-question-id="${questionData.id}">
      <div class="question-title">
        <span class="question-number">Question ${questionData.id}:</span> ${questionData.question}
      </div>
      <div class="options">
  `;

  if (questionData.type === "multiple-choice") {
    // Render multiple choice options
    questionData.options.forEach((option, index) => {
      html += `
        <label class="option" data-question-id="${questionData.id}" data-answer="${index}">
          <input type="radio" name="question-${questionData.id}" value="${index}">
          <span>${option}</span>
        </label>
      `;
    });
  } else if (questionData.type === "true-false") {
    // Render true/false options
    html += `
      <label class="option" data-question-id="${questionData.id}" data-answer="true">
        <input type="radio" name="question-${questionData.id}" value="true">
        <span>True</span>
      </label>
      <label class="option" data-question-id="${questionData.id}" data-answer="false">
        <input type="radio" name="question-${questionData.id}" value="false">
        <span>False</span>
      </label>
    `;
  }

  html += "</div></div>";
  return html;
}
