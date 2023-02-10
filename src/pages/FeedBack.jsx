import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

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
  }

  generateScoreFeeback = () => {
    const { player: { score } } = this.props;
    const scoreLine = 3;
    if (score < scoreLine) {
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
      </div>
    );
  }
}

FeedBack.propTypes = {
  player: PropTypes.shape({
    assertions: PropTypes.number,
    score: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  player: globalState.player,
});

export default connect(mapStateToProps)(FeedBack);
