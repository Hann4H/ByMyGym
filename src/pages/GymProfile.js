import React, { Component, Fragment } from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import GymName from "../components/GymName";
import GymDetails from "../components/GymDetails";
import Calendar from "../components/Calendar";
import Slider from "../components/Slider";
import Localization from "../components/Localization";
import SportsFacilities from "../components/SportsFacilities";

class Home extends Component {
  onDayClick = (e, day) => {
    alert(day);
  };

  render() {
    return (
      <body>
        <Slider />
        <div id="idk3"></div>
        <div id="idk4">
          <div id="sup">{/* <Slider /> */}</div>

          <div className="container-4">
            <div id="constrain">
              <GymDetails></GymDetails>
            </div>
          </div>

          <Calendar
            style={{
              position: "relative",
              margin: "50px auto",
              width: "302px",
            }}
            onDayClick={(e, day) => this.onDayClick(e, day)}
          />

          <SportsFacilities></SportsFacilities>
        </div>
      </body>
    );
  }
}

export default Home;
