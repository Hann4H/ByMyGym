import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    if (window.location.pathname === "/signup") return null;
    if (window.location.pathname === "/login") return null;
    if (window.location.pathname === "/profile") return null;
    if (window.location.pathname === "/gym_profile/login") return null;
    if (window.location.pathname === "/admin") return null;
    if (window.location.pathname === "/booking") return null;
    
    return (
      <>
        <div className="footer">
          <div className="footer-links">
            <div className="padder" />
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
            <div className="contact-link">
              <Link to="/faq">
                <img
                  className="msg-icon"
                  alt="envelope"
                  src={require("../img/help.png")}
                />
                <p>FAQ</p>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
