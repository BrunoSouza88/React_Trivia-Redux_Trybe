import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Header from './components/Header';
import FeedBack from './pages/FeedBack';
import Ranking from './components/Ranking';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/game" component={ Game } />
            <Route path="/settings" component={ Settings } />
            <Route path="/feedback" component={ FeedBack } />
            <Route path="/ranking" component={ Ranking } />
          </Switch>
        </header>
      </div>
    );
  }
}

// App.propTypes = {
//   history: PropTypes.shape({
//     location: PropTypes.shape({
//       pathname: PropTypes.string,
//     }),
//   }).isRequired,
// };

export default App;
