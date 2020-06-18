import React , { Component } from "react";
import firebase from "../firebase";

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
                    <form>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="enter email address"
                        onChange={this.handleChange}
                        value={this.state.email}
                        />
                        <input
                        name="password"
                        type= "password"
                        onChange={this.handleChange}
                        id="password"
                        placeholder="enter password"
                        value={this.state.password}
                        />
                        <button onClick={this.login}>Login</button>
                        <button onClick={this.signup}>Signup</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Login;