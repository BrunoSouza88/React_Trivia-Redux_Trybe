import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  // componentDidMount() {
  //   this.savingRankingLocalStorage();
  // }

  // getPlayers = () => {
  //   const allPlayers = localStorage.getItem('Ranking');
  //   return allPlayers ? JSON.parse(allPlayers) : [];
  // };

  //  savingRankingLocalStorage = () => {
  //   const { player } = this.props;

  //   const playerObj = {
  //     name: player.name,
  //     score: player.score,
  //     picture: player.gravatarEmail,
  //   };
  //   const allPlayersRanking = this.getPlayers();
  //   localStorage.setItem('Ranking', JSON.stringify([...allPlayersRanking, playerObj]));
  // };

  render() {
    // const { player } = this.props;
    const allPlayers = localStorage.getItem('Ranking');
    console.log(allPlayers);
    return (
      <>
        <div>
          <h1 data-testid="ranking-title">Tela de Ranking</h1>
          {/* sort((a, b) => a.score - b.score) */}
          {
            allPlayers.length > 0
            && allPlayers.map((player, index) => ( // allplayers nao esta sendo reconhecido como array
              <div key={ index }>
                <img src={ player.picture } alt="imagem do avatar do jogador" />
                <p data-testid={ `player-name-${player.name}` } />
                <p data-testid={ `player-score-${player.score}` } />
              </div>
            ))
          }
          {/*
          <img src="ImagemVindaDoGravatar" alt="imagem do avatar do jogador" />
          <p data-testid={ `player-name-${player.name}` } />
          <p data-testid={ `player-score-${player.score}` } /> */}
        </div>
        <Link to="/">
          <button data-testid="btn-go-home">Voltar ao inicio</button>
        </Link>

      </>
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
