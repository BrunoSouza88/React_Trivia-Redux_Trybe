import React from 'react';
import PropTypes from 'prop-types';
import MultipleChoice from '../components/MultipleChoice';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      // question: {
      //   category: '',
      //   type: '',
      //   difficulty: '',
      //   question: '',
      //   correct_answer: '',
      //   incorrect_answers: [],
      // },
      sortAnswer: [],
      questionPosition: 1,
      time: 30,
    };

    this.getQuestion = this.getQuestion.bind(this);
    this.clearTime = this.clearTime.bind(this);
    this.stopWatch = this.stopWatch.bind(this);
    this.generateQuestion = this.generateQuestion.bind(this);
  }

  async componentDidMount() {
    await this.getQuestion();
    this.stopWatch();
    this.generateQuestion();
  }

  componentDidUpdate(props, state) {
    const end = 0;
    if (state.time === end) {
      this.clearTime();
      // this.generateQuestion();
    }
  }

  componentWillUnmount() {
    const { questionPosition } = this.state;
    const maxNumber = 5;
    if (questionPosition > maxNumber) {
      clearInterval(this.killSpotWatch);
    }
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

  nextQuestion = () => {
    const position = 5;
    const { questionPosition } = this.state;
    if (questionPosition < position) {
      this.generateQuestion();
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  stopWatch() {
    const ONE_SECUND = 1000;
    this.killSpotWatch = setInterval(() => {
      const { time } = this.state;
      const secund = time - 1;
      this.setState({
        time: secund,
      });
    }, ONE_SECUND);
  }

  clearTime() {
    this.setState({
      time: 30,
    });
  }

  generateQuestion() {
    const { results, questionPosition } = this.state;
    const question = results[questionPosition];
    const nextPosition = questionPosition + 1;
    const answer = [question.correct_answer, ...question.incorrect_answers];
    const sortAnswer = this.randomAnswer(answer);
    this.setState({
      question,
      questionPosition: nextPosition,
      sortAnswer,
    });
  }

  randomAnswer(answer) {
    for (let index = 0; index < answer.length; index += 1) {
      const position = Math.floor(Math.random() * (index + 1));
      [answer[index], answer[position]] = [answer[position], answer[index]];
    }
    return answer;
  }

  render() {
    const {
      question,
      time,
      sortAnswer,
    } = this.state;

    return (
      <div>
        <Header />
        <p data-testid="question-category">
          { question.category }
        </p>
        <p data-testid="question-text">
          { question.question }
        </p>
        {
          sortAnswer
            ? (
              <>
                <p>{time}</p>
                <MultipleChoice
                  answer={ sortAnswer }
                  correct={ question.correct_answer }
                />
              </>
            )
            : null
        }
        <button
          type="button"
          onClick={ this.nextQuestion }
        >
          Next
        </button>
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
