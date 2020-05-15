import React, { Component } from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import Banner from "./Banner";
import Slider from "./Slider";
import Services from "./Services";
import SampleGyms from "./SampleGyms";


class Home extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;
    return <><div id="pls"></div><Hero>
      <Banner title="ZAREZERWUJ SALĘ" subtitle="bez zbędnych telefonów">
        <Link to='/gyms' className='btn-primary'>
          ZOBACZ DOSTĘPNE SALE
        </Link>
      </Banner>
    </Hero>
    <Services></Services>
    {/*<div id="testSlider"><Slider></Slider></div>*/}
    <SampleGyms />
    </>;
  }
}

export default Home;
