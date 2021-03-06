import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Subscription, Mutation } from 'react-apollo';
import PostCard from './PostCard';
import loader from '../../common/loader.gif';

import FormPost from "./formPost";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { timingSafeEqual } from 'crypto';

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
const POST_REGISTER = gql`
  mutation addPost($title: String!, $content: String!, $category: CATEGORIES!) {
    createPost(
      data: { title: $title, content: $content, category: $category }
    ) {
      title
    }
  }
`;

const NEW_POST = gql`
    subscription {
    newPost{
      title,
      content,
      category
    }
  }
`;

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPosts: []
    };
    this.notificationDOMRef = React.createRef();
  }
  handleCreatePopst = (data, addPost) => {
    addPost({ variables: data });
  };

  addNotification = (data) => {
    this.notificationDOMRef.current.addNotification({
      title: data.newPost.title,
      message: data.newPost.content,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }


  render() {
    return (
      <div className="container">
        <ReactNotification ref={this.notificationDOMRef} />
        <Subscription
          subscription={NEW_POST}
          variables={{}}
        >
          {
            ({ data, loading }) => {
              if (data) { console.log(data) }
              if (loading) return <h1>esperando posts..</h1>
              return (
                <React.Fragment>
                  {this.addNotification(data)}
                </React.Fragment>
              )
            }
          }
        </Subscription>
        <Mutation mutation={POST_REGISTER}>
          {(createPost, { data, error, loading }) => {
            if (data) console.log(data)
            if (error) console.log("Posts Error", error);
            if (loading) return <img src={loader} alt="" />;

            return (
              <FormPost
                handleCreatePopst={data =>
                  this.handleCreatePopst(data, createPost)
                }
              />
            );
          }}
        </Mutation>
        <Query query={ALLPOSTS}>
          {
            ({ data, error, loading }) => {
              if (error) return <h4>{error}</h4>
              if (loading) return <img src={loader} />
              const posts = data ? data.Posts.map((post, index) => (
                <div className="row" index={index}>
                  <PostCard
                    id={post._id || ''}
                    title={post.title || ''}
                    first_name={post.author ? post.author.first_name : ''}
                  />
                </div>
              )) : undefined;

              return (
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