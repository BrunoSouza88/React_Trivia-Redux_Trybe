import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
// import savingRankingLocalStorage from '../components/Ranking';

// INICIAL_STATE = {
//   feebackMsg: '',
// };
class FeedBack extends React.Component {
  constructor() {
    super();
    this.state = {
      feebackMsg: '',
    };
    this.generateScoreFeeback = this.generateScoreFeeback.bind(this);
  }

  componentDidMount() {
    this.generateScoreFeeback();
    this.savingRankingLocalStorage();
  }

  getPlayers = () => {
    const allPlayers = localStorage.getItem('Ranking');
    return allPlayers ? JSON.parse(allPlayers) : [];
  };

  savingRankingLocalStorage = () => {
    const { player } = this.props;

    const playerObj = {
      name: player.name,
      score: player.score,
      picture: player.gravatarEmail,
    };
    const allPlayersRanking = this.getPlayers();
    localStorage.setItem('Ranking', JSON.stringify([...allPlayersRanking, playerObj]));
  };

  generateScoreFeeback = () => {
    const { player: {
      assertions, // aqui estava score, mas precisava ser numero de acertos, não pontuação
    } } = this.props;

    const scoreLine = 3;
    if (assertions < scoreLine) {
      this.setState({ feebackMsg: 'Could be better...' });
    } else {
      this.setState({ feebackMsg: 'Well Done!' });
    }
  };

  render() {
    const { player: {
      assertions,
      score,
    } } = this.props;
    const { feebackMsg } = this.state;
    return (
      <div>
        <Header />
        <h2
          data-testid="feedback-total-score"
        >
          {score}
        </h2>
        <h2
          data-testid="feedback-total-question"
        >
          {assertions}
        </h2>
        <p
          data-testid="feedback-text"
        >
          {feebackMsg}
        </p>
        <Link to="/">
          <button data-testid="btn-play-again">Play Again</button>
        </Link>
        <Link to="/ranking">
          <button data-testid="btn-ranking">Ranking</button>
        </Link>
      </div>
    );
  }
}

FeedBack.propTypes = {
  player: PropTypes.shape({
    assertions: PropTypes.number,
    score: PropTypes.number,
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  player: globalState.player,
});

export default connect(mapStateToProps)(FeedBack);
