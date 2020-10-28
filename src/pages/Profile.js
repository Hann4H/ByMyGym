import React, { Component } from "react";
import { Redirect } from 'react-router-dom'

class Profile extends Component {
  state = {
    user: [],
    error: "",
  };

  componentDidMount() {
    this.loadUserProfile();
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
