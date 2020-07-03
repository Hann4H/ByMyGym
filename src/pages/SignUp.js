import React , { Component, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";


class SignUp extends Component{
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state={
            email : "",
            password : "",
            name: "",
            surname: "",
            number: ""
        }
    }

    componentDidMount() {

      }


    signup(e){
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            return <Redirect to="/login" />;
        }).catch((err)=>{
            console.log(err);
        })
    }
    
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    

    render() {



        return(
            <div className="login-page">
                <div className="login-wave"></div>
                {/*<img className="login-wave" src={require("../img/wave.png")}></img>*/}
                <div className="login-background">
                    <Link to="/"><img className="login-logo" src={require("../img/logo.png")}/></Link>
                    <form className="login-form" noValidate autoComplete="off">
                        <TextField
                        name="name"
                        onChange={this.handleChange}
                        id="name"
                        placeholder="imię"
                        value={this.state.name}
                        color="secondary"
                        />
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
                        <button onClick={this.signup}>Zarejestruj</button>
                    </form>
                    
                </div>
            </div>
        )
    }
}


export function SignUpComponent() {

  
    return <SignUp></SignUp>
  };

export default SignUpComponent;