import React, { Component } from "react";
import Localization from "../components/Localization";
import firebase from "../firebase";

const nameStyle = {
  fontWeight: "bold",
  color: "var(--darkOrange)",
};

const textStyle = {
  color: "#808080",
};

const db = firebase.firestore();

class HallProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  async componentDidMount(props) {
    try {
      const cityRef = db.collection("gyms").doc(this.props.dataId);
      const doc = await cityRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        console.log("Document data:", doc.data());
        this.setState({ data: doc.data() });
      }
    } catch (error) {
      console.log("Wystapił błąd");
      console.log(error);
    }
  }

  render() {
    const lat = this.state.data.lat;
    const lng = this.state.data.lng;
    console.log("lat:" + typeof this.props.hall.lat);
    console.log("lat:" + this.props.hall.lat);
    console.log("lat:" + typeof lat);
    console.log("lat:" + lat);
    console.log("lng:" + typeof this.props.hall.lng);
    console.log("lng:" + this.props.hall.lng);
    console.log("lng:" + typeof lng);
    console.log("lng:" + lng);
    const position = [this.props.hall.lat, this.props.hall.lng];
    // const position = [lat, lng];
    const kod = this.state.data.kod;
    const nazwa = this.state.data.nazwa;
    const url = this.state.data.url;
    const telefon = this.state.data.telefon;
    const adres = this.state.data.adres;
    const miasto = this.state.data.miasto;
    const email = this.state.data.email;
    const grafika = this.state.data.grafika;
    const opis = this.state.data.opis;

    return (
      <div style={{ padding: "10px " }}>
        <h1 style={{ textAlign: "center", color: "var(--darkOrange)" }}>
          {nazwa}
        </h1>
        <p style={nameStyle}>Opis</p>
        <p style={textStyle} dangerouslySetInnerHTML={{ __html: opis }} />
        <br />
        <p style={nameStyle}>Adres</p>
        <p style={textStyle}>
          {adres}, {kod} {miasto}
        </p>
        <br />
        <p style={nameStyle}>Strona WWW</p>
        <p style={textStyle}>{url}</p>
        <br />
        <p style={nameStyle}>E-mail</p>
        <p style={textStyle}>{email}</p>
        <br />
        <p style={nameStyle}>Telefon</p>
        <p style={textStyle}>{telefon}</p>
        <br />

        <Localization position={position} />
        <br />
        <hr />
      </div>
    );
  }
}

export default HallProfile;
