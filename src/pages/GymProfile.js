import React, { Component, Fragment } from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import GymName from "../components/GymName";
import GymDetails from "../components/GymDetails";
import Calendar from "../components/Calendar";
import Slider from "../components/Slider";
import Localization from "../components/Localization";
import HallProfile from "../components/HallProfile";

class GymProfile extends Component {
  onDayClick = (e, day) => {
    alert(day);
  };
  render() {
    const { hall } = this.props.location.state;

    console.log("TU POWINNO BYC ID:");
    console.log(this.props.match.params.id);

    return (
      <>
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
          <HallProfile hall={hall} dataId={this.props.match.params.id} />

          {/* <GymDetails></GymDetails> */}
        </div>
      </>
    );
  }
}

export default GymProfile;
