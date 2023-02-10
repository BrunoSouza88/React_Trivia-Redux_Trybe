import React from 'react';

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
    const { feebackMsg } = this.state;
    return (
      <p
        data-testid="feedback-text"
      >
        { feebackMsg }
      </p>

    );
  }
}

export default FeedBack;
