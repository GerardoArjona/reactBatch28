import '@babel/polyfill'
import React, { Component } from 'react';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router'

import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import clientGraphql from './Graphql';
import routes from './config/routes';
import {Navbar as NavbarComponent} from './common/Navbar';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
import { from } from 'zen-observable';

export default App;
