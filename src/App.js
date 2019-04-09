import "@babel/polyfill";
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import clientGraphql from './Graphql';
import routes from './config/routes';
import { Navbar as NavbarComponent } from './common/Navbar';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={clientGraphql}>
        <Router>
          <React.Fragment>
            <NavbarComponent />
            <Switch>
              { routes }
            </Switch>
          </React.Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
