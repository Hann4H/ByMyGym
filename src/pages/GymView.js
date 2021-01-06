import React, { Component } from "react";
import firebase from "firebase";
import "../theme/react-week-scheduler.css";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'
const db = firebase.firestore();


function ListItems(props) {
  const data = JSON.parse(props.value);
  const docId = data.docId;

  function ChangeStatus(e) {
    e.preventDefault();
    console.log("change status run");
    db.collection("gyms")
      .doc(docId)
      .update({
        accepted: true,
      })
      .then(function () {
        console.log("Status successfully changed! Doc: " + docId);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.error("Error changing status: ", error);
      });
  }

  function DeleteItemFromFirebase(e) {
    e.preventDefault();
    db.collection("gyms")
      .doc(docId)
      .delete()
      .then(function () {
        console.log("Document successfully deleted! Doc: " + docId);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }


  return (
    <>
      <div style={{ border: "2px solid var(--darkOrange)" }}>
        <table style={{ width: "100%", margin: "10px" }}>
          <tbody>
            <tr>
              <td>ID Właściciela</td>
              <td>
                {data.gymOwner}
              </td>
            </tr>
            <tr>
              <td>ID Sali</td>
              <td>
                {docId}
              </td>
            </tr>
            <tr>
              <td>Nazwa</td>
              <td>
                {data.gymName}
              </td>
            </tr>
            <tr>
              <td>Adres</td>
              <td>
                {data.gymStreet}, {data.gymZip} {data.gymCity}
              </td>
            </tr>
            <tr>
              <td>E-mail</td>
              <td>
                {data.gymEmail}
              </td>
            </tr>
            <tr>
              <td>Telefon</td>
              <td>
                {data.gymPhone}
              </td>
            </tr>
            <tr>
              <td>Wymiary</td>
              <td>
                Dł: {data.gymLength}, Wys: {data.gymHeight}, Szer: {data.gymWidth} 
              </td>
            </tr>
            <tr>
              <td>Widownia</td>
              <td>
                {data.audience}
              </td>
            </tr>
            <tr>
              <td>Przebieralnie</td>
              <td>
                {data.changingRooms}
              </td>
            </tr>
            <tr>
              <td>Cena</td>
              <td>
                {data.gymPrice}
              </td>
            </tr>
          </tbody>
        </table>
        <button style={{ margin: "10px", color: "white" }} onClick={DeleteItemFromFirebase}>
          Usuń
        </button>
        <button style={{ margin: "10px", color: "white" }} onClick={ChangeStatus}>
          Zaakceptuj
        </button>
      </div>
      <br />
    </>
  );
}

class GymView extends Component {
  constructor(props) {
    super(props);
    this.state = { newGyms: [] };
  }

  componentDidMount() {
    db.collection("gyms")
      .where("accepted", "==", false )
      .get()
      .then((items) => {
        const newGyms = items.docs.map((doc) => {
          return { docId: doc.id, ...doc.data() };
        });
        this.setState({ newGyms: newGyms });
        this.newGyms = newGyms;
      });
  }

  render() {

    if (localStorage.getItem("user")!=process.env.REACT_APP_ADMIN_ID) {
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
          {this.state.newGyms.map((item, index) => (
            <ListItems
              key={index}
              value={JSON.stringify(item, null, 4)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default GymView;
