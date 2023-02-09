import React from 'react';
import PropTypes from 'prop-types';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };

    this.getQuestion = this.getQuestion.bind(this);
  }

  async componentDidMount() {
    await this.getQuestion();
  }

  async getQuestion() {
    const API = 'https://opentdb.com/api.php?amount=5&token=';
    const getToken = localStorage.getItem('token');
    const responseAPI = await fetch(API + getToken);
    const responseJSON = await responseAPI.json();
    const responseErro = 3;
    if (responseJSON.response_code === responseErro) {
      localStorage.clear('token');
      const { history } = this.props;
      history.push('/');
    } else {
      this.setState({
        results: responseJSON.results,
      });
    }
  }

  raffleAnswer(answer) {
    const sortAnswer = [];
    for (let index = 0; index < answer.length; index += 1) {
      const sort = Math.floor(Math.random() * (index + 1));
      [answer[index], answer[sort]] = [answer[sort], answer[index]];
    }
    return sortAnswer;
  }

  render() {
    const {
      results: {
        category,
        question,
        correct_answer,
        incorrect_answers,
      } } = this.state;
    const answer = [correct_answer, ...incorrect_answers];
    const raffledAnswer = this.raffleAnswer(answer);
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div>
          {
            answer.length > 2
              ? raffledAnswer.map((data, index) => (
                <p
                  key={ index }
                  data-testid={
                    data === correct_answer
                      ? 'correct-answer'
                      : `wrong-answer-${index}`
                  }
                >
                  {data}
                </p>
              )) : <div>
                <button
                  data-testid="answer-options"
                  type="button"
                >
                  {correct_answer}
                </button>
                <button
                  data-testid="answer-options"
                  type="button"
                >
                  {incorrect_answers}
                </button>
              </div>
          }
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
