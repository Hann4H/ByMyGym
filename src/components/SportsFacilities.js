import React, { Component } from "react";
import HallProfile from "./HallProfile";

export default class SportsFacilities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://www.poznan.pl/mim/plan/map_service.html?mtype=pub_transport&co=class_objects&class_id=331&lang=pl&fbclid=IwAR3RbnnS_rIhguIWD04UKOQzOBI60SuU_IwQsQDOrlbnj4ptscEPhECONoE"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            features: result.features,
          });
        },
        // Uwaga: to ważne, żeby obsłużyć błędy tutaj, a
        // nie w bloku catch(), aby nie przetwarzać błędów
        // mających swoje źródło w komponencie.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, features } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Ładowanie...</div>;
    } else {
      return (
        <ul style={{ listStyleType: "none" }}>
          {features.map((item) => (
            <li key={item.id}>
              <HallProfile hall={item} />
            </li>
          ))}
        </ul>
      );
    }
  }
}
