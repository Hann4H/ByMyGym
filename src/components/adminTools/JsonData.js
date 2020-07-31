import React, { Component } from "react";
import JsonToFirebase from "./JsonToFirebase";

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

    if (!isLoaded) return <div>Adding data to firebase...</div>;

    return (
      <>
        <JsonToFirebase json={items}></JsonToFirebase>
      </>
    );
  }
}

export default JsonData;