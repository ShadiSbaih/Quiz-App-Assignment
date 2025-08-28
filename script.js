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
