import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import firebase from "../firebase";

class Profile extends Component {
  state = {
    user: [],
    error: "",
    Reservations: []
  };

  componentDidMount() {
    const Reservations = [];


    this.loadUserProfile();

    firebase.firestore().collection("reservation").where("user_id", "==", localStorage.getItem("user"))
    .get()
    .then((querySnapshot) => {  

        querySnapshot.forEach(function (doc) {

          // firebase.firestore().collection("gyms").doc(doc.data().gym_id).get()
          // .then(snapshot => {
            Reservations.push({
              start: doc.data().start,
              end: doc.data().end,
              gym_id: doc.data().gym_id,
            //   gym_name: snapshot.data().gymName,
            // })
          })  
        })

        this.setState({ Reservations });
        console.log(this.state.Reservations)
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }

  loadUserProfile() {
    const user = localStorage.getItem("user");
    this.setState({ user });
  }



  render() {
    let { user } = this.state;
    if (!user) {
      return (
        <Redirect to="/login" />
      )
    }

    return (
      <>
        <div className="login-page">
        <div className="login-wave"></div>
        <div className="profile-container">
            <div className="profile-div">
              <img
                className="profile-picture"
                src={localStorage.getItem("photoURL")}
                alt="profile pic"
              />
              <h1>{localStorage.getItem("user_name")}</h1>
            </div>
            <div className="profile-info-table">
              <table className="table table-borderless">
                <tbody>
                  <tr className="profile-info">
                    <td className="headline-info">Imię</td>
                    <td>{localStorage.getItem("user_name")}</td>
                  </tr>
                  <tr className="profile-info">
                    <td className="headline-info">Email</td>
                    <td>{localStorage.getItem("email")}</td>
                  </tr>
                  <tr className="profile-info">
                    <td className="headline-info">Rezerwacje</td>
                    <td>
                      <table>
                        <tbody>
                        {this.state.Reservations.map((res, index) => (
                          <tr>
                            <td>{res.start}</td>
                          </tr>
                        ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
        </div>
        <pre style={{ display: "none" }}>{JSON.stringify(user, null, 2)}</pre>
      </>
    );
  }
}

export default Profile;
