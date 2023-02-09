import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Login extends React.Component {
  state = {
    email: '',
    validEmail: false,
    name: '',
    validName: false,
  };

  verifyEmail = ({ target: { value } }) => {
    const validaEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(value);
    this.setState({
      validEmail: validaEmail,
      email: value,
    });
  };

  verifyName = ({ target: { value } }) => {
    const minLength = 0;
    const validaName = value.length > minLength;
    this.setState({
      validName: validaName,
      name: value,
    });
  };

  // handleClick = () => {
  //   const { email } = this.state;
  //   const { history, dispatch } = this.props;
  //   dispatch(SaveUserEmail(email));
  //   return history.push('/carteira');
  // };

  render() {
    const {
      // password,
      email,
      // validPassword,
      validEmail,
      name,
      validName
    } = this.state;

    return (
      <div >
        <div >
          <form action="form">
            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.verifyEmail }
              className="loginInput"
              placeholder="E-mail"
            />
            <input
              type="text"
              name="name"
              id="name"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.verifyName }
              placeholder="Digite seu nome"
            />
          </form>
          <button
            type="button"
            disabled={ (validEmail && validName) === false }
            onClick={ this.handleClick }
            data-testid="btn-play"
            className={ (validEmail && validName) === false
              ? 'loginBtnOff' : 'loginBtn' }
          >
            Play
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);