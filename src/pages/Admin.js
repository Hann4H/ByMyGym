import React, { Component } from "react";
import JsonData from "../components/adminTools/JsonData";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    this.setState({
      showComponent: true,
    });
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
          <div style={{ border: "2px solid var(--darkOrange)" }}>
            <table style={{ width: "100%", margin: "10px" }}>
              <tbody>
                <tr>
                  <td>Dodaj sale do firebase z API</td>
                  <td>
                    <button onClick={this._onButtonClick}>Dodaj</button>
                    {this.state.showComponent ? <JsonData /> : null}
                  </td>
                </tr>
                <tr>
                  <td>Zarządzaj rezerwacją</td>
                  <td>
                    <Link to="/booking" style={{ color: "black" }}>
                      <button>Przejdź</button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
