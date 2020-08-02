import React, { Component } from "react";
import Slider from "../components/Slider";
import GymDetails from "../components/GymDetails";
import { MaterialUIPickers } from "../components/Booking";
import firebase from "firebase"
import $ from "jquery";

const db = firebase.firestore();

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
            <Slider dataId={this.props.match.params.id}/>
          </div>

          <div className="container-4">
            <div id="constrain">
              <GymDetails dataId={this.props.match.params.id} />
            </div>
          </div>
          <MaterialUIPickers gym_id={this.props.match.params.id} />
        </div>
        <div class="container">
          <div id="target"></div>
        </div>

        <div id="pls" />
      </>
    );
  }
}

export default GymProfile;
