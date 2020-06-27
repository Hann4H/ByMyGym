import React, { useEffect, useState, Component } from 'react';
import { divIcon } from 'leaflet';
import firebase from "./firebase"
import JsonToFirebase from "./JsonToFirebase"
import Loading from "./components/Loading";

class JsonData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch(
      `https://www.poznan.pl/mim/plan/map_service.html?mtype=pub_transport&co=class_objects&class_id=331&lang=pl&fbclid=IwAR2NxBA6WgC3kymw6uG8ZTfHPvOkAOfhn-d54FNCATm2yWt79JDTgJaKIq0`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json.features,
          isLoaded: true,
        });
        console.log(json.features);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { isLoaded, items } = this.state;

    if (!isLoaded) return <div>Loading...</div>;

    return (
      <>
        {/* <JsonToFirebase json={items}></JsonToFirebase> */}
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.properties.nazwa}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default JsonData;
