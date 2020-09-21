import React, { Component } from "react";
import Slider from "../components/Slider";
import GymDetails from "../components/GymDetails";
import { MaterialUIPickers } from "../components/Booking";

import Basic from "../components/calendar/Basic";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import GetBookingData from "../components/calendar/GetBookingData";

class GymProfile extends Component {
  onDayClick = (e, day) => {
    alert(day);
  };

  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.showing = false;
    this.selectedBooking = null;
  }

  render() {
    console.log("TU POWINNO BYC ID:");
    console.log(this.props.match.params.id);

    return (
      <>
        <div id="idk3"></div>
        <div id="idk4">
          <div id="sup">
            <Slider dataId={this.props.match.params.id} />
          </div>

          <div className="container-4">
            <div id="constrain">
              <GymDetails dataId={this.props.match.params.id} />
            </div>
          </div>
          {/* <MaterialUIPickers gym_id={this.props.match.params.id} /> */}

          <div className="calendar-position">
            <GetBookingData gym_id={this.props.match.params.id} />
            <DndProvider backend={HTML5Backend}>
              <Basic gym_id={this.props.match.params.id} />
            </DndProvider>
          </div>
        </div>
        <div className="container">
          <div id="target"></div>
        </div>

        <div id="pls" />
      </>
    );
  }
}

export default GymProfile;
