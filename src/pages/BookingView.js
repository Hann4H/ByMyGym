import React, { Component, useState, useEffect } from "react";
import firebase from "firebase";
import "../theme/react-week-scheduler.css";
const db = firebase.firestore();

function ListItems(props) {
  let data = JSON.parse(props.value);
  let docId = data.docId;

  const [idItem, setidItem] = useState([]);

  function DeleteItemFromFirebase(e) {
    e.preventDefault();
    console.log("delete function run");
    db.collection("bookings")
      .doc(docId)
      .delete()
      .then(function () {
        console.log("Document successfully deleted! Doc: " + docId);
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });

    // window.location.reload(false);
  }

  return (
    <>
      <li>
        <p>Doc ID: {data.docId}</p>
        <button onClick={DeleteItemFromFirebase}>Delete item</button>

        {/* onClick={DeleteItemFromFirebase(data.docId)} */}
        <br />
        <p>Value:</p>
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
