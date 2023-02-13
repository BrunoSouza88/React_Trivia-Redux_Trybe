import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { player: { name, gravatarEmail, score } } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          alt="Imagem gravatar"
        />
        <h2 data-testid="header-player-name">
          { name }
        </h2>
        <p data-testid="header-score">
          { score }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  player: globalState.player,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;
