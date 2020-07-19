import React, { Component } from "react";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import ListingImg from "./ListingImg";
import { Link, withRouter } from "react-router-dom";
import GymItem from "../components/GymItem";

const db = firebase.firestore();

class Listing extends Component {
  state = { Gyms: [] };

  componentDidMount() {
    firebase
      .firestore()
      .collection("gyms")
      .orderBy("gymName")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        const Gyms = [];
        var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        console.log("last", lastVisible);

        querySnapshot.forEach(function(doc) {
          Gyms.push({
            docId: doc.id,

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
          <GymItem key={gym.id} showCount={false} gym={gym} index={index} />
        ))}
      </div>
    );
  }
}

export default Listing;
