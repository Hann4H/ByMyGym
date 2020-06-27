import React from "react";
import firebase from "./firebase";

function JsonToFirebase(props) {
  const db = firebase.firestore();

  const ref = db.collection("gyms").doc();

  props.json.map((item) =>
    db.collection("gyms").add({
      gymName: item.properties.nazwa,
      street: item.properties.adres,
      city: item.properties.miasto,

      id: item.id,
      kod: item.properties.kod,
      url: item.properties.url,
      opis_klasy: item.properties.opis_klasy,
      telefon: item.properties.telefon,
      email: item.properties.email,
      grafika: item.properties.grafika,
      opis: item.properties.opis,
      lat: item.geometry.coordinates[1],
      lng: item.geometry.coordinates[0],

      nazwa: item.properties.nazwa,
      adres: item.properties.adres,
      miasto: item.properties.miasto,
    })
  );

  return null;
}

export default JsonToFirebase;
