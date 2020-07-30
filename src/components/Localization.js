import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

class Localization extends Component {
  state = {
    gymLat: 52.406376,
    gymLng: 16.925167,
    zoom: 15,
  };

  render() {
    // const position = [this.state.gymLat, this.state.gymLng];
    const position = this.props.position;
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Latitude and longitude: <br /> {this.state.gymLat},{" "}
            {this.state.gymLng}
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default Localization;
