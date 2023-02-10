import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedBack extends React.Component {
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
