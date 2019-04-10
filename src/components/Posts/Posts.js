import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PostCard from './PostCard';
import loader from '../../common/loader.gif'

const ALLPOSTS = gql`
    query{
        Posts{
            _id,
            title,
            author{
                first_name
            }
        }
    }
`

export default class Posts extends Component{
    render(){
        return(
            <div className="container">
                    <Query query={ALLPOSTS}>
                        {
                            ({data, error, loading}) =>{
                                if(error) return <h4>{error}</h4>
                                if(loading) return <img src={loader}/>
                                const posts = data.Posts.map((post, index) => (
                                    <div className="row" index={index}>
                                        <PostCard
                                            id={post._id}
                                            title={post.title}
                                            first_name={post.author.first_name}
                                        />
                                    </div>
                                ))

                                return(
                                    <React.Fragment>
                                        {posts}
                                    </React.Fragment>
                                )
                            }
                        }
                    </Query>
            </div>
        );
    }
}