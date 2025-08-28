import QuizManager from './modules/QuizManager.js';
import QuizUI from './modules/QuizUI.js';
import MultipleChoiceQuestion from './modules/MultipleChoiceQuestion.js';
import TrueFalseQuestion from './modules/TrueFalseQuestion.js';

class QuizApp {
  constructor() {
    this._quizManager = new QuizManager();
    this._quizUI = null;
  }

  restart() {
    this._quizManager.resetQuiz();
    this._quizUI._render();
  }

  init() {
    // Quiz data - all questions in one place
    const quizData = [
      {
        id: 1,
        question: "Which of the following is NOT a primitive data type in JavaScript?",
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
        question: 'The "let" keyword allows variable redeclaration in the same scope.',
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
        question: 'The "this" keyword in JavaScript always refers to the global object.',
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

    // Initialize questions
    quizData.forEach(data => {
      let question;
      if (data.type === "multiple-choice") {
        question = new MultipleChoiceQuestion(data.id, data.question, data.options, data.correctAnswer);
      } else if (data.type === "true-false") {
        question = new TrueFalseQuestion(data.id, data.question, data.correctAnswer);
      }
      this._quizManager._questions.push(question);
    });

    // Load saved answers
    this._quizManager._loadFromStorage();

    // Initialize UI
    const appContainer = document.getElementById("app");
    this._quizUI = new QuizUI(this._quizManager, appContainer);
    this._quizUI.init();

    // Set up global functions for button clicks
    window.resetQuiz = () => this.restart();
    window.submitQuiz = () => this._submitQuiz();
    window.startNewQuiz = () => this.restart();
    window.selectAnswer = (questionId, answer) => {
      this._quizManager.selectAnswer(questionId, answer);
      this._quizUI._updateProgress();
    };
  }

  _submitQuiz() {
    // Check for unanswered questions
    const progress = this._quizManager.getProgress();
    const unansweredCount = progress.total - progress.answered;

    if (unansweredCount > 0) {
      const confirmSubmit = confirm(
        `You have ${unansweredCount} unanswered question(s). Submit anyway?`
      );
      if (!confirmSubmit) {
        return;
      }
    }

    this._quizManager.submitQuiz();
    this._quizUI._render();
  }
}

// Initialize the quiz when page loads
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const app = new QuizApp();
    app.init();
  }, 1000);
});
