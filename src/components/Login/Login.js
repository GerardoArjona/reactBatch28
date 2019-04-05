import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import gpl from 'graphql-tag';
import {Input} from '../../common/Input'

const LOGIN = gpl`
  mutation LOGIN($email:String!, $password:String!){
    login(emil:$email, password:$password){
      token
    }
  }
`

class Login extends Component {

  constructor (props){
    super(props)
    this.state = {
      email:"",
      password:""
    }
  }

  /* Cuando se escribe en un campo de texto, se va guardando letra por letra */
  handleInput = (e) => {
    const {id, value} = e.target

    this.setState({
      [id]:value
    })
  }

  /* Evita que se recargue la página */
  handleForm = (e, login) => {
    e.preventDefaul();
    login({variables: {...this.state}});
  }

  /* */
  catchData = (data ) => {
    const {token} = data.login; // en token se guarda el token del login
    localStorage.setItem('appToken',token); // Se guarda el token para evitar que se logué de nuevo
    this.props.history.push('/') //Redirecciona al home
  }

  catchError = (error) => {
    console.log(error);
  }

  render() { 
    return ( 
      <Mutation mutation={LOGIN}> {/* */}
        {
          (login, {data,error,loading}) => {
            if(data) this.catchData(data);
            if(error) this.catchError(error);
            return(
              <form onSubmit = {e => this.handleForm(e, login)}>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="Email"
                    value={this.state.email}
                    setInput={this.handleInput}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="Password"
                    value={this.state.password}
                    setInput={this.handleInput}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Iniciar sesión
                </button>
              </form>
            );
          }
        }
      </Mutation>
    );
  }
}
 
export default Login;