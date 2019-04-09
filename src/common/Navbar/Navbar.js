import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import payload from '../../payload';
import isAuthenticated from '../../isAuthenticated';

class Navbar extends Component {
    
    constructor(){
        super();
        this.state = {
            authenticated: localStorage.getItem('appToken') !== null
        }
    }

    authenticatedRender = () => {
        if(isAuthenticated()){
            return(
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={`/users/${payload()._id}`}>
                            Bienvenido {payload().first_name}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/create-post`}>
                            Nuevo Post
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/logout">
                            Cerrar Sesion
                        </a>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/login">
                            Inicia Sesion
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/signup">
                            Registrate
                        </a>
                    </li>
                </ul>
            )
        }
    }

    render() { 
        return ( 
            <nav className="navbar navbar-expand-ls navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">
                    My Blog Posts
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle Navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    { this.authenticatedRender() }
                </div>
            </nav>

         );
    }
}
 
export default Navbar;