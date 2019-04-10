import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PostCard extends Component{
    render(){
        return(
            <div className="card">
                <div className="card-title">
                    <Link to={`/posts/${this.props.id}`}>
                        <h1>{this.props.title}</h1>
                    </Link>
                </div>
                <div className="card-content">
                    <span className="card-text">
                        {this.props.first_name}
                    </span>
                </div>
            </div>
        );
    }
}