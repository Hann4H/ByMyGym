import React, { Component } from "react";
import Listing from "../components/Listing";
import firebase from "firebase";

class Gyms extends Component {
  state = { Gyms: [] };

  componentDidMount() {
    firebase
      .firestore()
      .collection("gyms")
      .get()
      .then((querySnapshot) => {
        const Gyms = [];

        querySnapshot.forEach(function (doc) {
          Gyms.push({
            gymName: doc.data().gymName,
            gymStreet: doc.data().gymStreet,
            gymCity: doc.data().gymCity,
            gymZip: doc.data().gymZip,
            gymURL: doc.data().gymURL,
            gymPhone: doc.data().gymPhone,
            gymEmail: doc.data().gymEmail,
            gymPhoto: doc.data().gymPhoto,
            gymDescription: doc.data().gymDescription,
            gymLat: doc.data().gymLat,
            gymLng: doc.data().gymLng,

            gymHeight: doc.data().gymHeight,
            gymWidth: doc.data().gymWidth,
            gymLength: doc.data().gymLength,
            gymPrice: doc.data().gymPrice,
            id: doc.data().id,
          });
        });
        this.setState({ Gyms });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    return (
      <div>
        {this.state.Gyms.map((gym, index) => (
          <p>{gym.gymName}</p>
        ))}
      </div>
    );
  }
}
export default Gyms;
