import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TrueOrFalse extends Component {
  render() {
    const { answer, correct } = this.props;
    console.log(answer);
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
                  : null
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

TrueOrFalse.propTypes = {
  answer: PropTypes.arrayOf(PropTypes.string).isRequired,
  correct: PropTypes.string.isRequired,
};
