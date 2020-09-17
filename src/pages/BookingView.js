import React, { Component } from "react";
import firebase from "firebase";
import "../theme/react-week-scheduler.css";
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
        // console.log(
        //   "Show booking items: " + JSON.stringify(bookingItems, null, 4)
        // );
      });
  }

  render() {
    return (
      <div>
        <div id="pls"></div>

        <div className="admin-page">
          {this.state.bookingItems.map((item, index) => (
            <ListItems
              key={index}
              // key={this.state.bookingItems.docId}
              value={JSON.stringify(item, null, 4)}
              gymName={JSON.stringify(item.gymName)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BookingView;
