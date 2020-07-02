import React, { Component } from "react";
import { Link } from "react-router-dom";

class GymItem extends Component {
  render() {
    return (
      <div>
        <div key={this.props.index} className="single-listing">
          <div className="listing-content">
            <div className="place-for-img">
              {/* <img id="myimg" src={gym.photo} /> */}
              {this.props.url ? (
                <img id="myimg" src={this.props.url} alt="gym" />
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
