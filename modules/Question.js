class Question {
  constructor(id, text, type) {
    this._id = id;
    this._text = text;
    this._type = type;
    this._selectedAnswer = null;
  }

  get id() {
    return this._id;
  }

  get text() {
    return this._text;
  }

  get type() {
    return this._type;
  }

  get selectedAnswer() {
    return this._selectedAnswer;
  }

  selectAnswer(answer) {
    this._selectedAnswer = answer;
  }

  reset() {
    this._selectedAnswer = null;
  }

  getQuestionData() {
    return {
      id: this._id,
      text: this._text,
      type: this._type,
      selectedAnswer: this._selectedAnswer
    };
  }

  render() {
    // Abstract method - to be implemented by subclasses
    throw new Error("render() method must be implemented by subclass");
  }

  isCorrect() {
    // Abstract method - to be implemented by subclasses
    throw new Error("isCorrect() method must be implemented by subclass");
  }
}

export default Question;
