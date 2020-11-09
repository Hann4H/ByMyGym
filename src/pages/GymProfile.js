import React, { Component } from "react";
import Slider from "../components/Slider";
import GymDetails from "../components/GymDetails";
import GymDetailsEdit from "../components/GymDetailsEdit"
import Basic from "../components/calendar/Basic";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import ShowScheduler from "../components/calendar/ShowScheduler";

class GymProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], editMode:false};
    this.showing = false;
    this.selectedBooking = null;

    this.setEditReadmode = this.setEditReadMode.bind(this);
  }

  setEditReadMode = () => {
    this.setState({editMode: !this.state.editMode})
    console.log("edit mode?:", this.state.editMode)
  }

  render() {
    console.log("TU POWINNO BYC ID:" + this.props.match.params.id);
    return (
      <>
        <div id="idk3"></div>
        <div id="idk4">
          <div id="sup">
            <Slider dataId={this.props.match.params.id} />
          </div>
          <button onClick={this.setEditReadMode}>{this.state.editMode? "Podgląd" : "Edytuj"}</button>
          {this.state.editMode?
              <div className="container-4">
              <div id="constrain">
              <GymDetailsEdit dataId={this.props.match.params.id} />
              </div>
            </div>
            :
            <div>      
              <div className="container-4">
              <div id="constrain">
                <GymDetails dataId={this.props.match.params.id} />
              </div>
            </div>
            <div className="calendar-position">
              <DndProvider backend={HTML5Backend}>
                <ShowScheduler gym_id={this.props.match.params.id} />
              </DndProvider>
            </div>
            <div className="calendar-position">
              <DndProvider backend={HTML5Backend}>
                <Basic gym_id={this.props.match.params.id} />
              </DndProvider>
            </div>
          </div>
            }


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
