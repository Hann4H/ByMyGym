import React, { Component } from "react";
import Slider from "../components/Slider";
import GymDetails from "../components/GymDetails";
import { MaterialUIPickers } from "../components/Booking";
import $ from "jquery";


class GymProfile extends Component {
  onDayClick = (e, day) => {
    alert(day);
  };


  // componentDidMount(){
  //   this.initDatepicker();
  // }
  
  // initDatepicker(){
  //   $('#target').weekly_schedule();
  // }


  render() {
    console.log("TU POWINNO BYC ID:");
    console.log(this.props.match.params.id);

    return (
      <>
        <div id="idk3"></div>
        <div id="idk4">
          <div id="sup">
            <Slider />
          </div>

          <div className="container-4">
            <div id="constrain">
              {/* <GymDetails></GymDetails> */}
              <GymDetails dataId={this.props.match.params.id} />
            </div>
          </div>
          <MaterialUIPickers gym_id={this.props.match.params.id} />

        </div>
        <div class="container">
            <div id="target">
            </div>
        </div>


        <div id="pls" />
      </>
    );
  }
}

export default GymProfile;
