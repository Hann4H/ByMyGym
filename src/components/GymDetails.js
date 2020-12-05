import React, { Component } from "react";
import Localization from "./Localization";
import firebase from "../firebase";
import Tooltip from "@material-ui/core/Tooltip"
import { empty } from "svelte/internal";

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
    this.state = { data: [], favourites: [], faved: false };
    this.showing = false;
    this.selectedBooking = null;
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
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

        const usersRef = db.collection("favourites").doc(localStorage.getItem("user"))

        usersRef.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            if (docSnapshot.data().favourites.includes(this.props.dataId)) {
              this.faved = true;
              console.log(this.faved)
            } else {
              this.faved = false;
            }
          }
        })
             
      }
    } catch (error) {
      console.log("Wystapił błąd");
      console.log(error);
    }

  }

  handleClickDelete() {
    const usersRef = db.collection("favourites").doc(localStorage.getItem("user"))

    usersRef.get()
    .then((docSnapshot) => {
      this.setState({ faved: false }); 
      usersRef.update({favourites: firebase.firestore.FieldValue.arrayRemove(this.props.dataId)});
    })

  }

  handleClickAdd() {
    const faves = [];
    const usersRef = db.collection("favourites").doc(localStorage.getItem("user"))

    usersRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        if (!docSnapshot.data().favourites.includes(this.props.dataId)) {
          this.setState({ faved: true }); 
          usersRef.update({favourites: firebase.firestore.FieldValue.arrayUnion(this.props.dataId)});      
        }
      } else {
        this.setState({ faved: true }); 
        usersRef.set({favourites: this.props.dataId})
      }
    });
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
    const gymDescription = this.state.data.gymDescription;
    const gymHeight = this.state.data.gymHeight;
    const gymWidth = this.state.data.gymWidth;
    const gymLength = this.state.data.gymLength;
    const gymOwnerID = this.state.data.ownerID;




    return (
      <>
        <div className="idk5">
          <div className="gym-prof-header">
            <h1 className="gym-name" style={{ color: "var(--darkOrange)" }}>
              {gymName}
            </h1>
            {(localStorage.getItem("user") && this.state.faved) ? (
              <Tooltip
              title="Usuń z ulubionych"
              placement="top"
            >
              <img src={require("../img/heart_full.png")} 
              onMouseOver={e => (e.currentTarget.src = require('../img/heart_empty.png'))}
              onMouseOut={e => (e.currentTarget.src = require("../img/heart_full.png"))}
              onClick={this.handleClickDelete}
              className="heart" />
            </Tooltip>
            ) : (
              <Tooltip
              title="Dodaj do ulubionych"
              placement="top"
            >
              <img src={require("../img/heart_empty.png")} 
              onMouseOver={e => (e.currentTarget.src = require('../img/heart_full.png'))}
              onMouseOut={e => (e.currentTarget.src = require("../img/heart_empty.png"))}
              onClick={this.handleClickAdd}
              className="heart" />
            </Tooltip>
            )}
          </div>
          <div className="gym-details">
            <div className="gym-details-column1">
              <p style={nameStyle}>Adres</p>
              {this.state.data.gymStreet &&
              this.state.data.gymZip &&
              this.state.data.gymCity ? (
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
                  {this.state.data.gymHeight ? (
                    <p style={textStyle}>{gymHeight} m</p>
                  ) : (
                    <p className="no-data-p">brak</p>
                  )}
                </div>
                <br />
                <div className="dimensions-p">
                  <p style={nameStyle}>Szerokość</p>
                  {this.state.data.gymWidth ? (
                    <p style={textStyle}>{gymWidth} m</p>
                  ) : (
                    <p className="no-data-p">brak</p>
                  )}
                </div>
                <br />
                <div className="dimensions-p">
                  <p style={nameStyle}>Długość</p>
                  {this.state.data.gymLength ? (
                    <p style={textStyle}>{gymLength} m</p>
                  ) : (
                    <p className="no-data-p">brak</p>
                  )}
                </div>
              </div>
              <br />
              <p style={nameStyle}>Cena</p>
              {this.state.data.gymPrice ? (
                <p style={textStyle}>{gymLength} m</p>
              ) : (
                <p className="no-data-p">brak</p>
              )}
              <br />
              <p style={nameStyle}>Opis</p>
              {this.state.data.gymDescription ? (
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
              {this.state.data.gymURL ? (
                <a href={`http://${gymURL}`} className="external-url">
                  {gymURL}
                  <hr />
                </a>
              ) : (
                <p className="no-data-p">brak</p>
              )}
              <br />
              <p style={nameStyle}>E-mail</p>
              {this.state.data.gymEmail ? (
                <p style={textStyle}>{gymEmail}</p>
              ) : (
                <p className="no-data-p">brak</p>
              )}
              <br />
              <p style={nameStyle}>Telefon</p>
              {this.state.data.gymPhone ? (
                <p style={textStyle}>{gymPhone}</p>
              ) : (
                <p className="no-data-p">brak</p>
              )}
              <br />
            </div>
          </div>
          <div className="map">
            <Localization position={position} gymName={gymName} />
          </div>
        </div>
      </>
    );
  }
}

export default GymDetails;
