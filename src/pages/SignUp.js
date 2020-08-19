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
          formValid: false,
          errorCount: null,
          // name: null,
          // surname: null,
          // email: null,
          // number: null,
          // password: null,
          errors: {
            firstName: '',
            surname: '',
            email: '',
            number: '',
            password: '',
          }
        };
      }
      


    
    
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
      
        switch (name) {
          case 'firstName': 
            errors.firstName = 
              value.length < 3
                ? 'imię jest niepoprawne'
                : '';
            break;
          case 'surname': 
            errors.surname = 
              value.length < 3
                ? 'nazwisko jest niepoprawne'
                : '';
            break;
          case 'email': 
            errors.email = 
              validEmailRegex.test(value)
                ? ''
                : 'e-mail jest niepoprawny';
            break;
          case 'number': 
            errors.number = 
              value.length < 9
                ? 'numer telefonu jest niepoprawny'
                : '';
            break;
          case 'password': 
            errors.password = 
              value.length < 8
                ? 'hasło powinno mieć przynajmniej 8 znaków'
                : '';
            break;
          default:
            break;
        }
      
        this.setState({errors, [name]: value}, ()=> {
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
                    <form className="login-form" noValidate  onSubmit={this.handleSubmit}>
                        <div className="row">
                          <TextField
                          name="firstName"
                          onChange={this.handleChange}
                          id="firstName"
                          placeholder="imię"
                          // value={this.state.name}
                          color="secondary"
                          />
                          {errors.firstName.length > 0 && 
                            <span className='error'>{errors.firstName}</span>}
                        </div>
                        <div className="row">
                          <TextField
                          name="surname"
                          onChange={this.handleChange}
                          id="surname"
                          placeholder="nazwisko"
                          // value={this.state.surname}
                          color="secondary"
                          />
                          {errors.surname.length > 0 && 
                            <span className='error'>{errors.surname}</span>}
                        </div>
                        <div className="row">
                          <TextField 
                          type='email' 
                          name='email' 
                          id="email" 
                          placeholder="adres e-mail" 
                          onChange={this.handleChange} 
                          color="secondary"
                          noValidate />
                          {errors.email.length > 0 && 
                            <span className='error'>{errors.email}</span>}
                        </div>
                        
                        <div className="row">
                          <TextField
                          type="string"
                          id="number"
                          name="number"
                          placeholder="numer telefonu"
                          pattern="(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)"
                          onChange={this.handleChange}
                          // value={this.state.number}
                          color="secondary"
                          />
                          {errors.number.length > 0 && 
                            <span className='error'>{errors.number}</span>}
                        </div>
                        <div className="row">
                          <TextField
                          name="password"
                          type= "password"
                          onChange={this.handleChange}
                          id="password"
                          placeholder="hasło"
                          // value={this.state.password}
                          color="secondary"
                          />
                          {errors.password.length > 0 && 
                            <span className='error'>{errors.password}</span>}
                        </div>
                        <button>Zarejestruj</button>
                    </form>
                    
                </div>
            </div>
        )
    }
}


export default SignUp;