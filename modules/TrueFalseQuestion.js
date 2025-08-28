import Question from './Question.js';

class TrueFalseQuestion extends Question {
  constructor(id, text, correctAnswer) {
    super(id, text, 'true-false');
    this._correctAnswer = correctAnswer;
  }

  get correctAnswer() {
    return this._correctAnswer;
  }

  render() {
    const isTrueSelected = this._selectedAnswer === "true";
    const isFalseSelected = this._selectedAnswer === "false";

    let html = `
      <div class="question-card" data-question-id="${this._id}">
        <div class="question-title">
          <span class="question-number">Question ${this._id}:</span> ${this._text}
        </div>
        <div class="options">
          <label class="option ${isTrueSelected ? "selected" : ""}" 
                 data-question-id="${this._id}" data-answer="true">
            <input type="radio" name="question-${this._id}" value="true" 
                   ${isTrueSelected ? "checked" : ""}>
            <span>True</span>
          </label>
          <label class="option ${isFalseSelected ? "selected" : ""}" 
                 data-question-id="${this._id}" data-answer="false">
            <input type="radio" name="question-${this._id}" value="false" 
                   ${isFalseSelected ? "checked" : ""}>
            <span>False</span>
          </label>
        </div>
      </div>
    `;

    return html;
  }

  isCorrect() {
    if (this._selectedAnswer === null) return false;
    return this._selectedAnswer === this._correctAnswer.toString();
  }
}

export default TrueFalseQuestion;
