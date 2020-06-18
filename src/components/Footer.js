import React, { Component } from "react";

class Footer extends Component {
  render() {
    if (window.location.pathname === '/signup') return null;
    if (window.location.pathname === '/login') return null;
    return (
      <>
        <div className="footer"></div>
      </>
    );
  }
}

export default Footer;
