import React, { Component } from "react";
import firebase from "firebase";
import Cookies from "js-cookie"
const db = firebase.firestore();

class GetBookingData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
      events: [],
    };
  }

  componentDidMount() {
    db.collection("reservation")
      .where("gym_id", "==", this.props.gym_id)
      .get()
      .then((items) => {
        const events = items.docs.map((doc) => {
          return { docId: doc.id, ...doc.data() };
        });
        Cookies.set('events', JSON.stringify(events, null, 4), { secure: true, expires: 7 });
        // localStorage.setItem("events", JSON.stringify(events, null, 4));
        this.setState({ events: events });
        this.events = events;
        // console.log("Show booking items: " + JSON.stringify(events, null, 4));
      });
  }

  render() {
    return <>{/* {"data:" + localStorage.getItem("events")} */}</>;
  }
}

export default GetBookingData;
