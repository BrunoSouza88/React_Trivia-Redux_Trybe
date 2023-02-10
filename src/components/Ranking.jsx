import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const { player } = this.props;

    savingRankingLocalStorage = () => {
      localStorage.setItem('Ranking', JSON.stringify({
        name: player.name,
        score: player.score,
        picture: urlDaFotoGravatar,
      }));

      // savingTokenLocalStorage = () => {
      //   localStorage.setItem('token', tokenRecebidoPelaAPI);
      // };
    };

    return (
      <div>
        <h1>Component Ranking</h1>
        <img src="ImagemVindaDoGravatar" alt="imagem do avatar do jogador" />
        <p data-testid={ `player-name-${player.name}` } />
        <p data-testid={ `player-score-${player.score}` } />
        <Link to="/">
          <button data-testid="btn-go-home">Voltar ao inicio</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  player: globalState.player,
});

Ranking.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Ranking);
