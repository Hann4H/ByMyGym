import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Route, Redirect, Switch } from "react-router-dom";

class Nav extends Component {
  state = {
    isOpen: false,
    error: "",
  };

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    const user_name = localStorage.getItem("user_name");
    return (
      <nav>
        <ul>
          <li id="logo">
            <Link to="/">
              <img src={require("../img/logo.png")} alt="logo" />
            </Link>
          </li>
          <li>
            <button className="dropDown" onClick={this.handleToggle}>
              <FaAlignRight></FaAlignRight>
            </button>
          </li>
          <ul>
            {/*className={this.state.isOpen?"nav-links show-nav":"nav-links"}>*/}
            <li>
              <button
                id="zalogujButton"
                onClick={isAuthenticated() ? logout : login}
              >
                {isAuthenticated() ? "WYLOGUJ" : "ZALOGUJ"}
              </button>
            </li>
            <li style={isAuthenticated() ? {} : { display: "none" }}>
              <Link className="user-profile-link" to="/profile">
                {user_name}
              </Link>
            </li>
            <li>
              <button id="dodajSaleButton">
                <Link to="/add">DODAJ SALĘ</Link>
              </button>
            </li>
            <li>
              <button className="searchButton">
                <FaSearch size="43px"></FaSearch>
              </button>
            </li>
          </ul>
        </ul>
      </nav>
    );
  }
}

export default Nav;
