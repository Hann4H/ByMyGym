import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Route, Redirect, Switch } from "react-router-dom";

class Nav extends Component {
  state = {
    error: "",
    toggle: false,
  };

  Toggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    const user_name = localStorage.getItem("user_name");
    return (
      <>
        <div className="navBar">
          <button class="hamburger-button" onClick={this.Toggle}>
            <FaAlignRight />
          </button>
          <ul
            className={this.state.toggle ? "nav-links show-nav" : "nav-links"}
          >
            <li>
              <Link to="/">
                <img src={require("../img/logo.png")} alt="logo" id="logo" />
              </Link>
            </li>

            <li>
              <button className="searchButton">
                <FaSearch size="43px"></FaSearch>
              </button>
            </li>
            <li>
              <button id="dodajSaleButton">
                <Link to="/add">DODAJ SALĘ</Link>
              </button>
            </li>
            <li style={isAuthenticated() ? {} : { display: "none" }}>
              <button>
                <Link to="/profile">{user_name}</Link>
              </button>
            </li>
            <li>
              <button onClick={isAuthenticated() ? logout : login}>
                {isAuthenticated() ? "WYLOGUJ" : "ZALOGUJ"}
              </button>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Nav;
