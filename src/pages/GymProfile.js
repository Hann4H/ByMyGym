import React, { Component } from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import GymName from "../components/GymName";
import GymDetails from "../components/GymDetails";
import Calendar from "../components/Calendar";
import Slider from "../components/Slider";

const style = {
  position: "relative",
  margin: "50px auto",
};

class Home extends Component {
  onDayClick = (e, day) => {
    alert(day);
  };

  render() {
    return (
      <>
        <div id="slash"></div>
        <div id="idk3"></div>
        <div id="idk2">
        
          <div className="container-4">
            <div id="constrain">
              <GymDetails></GymDetails>
            </div>

            <div id="sup">
              <Slider />
            </div>
          </div>
          
          <Calendar
            style={style}
            width="302px"
            onDayClick={(e, day) => this.onDayClick(e, day)}
          />
        </div>
      </>
    );
  }
}

export default Home;
