import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import TextField from "@material-ui/core/TextField";



const validEmailRegex = RegExp(
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
);

const validNumberRegex = RegExp(/^(?:\(?\?)?(?:[-.()\s]*(\d)){9}\)?$/);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

const countErrors = (errors) => {
  let count = 0;
  Object.values(errors).forEach((val) => val.length > 0 && (count = count + 1));
  return count;
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      phoneVer: false,
      errorCount: null,
      firstName: null,
      surname: null,
      email: null,
      number: null,
      password: null,
      errors: {
        firstName: "",
        surname: "",
        email: "",
        number: "",
        password: "",
      },
    };
  }

  setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          var phoneNumber = this.state.number;
          var appVerifier = window.recaptchaVerifier;
          firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;

              var code = window.prompt("Wpisz numer weryfikacyjny");
              confirmationResult
                .confirm(code)
                .then(function (result) {
                  // User signed in successfully.
                  this.setState({phoneVer: true});
                  console.log("poszuo" + this.state.phoneVer);
                  // ...
                })
                .catch(function (error) {
                  // User couldn't sign in (bad verification code?)
                  // ...
                });
            })
            .catch(function (error) {
              // Error; SMS not sent
              // ...
            });
        },
        "expired-callback": function () {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      }
    );
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "firstName":
        errors.firstName = value.length < 3 ? "imię jest niepoprawne" : "";
        break;
      case "surname":
        errors.surname = value.length < 3 ? "nazwisko jest niepoprawne" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "e-mail jest niepoprawny";
        break;
      case "number":
        errors.number = validNumberRegex.test(value)
          ? ""
          : value.length < 9 ? "numer telefonu jest niepoprawny" : "";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "hasło powinno mieć przynajmniej 8 znaków" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ formValid: validateForm(this.state.errors) });
    this.setState({ errorCount: countErrors(this.state.errors) });

    // this.setUpRecaptcha();

    // if(this.state.phoneVer == 'true') {
    if (this.state.errorCount == null) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((u) => {
          firebase
            .firestore()
            .collection("users")
            .add({
              firstName: this.state.firstName,
              surname: this.state.surname,
              email: this.state.email,
              phone: this.state.number,
            })
            .then(() => {
              window.location.href = "/";
            });
        });

      // return <Redirect to="/login" />;
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login-page">
        <div className="login-wave"></div>
        {/*<img className="login-wave" src={require("../img/wave.png")}></img>*/}
        <div className="login-background">
          <Link to="/">
            <img className="login-logo" src={require("../img/logo.png")} alt="logo"/>
          </Link>
          <form className="login-form" noValidate onSubmit={this.handleSubmit}>
            <div className="row">
              <TextField
                name="firstName"
                onChange={this.handleChange}
                id="firstName"
                placeholder="imię"
                value={this.state.name}
                color="secondary"
              />
              {errors.firstName.length > 0 && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>
            <div className="row">
              <TextField
                name="surname"
                onChange={this.handleChange}
                id="surname"
                placeholder="nazwisko"
                value={this.state.surname}
                color="secondary"
              />
              {errors.surname.length > 0 && (
                <span className="error">{errors.surname}</span>
              )}
            </div>
            <div className="row">
              <TextField
                type="email"
                name="email"
                id="email"
                placeholder="adres e-mail"
                onChange={this.handleChange}
                color="secondary"
                value={this.state.email}
                noValidate
              />
              {errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
            </div>

            <div className="row">
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
              {errors.number.length > 0 && (
                <span className="error">{errors.number}</span>
              )}
            </div>
            <div className="row">
              <TextField
                name="password"
                type="password"
                onChange={this.handleChange}
                id="password"
                placeholder="hasło"
                value={this.state.password}
                color="secondary"
              />
              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <div id="recaptcha-container"></div>
            <button className="button">Zarejestruj</button>

          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
