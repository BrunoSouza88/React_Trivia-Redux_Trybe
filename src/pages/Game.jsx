import React from 'react';
import PropTypes from 'prop-types';
import MultipleChoice from '../components/MultipleChoice';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      question: {
        category: '',
        type: '',
        difficulty: '',
        question: '',
        correct_answer: '',
        incorrect_answers: [],
      },
      sortAnswer: [],
      questionPosition: 0,
      time: 10,
      isDisable: false,
      answerClass: false,
    };

    this.verifyAnswer = this.verifyAnswer.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.StartTime = this.StartTime.bind(this);
    this.stopWatch = this.stopWatch.bind(this);
    this.generateQuestion = this.generateQuestion.bind(this);
    this.next = this.next.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentDidMount() {
    this.getQuestion();
  }

  componentDidUpdate(props, state) {
    this.next(state);
    this.clear(state);
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
      const objectNull = {
        category: '',
        type: '',
        difficulty: '',
        question: '',
        correct_answer: '',
        incorrect_answers: [],
      };
      this.setState({
        results: [objectNull, ...responseJSON.results],
      });
    }
  }

  verifyAnswer = () => {
    this.setState({ answerClass: true, time: 0 });
    clearInterval(this.killSpotWatch);
  };

  nextQuestion = () => {
    this.setState({
      answerClass: false,
    });
    const position = 5;
    const { questionPosition } = this.state;
    this.StartTime();
    this.stopWatch();
    if (questionPosition < position) {
      this.generateQuestion();
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  next(state) {
    if (state.questionPosition < 1) {
      this.nextQuestion();
    }
  }

  clear(state) {
    const end = 1;
    if (state.time === end) {
      clearInterval(this.killSpotWatch);
      this.setState({
        isDisable: true,
      });
    }
  }

  stopWatch() {
    const ONE_SECUND = 1000;
    this.killSpotWatch = setInterval(() => {
      const { time } = this.state;
      if (time > 0) {
        const secund = time - 1;
        this.setState({
          time: secund,
        });
      } else {
        clearInterval(this.killSpotWatch);
      }
    }, ONE_SECUND);
  }

  StartTime() {
    this.setState({
      time: 10,
      isDisable: false,
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
      isDisable: false,
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
      isDisable,
      answerClass,
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
                  verifyAnswer={ this.verifyAnswer }
                  answer={ sortAnswer }
                  correct={ question.correct_answer }
                  isDisabled={ isDisable }
                  answerClass={ answerClass }
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
