import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import firebase from "../firebase";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      user: {},
      error: "",
      toggle: false,
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
        localStorage.setItem("email", user.email);
        localStorage.setItem("photoURL", user.photoURL);
        localStorage.setItem("user_name", user.displayName);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
        localStorage.removeItem("email");
        localStorage.removeItem("photoURL");
        localStorage.removeItem("user_name");
      }
    });
  }

  logout() {
    firebase.auth().signOut();
  }

  Toggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    if (window.location.pathname === "/signup") return null;
    if (window.location.pathname === "/login") return null;
    if (window.location.pathname === "/gym_profile/login") return null;

    var user = firebase.auth().currentUser;
    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    } else {
      console.log("user is null :(");
    }

    return (
      <>
        <div className="navBar">
          <Link to="/">
                <img
                  src={require("../img/logo.png")}
                  alt="logo"
                  className="logo"
                />
          </Link>
          <button className="hamburger-button" onClick={this.Toggle}>
            <FaAlignRight />
          </button>
          <ul
            className={this.state.toggle ? "nav-links show-nav" : "nav-links"}
          >
            <li>
              <Link to="/">
                <img
                  src={require("../img/logo.png")}
                  alt="logo"
                  className="logo1"
                />
              </Link>
            </li>
            <li style={{ width: "100%" }}></li>

            <li>
              {this.state.user ? (
                <Link to="/add">
                  <button className="nav-button">DODAJ SALĘ</button>
                </Link>
              ) : (
                ""
              )}
            </li>
            <li>
              {this.state.user ? (
                <Link to="/profile">
                  <button className="nav-button">PROFIL</button>
                </Link>
              ) : (
                ""
              )}
            </li>
            <li>
            {this.state.user && this.state.user.uid==process.env.REACT_APP_ADMIN_ID ? (
              <Link to="/admin">
                <button className="nav-button">ADMIN</button>
              </Link>
              ) : (
                ""
              )}
            </li>
            <li>
              {this.state.user ? (
                <Link to="/">
                  <button className="nav-button" onClick={this.logout}>
                    WYLOGUJ
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="nav-button">ZALOGUJ</button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Nav;
