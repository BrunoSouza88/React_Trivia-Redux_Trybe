import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MultipleChoice.css';

export default class MultipleChoice extends Component {
  state = {
    answerClass: false,
  };

  verifyAnswer = () => {
    this.setState({ answerClass: true });
  };

  setClass = (question, correct) => {
    const { answerClass } = this.state;
    if (answerClass) {
      if (question === correct) {
        return 'correctAnswer';
      }
      return 'wrongAnswer';
    }
  };

  render() {
    const { answer, correct, isDisabled } = this.props;
    return (
      <div data-testid="answer-options">
        {
          answer.map((question, index) => (
            <button
              disabled={ isDisabled }
              type="button"
              key={ index }
              data-testid={
                question === correct
                  ? 'correct-answer'
                  : `wrong-answer-${index}`
              }
              onClick={ this.verifyAnswer }
              className={ this.setClass(question, correct) }
            >
              {question}
            </button>
          ))
        }
      </div>
    );
  }
}

MultipleChoice.propTypes = {
  answer: PropTypes.arrayOf(PropTypes.string).isRequired,
  correct: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
