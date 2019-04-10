import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import loader from '../../common/loader.gif';
import { Link } from 'react-router-dom';

const SINGLEUSER = gql`
    query SinglePost($id:ID!){
        User(id:$id){
            _id,
            first_name,
            last_name,
            email,
            profile_image,
            posts{
                _id,
                title,
                content,
            }
        }
    }
`

export default class UserDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
           id:props.match.params.id
        }
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Query query={SINGLEUSER} variables={{id:this.state.id}}>
                            {
                                ({loading, data, error}) => {
                                    if(error) return <h4>{error}</h4>
                                    if(loading) return <img src={loader}/>
                                    return(
                                        <React.Fragment>
                                            <img src={data.User.profile_image} height="70" width="70"/>
                                            <h1>{data.User.first_name} {data.User.last_name}</h1>
                                            <h1>{data.User.email}</h1>
                                            <label>POSTS:</label>
                                            <ul>
                                                {data.User.posts.map(post => (
                                                    <li>
                                                        <Link to={`/posts/${post._id}`}>
                                                            <h1>{post.title}</h1>
                                                        </Link>
                                                        <h1>{post.content}</h1>
                                                    </li>
                                                ))}
                                            </ul>
                                        </React.Fragment>
                                    )
                                }
                            }
                        </Query>
                    </div>
                </div>
            </div>
        )
    }

}