import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Login } from '../components/Login';
import Signup from '../components/Signup/index'
import { Posts, PostDetail } from '../components/Posts';
import { UserDetail } from '../components/Users';
import isAuthenticated from '../isAuthenticated';

const Logout = () => {
    localStorage.removeItem("appToken");
    return <Redirect to="/login" />
}

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route  {...rest} render={
        (props) => (
            isAuthenticated() 
                ? <Component {...props} /> 
                : <Redirect to="/login" />
        )
    }>
    </Route>
)

export default [
    <Route exact path="/login" component={Login} />,
    <Route exact path="/logout" component={Logout} />,
    <Route exact path="/signup" component={Signup} />,
    // <Route exact path="/signup" component={SignUp} />,
    // <Route component={NoMatchComponent} />
    <PrivateRoute exact path="/" component={Posts}/>,
    <PrivateRoute exact path="/posts/:id" component={PostDetail}/>,
    <PrivateRoute exact path="/users/:id" component={UserDetail}/>

]