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

  // Add all questions
  quizData.forEach((questionData) => {
    html += renderQuestion(questionData);
  });

  html += "</div>";

  appContainer.innerHTML = html;
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
