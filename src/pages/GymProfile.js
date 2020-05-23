import React, { Component } from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import GymName from "../components/GymName";
import GymDetails from "../components/GymDetails";
import Calendar from "../components/Calendar";
import Slider from "../components/Slider";

class Home extends Component {
  render() {
    return (
      <>
        <div id="pls"></div>
        <div id="slash"></div>
        
          <GymName title="NAZWA OBIEKTU"></GymName>
          <div className="container-4">
          <div id="constrain">
            <GymDetails details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla massa sapien, vehicula et lacus sit amet, rhoncus tincidunt sapien. Etiam vitae felis at nisi ultrices ultricies vitae non ipsum. Nunc pharetra nibh ac tellus vestibulum, quis mattis lacus ornare. Fusce euismod vel mauris ut porta. Praesent ullamcorper lacus quis felis hendrerit porttitor. Aenean consectetur turpis lacus. Phasellus eget velit imperdiet, facilisis neque tincidunt, sagittis ipsum. Nunc risus nulla, dictum ultrices neque eu, dapibus porttitor quam. Donec vestibulum dolor nec nibh condimentum interdum. Praesent interdum hendrerit auctor. Nullam ante tortor, molestie quis purus et, dictum convallis ante. Suspendisse eget risus tincidunt, imperdiet sem in, pellentesque elit. "></GymDetails>
          </div>

          <div id="sup"><Slider /></div>
        </div>
        
        <Calendar />
      </>
    );
  }
}

export default Home;
