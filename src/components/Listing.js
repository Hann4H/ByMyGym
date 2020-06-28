import React, { Component } from "react";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import ListingImg from "./ListingImg";
import { Link, withRouter } from "react-router-dom";

class Listing extends Component {
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

  image(id) {
    firebase
      .storage()
      .ref()
      .child(`${id}/1.png`)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        return url;
      });
  }

  render() {
    return (
      <div>
        {this.state.Gyms.map((gym) => {
          return (
            <div className="single-listing">
              <div className="listing-content">
                <div className="place-for-img">
                  {this.image(gym.id) ? (
                    <img id="myimg" src={this.image(gym.id)} alt="gym" />
                  ) : (
                    <div className="place-for-img">
                      <img
                        id="myimg"
                        src={require("../img/no_image.svg.png")}
                        alt="nothing"
                      />
                    </div>
                  )}
                </div>
                <div className="gym-short-info">
                  <h3 className="listing-header">{gym.gymName}</h3>
                  <p>
                    Adres: {gym.street}, {gym.city} {gym.zip}
                  </p>
                  <p>
                    Wymiary: {gym.length}m x {gym.width}m x {gym.height}m
                  </p>
                  <p>Cena za godzinę: {gym.price}zł</p>

                  <Link
                    to={{
                      pathname: `/gym_profile/00d4ketGH6NrN2HO1xlf`,
                      // pathname: `/gym_profile/${gym.id}`,
                    }}
                  >
                    <button>więcej informacji</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Listing;
