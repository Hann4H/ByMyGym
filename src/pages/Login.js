import React , { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



class Login extends Component{
    constructor(props)
    {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state={
            email : "",
            password : ""
        }
    }

    login(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            console.log(u)
        }).catch((err)=>{
            console.log(err);
        })
    }

    signup(e){
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            console.log(u)
        }).catch((err)=>{
            console.log(err);
        })
    }
    
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    

    render() {
        return(
            <div className="login-page">
                <div className="login-wave"></div>
                {/*<img className="login-wave" src={require("../img/wave.png")}></img>*/}
                <div className="login-background">
                    <img className="login-logo" src={require("../img/logo.png")}/>
                    <form noValidate autoComplete="off">
                        <TextField
                        type="email"
                        id="email"
                        name="email"
                        placeholder="adres e-mail"
                        onChange={this.handleChange}
                        value={this.state.email}
                        color="#ffa841"
                        />
                        <TextField
                        name="password"
                        type= "password"
                        onChange={this.handleChange}
                        id="password"
                        placeholder="hasło"
                        value={this.state.password}
                        />
                        <button onClick={this.login}>Zaloguj</button>
                        {/*<button onClick={this.signup}>Signup</button>*/}
                        <Link to="/signup" className="login-link-signup"><p>Nie masz konta? Zarejestruj się!</p></Link>
                    </form>
                </div>
            </div>
        )
    }
}
export default Login;