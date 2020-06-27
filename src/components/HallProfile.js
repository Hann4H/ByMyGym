import React, { Component } from "react";
import Localization from "../components/Localization";

const nameStyle = {
  fontWeight: "bold",
  color: "var(--darkOrange)",
};

const textStyle = {
  color: "#808080",
};

class HallProfile extends Component {
  render() {
    const position = [
      this.props.hall.geometry.coordinates[1],
      this.props.hall.geometry.coordinates[0],
    ];
    const id = this.props.hall.id;
    const kod = this.props.hall.properties.kod;
    const nazwa = this.props.hall.properties.nazwa;
    const url = this.props.hall.properties.url;
    const opis_klasy = this.props.hall.properties.opis_klasy;
    const telefon = this.props.hall.properties.telefon;
    const adres = this.props.hall.properties.adres;
    const miasto = this.props.hall.properties.miasto;
    const email = this.props.hall.properties.email;
    const grafika = this.props.hall.properties.grafika;
    const opis = this.props.hall.properties.opis;

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

        {/* <p>nazwa: {nazwa}</p>
        <p>coordinates: {position}</p>
        <p>id: {id}</p>
        <p>kod: {kod}</p>
        <p>url: {url}</p>
        <p>opis_klasy: {opis_klasy}</p>
        <p>telefon: {telefon}</p>
        <p>adres: {adres}</p>
        <p>miasto: {miasto}</p>
        <p>email: {email}</p>
        <p>grafika: {grafika}</p>
        <p>opis: {opis}</p> */}

        <Localization position={position} />
        <br />
        <hr />
      </div>
    );
  }
}

export default HallProfile;
