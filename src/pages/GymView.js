import React, { Component } from "react";
import firebase from "firebase";
import "../theme/react-week-scheduler.css";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'
const db = firebase.firestore();


function ListItems(props) {
  const data = JSON.parse(props.value);
  const docId = data.docId;

  return (
    <>
      <div style={{ border: "2px solid var(--darkOrange)" }}>
        <table style={{ width: "100%", margin: "10px" }}>
          <tbody>
            <tr>
              <td></td>
              <td>
                hewwo
              </td>
            </tr>
          </tbody>
        </table>
        <button style={{ margin: "10px" }}>
          Zaakceptuj
        </button>
      </div>
      <br />
    </>
  );
}

class BookingView extends Component {
  constructor(props) {
    super(props);
    this.state = { newGyms: [] };
  }

  render() {

    if (localStorage.getItem("user")!='ZlVPgW1qH0X65ASXIUZoFXab2SI3') {
      return (
        <Redirect to="/login" />
      )
    }

    return (
      <div>
        <div id="pls"></div>
        <div className="admin-page">
          <h1 style={{ textAlign: "center", color: "var(--darkOrange)" }}>
            Akceptuj nowe sale
          </h1>
        </div>
      </div>
    );
  }
}

export default BookingView;
