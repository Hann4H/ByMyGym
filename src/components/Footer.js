import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    if (window.location.pathname === "/signup") return null;
    if (window.location.pathname === "/login") return null;
    if (window.location.pathname === "/profile") return null;
    if (window.location.pathname === "/gym_profile/login") return null;
    if (window.location.pathname === "/admin") return null;
    
    return (
      <>
        <div className="footer">
          <div className="contact-link">
            <Link to="/contact">
              <img
                className="msg-icon"
                alt="envelope"
                src={require("../img/msg-icon.png")}
              />
              <p>Skontaktuj się z nami!</p>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
