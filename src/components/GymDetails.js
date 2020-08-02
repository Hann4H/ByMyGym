import React, { Component } from "react";
import Localization from "./Localization";
import firebase from "../firebase";
import Scheduler, {
  ViewTypes,
  DATE_FORMAT,
  SchedulerData,
} from "react-big-scheduler";
import moment from "moment";

const nameStyle = {
  fontWeight: "bold",
  color: "var(--darkOrange)",
};

const textStyle = {
  color: "#808080",
};

const db = firebase.firestore();

class GymDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.showing = false;
    this.selectedBooking = null;
  }

  async componentDidMount(props) {
    try {
      const cityRef = db.collection("gyms").doc(this.props.dataId);
      const doc = await cityRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        console.log("Document data:", doc.data());
        this.setState({ data: doc.data() });
      }
    } catch (error) {
      console.log("Wystapił błąd");
      console.log(error);
    }
  }

  render() {
    const gymLat = this.state.data.gymLat ? this.state.data.gymLat : 52.409538;
    const gymLng = this.state.data.gymLng ? this.state.data.gymLng : 16.931992;
    const position = [gymLat, gymLng];
    const gymZip = this.state.data.gymZip;
    const gymName = this.state.data.gymName;
    const gymURL = this.state.data.gymURL;
    const gymPhone = this.state.data.gymPhone;
    const gymStreet = this.state.data.gymStreet;
    const gymCity = this.state.data.gymCity;
    const gymEmail = this.state.data.gymEmail;
    const gymPhoto = this.state.data.gymPhoto;
    const gymDescription = this.state.data.gymDescription;

    const gymHeight = this.state.data.gymHeight;
    const gymWidth = this.state.data.gymWidth;
    const gymLength = this.state.data.gymLength;
    const gymPrice = this.state.data.gymPrice;

    const { showing } = this.state;

    return (
      <div className="idk5">
        <h1 className="gym-name" style={{ color: "var(--darkOrange)" }}>
          {gymName}
        </h1>

        <div className="gym-details">
          <div className="gym-details-column1">
            <p style={nameStyle}>Adres</p>
            {this.state.data.gymStreet && this.state.data.gymZip && this.state.data.gymCity ? (
              <p style={textStyle}>
                {gymStreet}, {gymZip} {gymCity}
              </p>
              ) : (
                <p className="no-data-p">brak</p>
            )}
            <br />
            <div className="dimensions">
              <div className="dimensions-p">
                <p style={nameStyle}>Wysokość</p>
                {this.state.data.gymHeight? (
                  <p style={textStyle}>{gymHeight} m</p>
                  ) : (
                    <p className="no-data-p">brak</p>
                  )}
              </div>
              <br />
              <div className="dimensions-p">
                <p style={nameStyle}>Szerokość</p>
                {this.state.data.gymWidth? (
                  <p style={textStyle}>{gymWidth} m</p>
                  ) : (
                    <p className="no-data-p">brak</p>
                  )}
              </div>
              <br />
              <div className="dimensions-p">
                <p style={nameStyle}>Długość</p>
                {this.state.data.gymLength? (
                  <p style={textStyle}>{gymLength} m</p>
                  ) : (
                  <p className="no-data-p">brak</p>
                )}
              </div>
            </div>
            <br />
            <p style={nameStyle}>Cena</p>
            {this.state.data.gymPrice? (
                <p style={textStyle}>{gymLength} m</p>
              ) : (
                <p className="no-data-p">brak</p>
              )}
            <br />
            <p style={nameStyle}>Opis</p>
            {this.state.data.gymDescription? (
                <p
                style={textStyle}
                dangerouslySetInnerHTML={{ __html: gymDescription }}
              />
              ) : (
                <p className="no-data-p">brak</p>
              )}
            
            <br />
          </div>
          <div className="gym-details-column2">
            <p style={nameStyle}>Strona WWW</p>
            {this.state.data.gymEmail? (
                <a href={`http://${gymURL}`} className="external-url">
                  {gymURL}
                  <hr />
                </a>
              ) : (
                <p className="no-data-p">brak</p>
              )}
            <br />
            <p style={nameStyle}>E-mail</p>
            {this.state.data.gymEmail? (
                {gymEmail}
              ) : (
                <p className="no-data-p">brak</p>
              )}
            <br />
            <p style={nameStyle}>Telefon</p>
            {this.state.data.gymPhone? (
                {gymPhone}
              ) : (
                <p className="no-data-p">brak</p>
              )}
            <br />
          </div>
          
        </div>
        <div className="map">
          <Localization position={position} />
        </div>
        {/*<button className="gym-button" onClick={() => this.setState({ showing: !showing })}>ZAREZERWUJ</button>
                { showing 
                    ? <div className="booking"><Booking /></div>
                    : null
                }*/}
      </div>
    );
  }
}

export default GymDetails;
