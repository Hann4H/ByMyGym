import React, { Component } from "react";

class Profile extends Component {
  state = {
    profile: null,
    error: "",
  };

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.props.auth.getProfile((profile, error) =>
      this.setState({ profile, error })
    );
  }

  render() {
    const { profile } = this.state;
    if (!profile) return null;
    return (
      <>
        <div id="slash"></div>
        <div className="profile-info">
          <div className="profile-div">
            <img
              className="profile-picture"
              src={profile.picture}
              alt="profile pic"
            />
            <h1>{profile.name}</h1>
          </div>
          <div className="profile-info-table">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="headline-info">First Name</td>
                  <td>{profile.given_name}</td>
                </tr>
                <tr>
                  <td className="headline-info">Last Name</td>
                  <td>{profile.family_name}</td>
                </tr>
                <tr>
                  <td className="headline-info">Login</td>
                  <td>{profile.nickname}</td>
                </tr>
                <tr>
                  <td className="headline-info">Email</td>
                  <td>{profile.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <pre style={{ display: "none" }}>
          {JSON.stringify(profile, null, 2)}
        </pre>
      </>
    );
  }
}

export default Profile;
