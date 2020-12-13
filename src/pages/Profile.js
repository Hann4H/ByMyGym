import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom'
import firebase from "../firebase";
import Loading from "../components/Loading";
import PopUp from "../components/PopUp";
import StarRatings from "../components/StarRatings";

var now = new Date();

class Profile extends Component {
  state = {
    user: [],
    error: "",
    name: "",
    Reservations: [],
    Gyms: [],
    seen: false,
    loading: false,
  };

  componentDidMount() {
    const Reservations = [];
    const Gyms = [];

    this.loadUserProfile();

    firebase.firestore().collection("gyms").get().then((querySnapshot) => {
      this.setState({loading: true});
      querySnapshot.forEach(function (doc) {
        Gyms.push({
          docId: doc.id,
          gymName: doc.data().gymName,
        });
      });
      this.setState({ Gyms });

    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
    

    firebase.firestore().collection("reservation").where("user_id", "==", localStorage.getItem("user"))
    .get()
    .then((querySnapshot) => {  

        querySnapshot.forEach(function (doc) {
            Reservations.push({
              start: doc.data().start,
              end: doc.data().end,
              gym_id: doc.data().gym_id,
              scored: doc.data().scored,
              bookingID: doc.id
          })  
        })

        this.setState({ Reservations });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


    firebase.firestore().collection("users").where("email", "==", localStorage.getItem("email"))
    .get()
    .then((snapshot) => {
        snapshot.forEach(doc => {
          this.setState({name: doc.data().firstName + " " + doc.data().surname})
        })
    })


  }

  loadUserProfile() {
    const user = localStorage.getItem("user");
    this.setState({ user });
    this.setState({ name: localStorage.getItem("user_name")})
  }

  togglePop = () => {
    this.setState({
     seen: !this.state.seen
    });
   };



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
                alt="zdjęcie profilowe"
              />
              <h1>{this.state.name}</h1>
            </div>
            <div className="profile-info-table">
              <table className="table table-borderless">
                <tbody>
                  <tr className="profile-info">
                    <td className="headline-info">Imię</td>
                    <td>{this.state.name}</td>
                  </tr>
                  <tr className="profile-info">
                    <td className="headline-info">Email</td>
                    <td>{localStorage.getItem("email")}</td>
                  </tr>
                  <tr className="profile-info">
                    <td className="headline-info">Rezerwacje</td>
                  </tr>
                </tbody>
              </table>
              <table>
              <tbody>
                <div className="gyms-load">
                  {this.state.loading ? null : <Loading />}
                </div>
                <div className="profile-bookings">
                  {this.state.Reservations.map((res, index) => (
                    this.state.Gyms.filter(gym => gym.docId == res.gym_id).map(filteredName => (
                      <tr>
                        <Link to={`/gym_profile/${res.gym_id}`}><td>{filteredName.gymName}</td></Link>
                        <td>Od: {res.start}</td>
                        <td>Do: {res.end}</td>
                        <button>ZMIEŃ</button>
                        {/* {this.state.scored ? "" : ( <button onClick={this.togglePop} >OCEŃ</button> )}                          
                        {this.state.seen ? <PopUp toggle={this.togglePop} gymId={res.gym_id} bookingID={res.bookingID}/> : null} */}
                        <StarRatings gymID={res.gym_id} bookingID={res.bookingID}/>
                      </tr>
                    ))
                  ))}
                </div>
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
