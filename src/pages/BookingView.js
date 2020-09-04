import React, { Component } from "react";
import firebase from "firebase";

import WeeklyScheduler from "../components/booking/WeeklyScheduler";
import "../theme/react-week-scheduler.css";

import Basic from "../components/calendar/Basic";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const startingDefault = { event: "default", color: "#d4d8dd" };
const blockingEvent = { event: "block", color: "#b66363" };
const limitingEvent = { event: "limit", color: "#d6bd43" };
const eventList = [startingDefault, blockingEvent, limitingEvent];

const db = firebase.firestore();

function ListItems(props) {
  return (
    <>
      <li>
        <b>{props.gymName}</b>
        <br />
        {props.value}
      </li>
    </>
  );
}

//TODO: created for test
function onPanelChange(value, mode) {
  console.log(value, mode);
}

class BookingView extends Component {
  constructor(props) {
    super(props);
    this.state = { bookingItems: [] };
  }

  componentDidMount() {
    db.collection("bookings")
      // .orderBy("gymName")
      .get()
      .then((items) => {
        const bookingItems = items.docs.map((doc) => {
          return { docId: doc.id, ...doc.data() };
        });
        this.setState({ bookingItems: bookingItems });
        this.bookingItems = bookingItems;
        console.log(
          "Show booking items: " + JSON.stringify(bookingItems, null, 4)
        );
      });
  }

  render() {
    return (
      <div>
        <div id="pls"></div>
        <div className="admin-page">
          {this.state.bookingItems.map((item) => (
            <ListItems
              key={JSON.stringify(this.state.bookingItems.docId)}
              value={JSON.stringify(item, null, 4)}
              gymName={JSON.stringify(item.gymName)}
            />
          ))}

          {/* <div>
            <WeeklyScheduler
              defaultEvent={startingDefault}
              selectedEvent={blockingEvent}
              events={eventList}
            />
          </div> */}
        </div>
        <br></br>

        <DndProvider backend={HTML5Backend}>
          <Basic />
        </DndProvider>
      </div>
    );
  }
}

export default BookingView;
