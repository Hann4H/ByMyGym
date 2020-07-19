import React, { Component } from "react";
import JsonData from "../JsonData";

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
    return (
      <div>
        <div id="pls"></div>
        <button onClick={this._onButtonClick}>
          Add halls from API to firebase
        </button>
        {this.state.showComponent ? <JsonData /> : null}
      </div>
    );
  }
}

export default Admin;
