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
        <div id="idk5">
        



        </div>
        <div id="testSlider">
          <Slider></Slider>
        </div>
        <Listing />
        <SampleGyms />
        
      </>
    );
  }
}

export default Home;
