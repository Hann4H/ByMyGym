import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

// source:
// https://www.smashingmagazine.com/2020/02/javascript-maps-react-leaflet/
// https://leafletjs.com/examples.html
// npm install react-leaflet
// https://react-leaflet.js.org/
// https://www.latlong.net/

class Localization extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 10,
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default Localization;
