import React , { Component, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { render } from 'react-dom';

const validEmailRegex = 
RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
  
  const countErrors = (errors) => {
    let count = 0;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (count = count+1)
    );
    return count;
  }

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
          name: null,
          surname: null,
          email: null,
          number: null,
          password: null,
          errors: {
            name: '',
            surname: '',
            email: '',
            number: '',
            password: '',
          }
        };
      }
      


    
    
    handleChange = (event) => {
        event.preventDefault();
        const { names, value } = event.target;
        let errors = this.state.errors;
      
        switch (names) {
          case 'name': 
            errors.name = 
              value.length < 5
                ? 'name must be 5 characters long!'
                : '';
            break;
          case 'surname': 
            errors.surname = 
              value.length < 5
                ? 'surname must be 5 characters long!'
                : '';
            break;
          case 'email': 
            errors.email = 
              validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
            break;
          case 'number': 
            errors.number = 
              value.length < 5
                ? 'number must be 5 characters long!'
                : '';
            break;
          case 'password': 
            errors.password = 
              value.length < 8
                ? 'Password must be 8 characters long!'
                : '';
            break;
          default:
            break;
        }
      
        this.setState({errors, [names]: value}, ()=> {
            console.log(errors)
        })
      }
      
      handleSubmit = (event) => {
        event.preventDefault();
        this.setState({formValid: validateForm(this.state.errors)});
        this.setState({errorCount: countErrors(this.state.errors)});
      }
    

    render() {

        const {errors, formValid} = this.state;

        return(
            <div className="login-page">
                <div className="login-wave"></div>
                {/*<img className="login-wave" src={require("../img/wave.png")}></img>*/}
                <div className="login-background">
                    <Link to="/"><img className="login-logo" src={require("../img/logo.png")}/></Link>
                    <form className="login-form" noValidate  onSubmit={this.handleSubmit} autoComplete="off">
                        <div className="reg-name">
                            <TextField
                            name="name"
                            onChange={this.handleChange}
                            id="name"
                            placeholder="imię"
                            // value={this.state.name}
                            // color="secondary"
                            />
                            {errors.name.length > 0 && 
                                <span className='error'>{errors.name}</span>}
                        </div>
                        <TextField
                        name="surname"
                        onChange={this.handleChange}
                        id="surname"
                        placeholder="nazwisko"
                        value={this.state.surname}
                        color="secondary"
                        />
                        <TextField
                        type="email"
                        id="email"
                        name="email"
                        placeholder="adres e-mail"
                        onChange={this.handleChange}
                        value={this.state.email}
                        color="secondary"
                        />
                        <TextField
                        type="string"
                        id="number"
                        name="number"
                        placeholder="numer telefonu"
                        pattern="(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)"
                        onChange={this.handleChange}
                        value={this.state.number}
                        color="secondary"
                        />
                        <TextField
                        name="password"
                        type= "password"
                        onChange={this.handleChange}
                        id="password"
                        placeholder="hasło"
                        value={this.state.password}
                        color="secondary"
                        />
                        <button>Zarejestruj</button>
                    </form>
                    
                </div>
            </div>
        )
    }
}


export default SignUp;