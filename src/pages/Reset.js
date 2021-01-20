import React , { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import TextField from '@material-ui/core/TextField';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';


class Reset extends Component{
    constructor()
    {
        super();
        this.sendResetEmail = this.sendResetEmail.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state={
            email : "",
            password : "",
            errorMessage: "",
            emailHasBeenSent: false,
        };
    }

    sendResetEmail(event) {
        event.preventDefault();
        firebase.auth()
          .sendPasswordResetEmail(this.state.email)
          .then(() => {
            this.setState({ emailHasBeenSent: true });
            // setTimeout(() => {this.setState({ emailHasBeenSent: false })}, 3000);
          }).then(() => {
            setTimeout(() => {window.location.replace("/login");}, 1000);
          })
          .catch((err) => {
            if("There is no user record corresponding to this identifier. The user may have been deleted." == err.message) {
                this.setState({ errorMessage: "Nie istnieje użytkownik z tym adresem email" });
              }
          });
      };

    onChangeHandler(e){
        this.setState({
            [e.target.name] : e.target.value
        })
      };
    

    render() {   

        const err = this.state.errorMessage;
        const sent = this.emailHasBeenSent;

        return(
            <div className="login-page">
                <div className="login-wave"></div>
                <div className="login-background">
                    <Link to="/"><img className="login-logo" src={require("../img/logo.png")} alt="logo"/></Link>
                    <form className="login-form" noValidate>
                    <span className="error-big">{err}</span>
                        {sent ?  <p className="login-link-signup">Link został wysłany!</p> : ""}
                        <TextField
                        type="email"
                        id="email"
                        name="email"
                        placeholder="adres e-mail"
                        onChange={this.onChangeHandler}
                        value={this.state.email}
                        color="secondary"
                        />
                        <button className="button" onClick={this.sendResetEmail}>
                            Wyślij link
                        </button>           
                    </form>
                </div>
            </div>
        )
    }
}
export default Reset;
