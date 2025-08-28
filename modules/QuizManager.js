class QuizManager {
  constructor() {
    this._questions = [];
    this._isCompleted = false;
    this._storageKey = 'quiz-app-data';
    this._passThreshold = 0.7;
  }

  get questions() {
    return this._questions;
  }

  get isCompleted() {
    return this._isCompleted;
  }

  get passThreshold() {
    return this._passThreshold;
  }

  selectAnswer(questionId, answer) {
    const question = this._questions.find(q => q.id === parseInt(questionId));
    if (question) {
      question.selectAnswer(answer);
      this._saveToStorage();
    }
  }

  resetQuiz() {
    this._questions.forEach(question => question.reset());
    this._isCompleted = false;
    this._clearStorage();
  }

  calculateScore() {
    let correctAnswers = 0;
    const total = this._questions.length;

    this._questions.forEach(question => {
      if (question.isCorrect()) {
        correctAnswers++;
      }
    });

    const percentage = (correctAnswers / total) * 100;
    const passed = correctAnswers / total >= this._passThreshold;

    return {
      correct: correctAnswers,
      total: total,
      percentage: percentage,
      passed: passed,
    };
  }

  submitQuiz() {
    this._isCompleted = true;
    this._clearStorage();
    return this.calculateScore();
  }

  getProgress() {
    const answered = this._questions.filter(q => q.selectedAnswer !== null).length;
    const total = this._questions.length;
    return {
      answered: answered,
      total: total,
      percentage: (answered / total) * 100,
    };
  }

  _initializeQuestions() {
    // This will be called by the main app to populate questions
  }

  _saveToStorage() {
    if (this._isCompleted) return;
    
    try {
      const data = {
        answers: {},
        timestamp: new Date().getTime(),
      };
      
      this._questions.forEach(question => {
        if (question.selectedAnswer !== null) {
          data.answers[question.id] = question.selectedAnswer;
        }
      });
      
      localStorage.setItem(this._storageKey, JSON.stringify(data));
    } catch (e) {
      console.warn("LocalStorage not available");
    }
  }

  _loadFromStorage() {
    try {
      const data = localStorage.getItem(this._storageKey);
      if (data) {
        const parsedData = JSON.parse(data);
        if (parsedData.answers) {
          Object.keys(parsedData.answers).forEach(questionId => {
            const question = this._questions.find(q => q.id === parseInt(questionId));
            if (question) {
              question.selectAnswer(parsedData.answers[questionId]);
            }
          });
        }
      }
    } catch (e) {
      console.warn("LocalStorage not available");
    }
  }

  _clearStorage() {
    try {
      localStorage.removeItem(this._storageKey);
    } catch (e) {
      console.warn("LocalStorage not available");
    }
  }
}

export default QuizManager;
