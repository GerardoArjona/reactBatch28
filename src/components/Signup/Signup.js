import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';

import Form from './form';

const SIGNUP = gql`
  mutation Register(
    $first_name: String!,
    $last_name: String!,
    $email: String!,
    $password: String!,
    $profile_image: Upload
  ){
  signup(data: {
    first_name: $first_name,
    last_name: $last_name,
    email: $email,
    password: $password,
    profile_image: $profile_image,
  }) {
    token
  }
  }
`;

class SignUp extends React.Component {
  handleSignup = (userData, signup) => {
    console.log(userData);
    signup({ variables: { ...userData } })
  }

  render() {
    return (
      <Mutation mutation={SIGNUP}>
        {
          (signup, { data, error }) => {
            if (data) {
              localStorage.setItem("appToken", data.signup.token);
              return <Redirect to='/' />
            }
            if (error) {
              console.log(error);
              return <h1>Error</h1>
            }
            return (
              <section>
                <h1>Signup</h1>
                <Form
                  handleSignUp={
                    (userData) => this.handleSignup(userData, signup)
                  }
                />
              </section>
            )
          }
        }
      </Mutation>
    );
  }
}

export default SignUp;
