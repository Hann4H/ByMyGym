import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;
    return (
      <header>
        <img src={require("./img/header_img.png")} />
        <h1>Zarezerwuj salę</h1>
        <h2>bez zbędnych telefonów</h2>
      </header>
    );
  }
}

export default Home;
