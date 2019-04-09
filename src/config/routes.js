import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Login } from '../components/Login'
// import isAuthenticated from '../isAuthenticated';

const logout = () => {
  localStorage.removeItem("appToken");
  return <Redirect to='login' />
};

const NoMatch = () => (
  <div>
    no match
  </div>
);

export default [
  <Route exact path="/login" component={Login} />,
  <Route exact component={NoMatch} />
];
