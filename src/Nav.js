import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaAlignRight } from 'react-icons/fa'


class Nav extends Component {
  state={
    isOpen:false
  }
  handleToggle= () => {
    this.setState({isOpen:!this.state.isOpen})
  }
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <nav>
        <ul>
          <li id="logo">
            <Link to="/"><img src={require('./img/logo.png')} /></Link>
          </li>
          {/*<li>
            <Link to="/profile">Profile</Link>
          </li>*/}
          <li>
            <button className="dropDown" onClick={this.handleToggle}><FaAlignRight></FaAlignRight></button>
          </li>
          <ul> {/*className={this.state.isOpen?"nav-links show-nav":"nav-links"}>*/}
            <li>
              <button id="zalogujButton" onClick={isAuthenticated() ? logout : login}>
                {isAuthenticated() ? "WYLOGUJ" : "ZALOGUJ"}
              </button>
            </li>
            <li>
              <button id="dodajSaleButton">DODAJ SALĘ</button>
            </li>
          </ul>
        </ul>
      </nav>
    );
  }
}

export default Nav;
