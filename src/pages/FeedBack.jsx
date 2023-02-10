import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
