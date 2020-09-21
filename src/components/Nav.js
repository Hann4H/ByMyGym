import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
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

    let name;
    var user = firebase.auth().currentUser;
    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        name = profile.displayName;
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    } else {
      console.log("user is null :(");
    }

    return (
      <>
        <div className="navBar">
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
                  className="logo"
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
            <li>
              <Link to="/admin">
                <button className="nav-button">ADMIN</button>
                {/* {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                  >
                    <path d="M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97L29 4.84c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3c-1.22.51-2.35 1.17-3.38 1.97L9.9 10.1c-.45-.17-.97 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31C9.06 22.69 9 23.34 9 24s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3c1.22-.51 2.35-1.17 3.38-1.97l4.98 2.01c.45.17.97 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zM24 31c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                  </svg>
                } */}
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Nav;
