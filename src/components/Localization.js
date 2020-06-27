import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

class Localization extends Component {
  state = {
    lat: 52.406376,
    lng: 16.925167,
    zoom: 15,
  };

  render() {
    // const position = [this.state.lat, this.state.lng];
    const position = this.props.position;
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Latitude and longitude: <br /> {this.state.lat}, {this.state.lng}
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default Localization;
