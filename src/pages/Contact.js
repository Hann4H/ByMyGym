import React, { Component } from "react";


class Contact extends Component {
  render() {
    return (
      <>

        <div id="slash"></div>

        <div id="pls"></div>

        <div id="idk">
          <hr />
          <div id="container-1">
              <form>
                  <p>
                      <label>Imię</label>
                      <input type="text" name="name"></input>
                  </p>
                  <p>
                      <label>Wiadomość</label>
                      <input type="text" name="message"></input>
                  </p>
              </form>
          </div>
        </div>
        <div id="pls"></div>
      </>
    );
  }
}

export default Contact;
