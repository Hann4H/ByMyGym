import React, { Component } from "react";
import firebase from "firebase";
import "../theme/react-week-scheduler.css";
import { Link } from "react-router-dom";
// import { Redirect } from 'react-router-dom'

import './OwnerManager.css';

const db = firebase.firestore();


class OwnerManager extends Component {
  constructor(props) {
    super(props);
    this.state = { ownedGyms: [] };
  }

  componentDidMount() {

    const ownedGyms = [];
    
    db.collection("gyms")
      .where("gymOwner", "==", localStorage.getItem("user"))
      .get()
      .then((items) => {
        items.forEach(function (doc) {
            doc.reservations = []
            ownedGyms.push(doc); 
        });

          ownedGyms.forEach((g) => {
            db.collection("reservation")
            .where("gym_id", "==", g.id)
            .get()
            .then((items) => {
              items.forEach(i => {
                g.reservations.push(i);
              })
              this.setState({ownedGyms: ownedGyms})
          });
          })
      })

  }

  
   

  render() {

    const ChangeStatus = (id) => {  
      console.log(id)
      db.collection("reservation")
        .doc(id)
        .update({
          title: "Zarezerwowane",
          bgColor: "#90EE90",
          movable: false,
          resizable: false,
        })
        .then(function () {
          console.log("Status successfully changed! Doc: " + id);
          window.location.reload(false);
        })
        .catch(function (error) {
          console.error("Error changing status: ", error);
        });
    }    

    const DeleteReservation = (id) => {  
      db.collection("reservation")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted! Doc: " + id);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    }    
    

    const renderGyms = this.state.ownedGyms.map((gym, i) => {
      return(
      <div className="gym_cont">
        <div className="gym_name_address">
          <div className="gym_name">{gym.data().gymName}</div>
          <div className="gym_address">{gym.data().gymStreet}</div>
        </div>
        <div className="reservations">
          {gym.reservations.length>0?
          gym.reservations.map(r => {
            return(
              <div style={{backgroundColor:r.data().bgColor}} className="reservation"> 
                <span>{r.data().name} {r.data().surname}</span>
                <span>Status: {r.data().title}</span>
                <span>Od: {r.data().start}</span>
                <span>Do: {r.data().end}</span>
                <span>{r.data().email}</span>
                <a href={"mailto:"+ r.data().email}>Napisz maila</a>
                <span>{r.data().phoneNumber}</span>
                <a href={"tel:" + r.data().phoneNumber}>Zadzwoń</a>
                <button className="delete_btn" onClick={ function(e) { DeleteReservation(r.id) } }> Usuń rezerwacje </button>
                <button className="change_status" onClick={ function(e) { ChangeStatus(r.id) } }> Zaakceptuj </button>
              </div>
            )
          }):
          <div>Nie ma zadnej Rezerwacji </div>
          }
       </div>
      </div>
      )
   });

    return (
      <div>
        <div id="pls"></div>
        <div className="admin-page">
          <h1 style={{ textAlign: "center", color: "var(--darkOrange)" }}>
            Twoje sale
          </h1>
         <div className="gyms_container"> 
          { renderGyms }
         </div>

        </div>
      </div>
    );
  }
}

export default OwnerManager;