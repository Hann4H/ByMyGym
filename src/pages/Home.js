import React, { Component } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Services from "../components/Services";

class Home extends Component {

  render() {
    return (
      <>
        <Hero>
          <Banner title="ZAREZERWUJ SALĘ" subtitle="bez zbędnych telefonów">
            <Link to="/gyms" className="btn-primary">
              ZOBACZ DOSTĘPNE SALE
            </Link>
          </Banner>
        </Hero>
        <Services></Services>
        <div id="pls"></div>
        <div id="pls"></div>
      </>
    );
  }
}

export default Home;
