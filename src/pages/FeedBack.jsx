import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

INICIAL_STATE = {
  feebackMsg: '',
};
class FeedBack extends React.Component {
  componentDidMount() {
    this.generateScoreFeeback();
  }

  generateScoreFeeback = () => {
    // const { score } = this.props;
    const score = 4;
    const scoreLine = 3;
    if (score < scoreLine) {
      this.setState({ feebackMsg: 'Could be better...' });
    }
    this.setState({ feebackMsg: 'Well Done!' });
  };

  render() {
    const { player: {
      assertions,
      score,
    } } = this.props;
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
