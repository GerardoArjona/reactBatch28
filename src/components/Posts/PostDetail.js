import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import loader from '../../common/loader.gif';
import { Link } from 'react-router-dom';

const SINGLEPOST = gql`
    query SinglePost($id:ID!){
        Post(id:$id){
            _id,
            title,
            content,
            category,
            tags,
            likes,
            author{
                _id,
                first_name,
                last_name,
                email,
                profile_image
            }
        }
    }
`

export default class PostDetail extends Component{
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
                        <Query query={SINGLEPOST} variables={{id:this.state.id}}>
                            {
                                ({loading, data, error}) => {
                                    if(error) return <h4>{error}</h4>
                                    if(loading) return <img src={loader}/>
                                    return(
                                        <React.Fragment>
                                            <h1>{data.Post.title}</h1>
                                            <h1>{data.Post.content}</h1>
                                            <h4>{data.Post.category}</h4>
                                            <h4>{data.Post.tags}</h4>
                                            <h3>{data.Post.likes}</h3>
                                            <br/>
                                            <br/>
                                            <img src={data.Post.author.profile_image} height="42" width="42"/>
                                            <Link to={`/users/${data.Post.author._id}`}>
                                                <h3>{data.Post.author.first_name} {data.Post.author.last_name}</h3>
                                            </Link>
                                            <h3>{data.Post.author.email}</h3>
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