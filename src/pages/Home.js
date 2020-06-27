import React, { Component } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Services from "../components/Services";
import Listing from "../components/Listing";
import Loading from "../components/Loading";

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
        <div className="listing-container">
          <h1>wyszukaj salę</h1>
          <hr />
          <div id="search-bar-place">miejsce na search bar</div>
          <Listing />
        </div>
        <div id="pls"></div>
        {/*<JsonData></JsonData>*/}
        {/*}
        <div id="testSlider">
          <Slider></Slider>
        </div>
        
        <SampleGyms />
        <ListingImg></ListingImg>*/}
      </>
    );
  }
}

export default Home;
