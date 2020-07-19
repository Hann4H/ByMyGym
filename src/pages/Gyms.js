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

        querySnapshot.forEach(function(doc) {
          Gyms.push({
            gymName: doc.data().gymName,
            gymStreet: doc.data().gymStreet,
            zip: doc.data().zip,
            gymCity: doc.data().gymCity,
            height: doc.data().height,
            width: doc.data().width,
            length: doc.data().width,
            price: doc.data().price,
            id: doc.data().id,

            kod: doc.data().kod,
            url: doc.data().url,
            opis_klasy: doc.data().opis_klasy,
            telefon: doc.data().telefon,
            email: doc.data().email,
            grafika: doc.data().grafika,
            opis: doc.data().opis,
            lat: doc.data().lat,
            lng: doc.data().lng,
          });
        });
        this.setState({ Gyms });
      })
      .catch(function(error) {
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
