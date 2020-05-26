import React, { Component } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Slider from "../components/Slider";
import Services from "../components/Services";
import SampleGyms from "../components/SampleGyms";
import Listing from "../components/Listing";


class Home extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;
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
        <div className="listing-container">
          <h1>wyszukaj salę</h1>
          <hr />
          <div id="search-bar-place">miejsce na search bar</div>
          <Listing />
        </div>
        {/*}
        <div id="testSlider">
          <Slider></Slider>
        </div>
        
        <SampleGyms />*/}
        
      </>
    );
  }
}

export default Home;
