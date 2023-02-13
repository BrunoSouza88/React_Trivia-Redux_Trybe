import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

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
    const allPlayers = JSON.parse(localStorage.getItem('Ranking'));
    return (
      <>
        <div>
          <h1 data-testid="ranking-title">Tela de Ranking</h1>
          {
            allPlayers.sort((a, b) => b.score - a.score).map((player, index) => ( // allplayers nao esta sendo reconhecido como array
              <div key={ index }>
                <img src={ `https://www.gravatar.com/avatar/${md5(player.piture).toString()}` } alt="imagem do avatar do jogador" />
                <p data-testid={ `player-name-${index}` }>{ player.name }</p>
                <p data-testid={ `player-score-${index}` }>{ player.score }</p>
              </div>
            ))
          }
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
