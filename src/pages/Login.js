import React , { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import TextField from '@material-ui/core/TextField';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';

const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: "/"
  }
  
  class Login extends Component{
      constructor()
      {
          super();
          this.login = this.login.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.state={
              email : "",
              password : "",
              errorMessage: "",
          };
      }
  
      login(e){
          e.preventDefault();
          firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
              console.log(u);
              window.location.href = "/";
          }).catch((err)=>{
              if("The password is invalid or the user does not have a password." == err.message) {
                this.setState({ errorMessage: "Nieprawidłowe hasło" });
              } else if ("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later." == err.message) {
                this.setState({ errorMessage: "Zbyt wiele nieudanych prób. Zmień hasło lub spróbuj później." });
              }
          })
      }
  
      
      handleChange(e){
          this.setState({
              [e.target.name] : e.target.value
          })
      }
      
  
      render() {   
          
        const err = this.state.errorMessage;

          return(
              <div className="login-page">
                  <div className="login-wave"></div>
                  <div className="login-background">
                      <Link to="/"><img className="login-logo" src={require("../img/logo.png")} alt="logo"/></Link>
                      <form className="login-form" noValidate>
                      <span className="error-big">{err}</span>
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
                          name="password"
                          type= "password"
                          onChange={this.handleChange}
                          id="password"
                          placeholder="hasło"
                          value={this.state.password}
                          color="secondary"
                          />                
                          <button  className="button" onClick={this.login}>Zaloguj</button>
                          <p className="login-link-signup">Nie masz konta? <Link to="/signup"><span>Zarejestruj się!</span></Link></p>
                          <p className="login-link-signup"><Link to="/reset"><span>Zresetuj hasło</span></Link></p>
                      </form>
                      <FirebaseAuth className="login-external" uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                  </div>
              </div>
          )
      }
  }
  export default Login;
