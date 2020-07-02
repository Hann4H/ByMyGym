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
      //   .doc('OZiOSBKvQMcYsSPZIJuN')
      //   .get()
      //   .then(doc => {
      //     const Gyms = [];
      //       Gyms.push({
      //         docId: doc.id,
      //         gymName: doc.data().gymName,
      //         street: doc.data().street,
      //         zip: doc.data().zip,
      //         city: doc.data().city,
      //         height: doc.data().height,
      //         width: doc.data().width,
      //         length: doc.data().width,
      //         price: doc.data().price,
      //         id: doc.data().id,
      //         photo: doc.data().photo

      //     });
      //     this.setState({ Gyms });

      //   })
      //   .catch(function(error) {
      //     console.log("Error getting documents: ", error);
      //   });
      // }
      .orderBy("nazwa")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        const Gyms = [];
        var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        console.log("last", lastVisible);

        // var next = db
        //   .collection("cities")
        //   .orderBy("nazwa")
        //   .startAfter(lastVisible)
        //   .limit(10);

        querySnapshot.forEach(function(doc) {
          Gyms.push({
            docId: doc.id,

            gymName: doc.data().gymName,
            street: doc.data().street,
            zip: doc.data().zip,
            city: doc.data().city,
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

            nazwa: doc.data().nazwa,
            adres: doc.data().adres,
            miasto: doc.data().miasto,
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
