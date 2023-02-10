import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MultipleChoice extends Component {
  render() {
    const { answer, correct } = this.props;
    return (
      <div data-testid="answer-options">
        {
          answer.map((data, index) => (
            <button
              type="button"
              key={ index }
              data-testid={
                data === correct
                  ? 'correct-answer'
                  : `wrong-answer-${index}`
              }
            >
              {data}
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
};
