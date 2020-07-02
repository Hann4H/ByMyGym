import React, { Component } from "react";
import Localization from "../components/Localization";
import firebase from "../firebase";
import Scheduler, {
  ViewTypes,
  DATE_FORMAT,
  SchedulerData,
} from "react-big-scheduler";
import moment from "moment";

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
    this.showing = false;
    this.selectedBooking = null;
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
    const lat = this.state.data.lat ? this.state.data.lat : 52.409538;
    const lng = this.state.data.lng ? this.state.data.lng : 16.931992;
    const position = [lat, lng];
    const kod = this.state.data.kod;
    const nazwa = this.state.data.nazwa;
    const url = this.state.data.url;
    const telefon = this.state.data.telefon;
    const adres = this.state.data.adres;
    const miasto = this.state.data.miasto;
    const email = this.state.data.email;
    // const grafika = this.state.data.grafika;
    const opis = this.state.data.opis;

    const { showing } = this.state;

    return (
      <div className="idk5">
        <h1 className="gym-name" style={{ color: "var(--darkOrange)" }}>
          {nazwa}
        </h1>

        <div className="gym-details">
          <p style={nameStyle}>Opis</p>
          <p style={textStyle} dangerouslySetInnerHTML={{ __html: opis }} />
          <br />
          <p style={nameStyle}>Adres</p>
          <p style={textStyle}>
            {adres}, {kod} {miasto}
          </p>
          <br />
          <p style={nameStyle}>Strona WWW</p>
          <a href={`https://${url}`} className="external-url">
            {url}
          </a>
          <br />
          <p style={nameStyle}>E-mail</p>
          <p style={textStyle}>{email}</p>
          <br />
          <p style={nameStyle}>Telefon</p>
          <p style={textStyle}>{telefon}</p>
        </div>
        <div className="map">
          <Localization position={position} />
        </div>
        {/*<button className="gym-button" onClick={() => this.setState({ showing: !showing })}>ZAREZERWUJ</button>
                { showing 
                    ? <div className="booking"><Booking /></div>
                    : null
                }*/}
      </div>
    );
  }
}

export default HallProfile;
