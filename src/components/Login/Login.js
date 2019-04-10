import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Input } from '../../common/Input';

const LOGIN = gql`
    mutation LOGIN($email:String!, $password:String!){
        login(email:$email, password:$password){
            token
        }
    }
`
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            email:"",
            password:""
         }
    }

    handleInput = (e) => {
        const {id, value} = e.target

        this.setState({
            [id]:value
        })
    }

    handleForm = (e, login) => {

        e.preventDefault();
        login({variables: {...this.state}});
    }

    catchData = (data) => {
        console.log(data);
        const { token } = data.login;
        localStorage.setItem("appToken", token);
        this.props.history.push('/');
    }

    catchError = (error) => {
        console.log(error);
    }

    render() { 
        let isError;
        return ( 
            <Mutation mutation={LOGIN}>
                {
                    (login, {data,error, loading}) => {
                        if(data) this.catchData(data)
                        if(error) {
                            if(error.graphQLErrors[0].message)
                                isError = <h1>Email/Password does not exists </h1>
                        }
                        return(
                            <form onSubmit={e => this.handleForm(e,login)}>
                                <div>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="Email"
                                        value={this.state.email}
                                        setInput={this.handleInput}
                                        required
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="Password"
                                        value={this.state.password}
                                        setInput={this.handleInput}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-success">
                                    Iniciar Sesión
                                </button>
                                {isError}
                            </form>
                        );
                    }
                }
            </Mutation>
         );
    }
}
 
export default Login;