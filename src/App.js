import "@babel/polyfill"
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router';

import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import clientGraphql from './Graphql';
import routes from './config/routes';
import { Navbar as NavbarComponent} from './common/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ApolloProvider client={clientGraphql}>
          <Router>
            <Switch>
              {routes}
            </Switch>
          </Router>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
