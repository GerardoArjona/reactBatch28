import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {

  constructor(props){
    super(props)
    this.state = {
      value: props.value
    }
  }

  /* Se ejecuta cuando se cambia el estado (ver documentación para maor información) */
  componentDidUpdate(prevProps){
    if(prevProps.value !== this.props.value){
      this.setState({
        value: this.props.value
      })
    }
  }


  render() { 
    return (
      <React.Fragment>
        <input
          id={this.props.id}
          type={this.props.type}
          className="validate"
          value={this.props.value}
          required={this.props.required}
          onChange={this.props.setInput}
        />
        <label htmlFor={this.props.id}>
          {this.props.name}
        </label>
      </React.Fragment>
    );
  }
}
 
Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  setInput: PropTypes.func.isRequired,
  required: PropTypes.bool
}

Input.defaultProps = {
  required: false
}

export default Input ;