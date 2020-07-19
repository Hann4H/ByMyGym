import React, { Component } from "react";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import GymName from "./GymName";

class GymDetails extends Component {
  state = { Gyms: [] };

  componentDidMount() {
    firebase
      .firestore()
      .collection("gyms")
      .where("id", "==", "00d4ketGH6NrN2HO1xlf")
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
            audience: doc.data().audience,
            changingRooms: doc.data().changingRooms,
            id: doc.data().id,
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
        <p>coś tam</p>
        {this.state.Gyms.map((gym) => {
          return (
            <div>
              <div>
                <div>
                  <GymName title={gym.gymName}></GymName>
                  <div id="text-constrain">
                    <p id="address">
                      {gym.gymStreet}
                      <br /> {gym.gymCity} {gym.zip}
                    </p>
                    <div className="gym-info">
                      <p>
                        Wymiary: {gym.length}m x {gym.width}m x {gym.height}m
                      </p>
                      <p>Cena za godzinę: {gym.price}zł</p>
                      <p>Szatnie: {gym.changingRooms}</p>
                      <p>Ilość miejsc na widowni: {gym.audience}</p>
                      <p>Parking: </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default GymDetails;
