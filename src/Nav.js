import React, { Component } from "react";
import { Link } from "react-router-dom";


class Nav extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <nav>
        <ul>
          <li id="logo">
            <Link to="/"><img src={require('./img/logo.png')} /></Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button id="zalogujButton" onClick={isAuthenticated() ? logout : login}>
              {isAuthenticated() ? "WYLOGUJ" : "ZALOGUJ"}
            </button>
          </li>
          <li>
            <button id="dodajSaleButton">DODAJ SALĘ</button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
