import React, { Component } from "react";
import { Link } from "react-router-dom";
import "firebase/firestore";
import "firebase/storage";
import firebase from "../firebase";

let storage = firebase.storage();

class GymItem extends Component {
  render() {
    let url = null;
    // let url = `https://firebasestorage.googleapis.com/v0/b/bemygym-123.appspot.com/o/${this.props.gym.docId}/1.png?alt=media`;
    // console.log("id of the document: " + this.props.gym.docId);
    // try {
    //   url = storage.refFromURL(
    //     `https://firebasestorage.googleapis.com/v0/b/bemygym-123.appspot.com/o/${this.props.gym.docId}/1.png`
    //   );
    //   console.log("is ok");
    // } catch (err) {
    //   url = null;
    //   console.log("is not ok");
    // }

    return (
      <div>
        <div key={this.props.index} className="single-listing">
          <div className="listing-content">
            <div className="place-for-img">
              {/* <img id="myimg" src={gym.photo} /> */}
              {url ? (
                <img id="myimg" src={url} alt="gym" />
              ) : (
                <div className="place-for-img">
                  <img
                    id="myimg_none"
                    src={require("../img/no_image.svg.png")}
                    alt="nothing"
                  />
                </div>
              )}
            </div>
            <div className="gym-short-info">
              <h3 className="listing-header">{this.props.gym.gymName}</h3>
              <p>
                Adres: {this.props.gym.street}, {this.props.gym.city}{" "}
                {this.props.gym.zip}
              </p>
              <p>
                Wymiary: {this.props.gym.length}m x {this.props.gym.width}m x{" "}
                {this.props.gym.height}m
              </p>
              <p>Cena za godzinę: {this.props.gym.price}zł</p>

              <Link
                to={{
                  pathname: `/gym_profile/${this.props.gym.docId}`,
                }}
              >
                <button>więcej informacji</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GymItem;
