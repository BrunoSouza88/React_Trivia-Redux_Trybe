import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/settings" component={ Settings } />
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
