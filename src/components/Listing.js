import React, { Component } from "react";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
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

        querySnapshot.forEach(function (doc) {
          Gyms.push({
            docId: doc.id,

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
          <GymItem key={gym.id} showCount={false} gym={gym} index={index} />
        ))}
      </div>
    );
  }
}

export default Listing;
