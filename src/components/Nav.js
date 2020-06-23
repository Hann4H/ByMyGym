import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import firebase from '../firebase'

class Nav extends Component {

    constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
      this.state = {
        error: "",
        toggle: false,
      };
  }


  logout() {
      firebase.auth().signOut();
  }
    

  Toggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    if (window.location.pathname === '/signup') return null;
    if (window.location.pathname === '/login') return null;
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
                <img
                  src={require("../img/logo.png")}
                  alt="logo"
                  className="logo"
                />
              </Link>
            </li>
            <li style={{ width: "100%" }}></li>
              <li>
                <button className="searchButton">
                  <FaSearch size="30px"></FaSearch>
                </button>
              </li>
              <li>
                <button>
                  <Link to="/add">DODAJ SALĘ</Link>
                </button>
              </li>

                <li>
                  <button>
                    <Link to="/login">ZALOGUJ</Link>
                  </button>
                </li>

          </ul>
        </div>
      </>
    );
  }
}

export default Nav;