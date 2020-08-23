import React, { Component } from "react";
import Form from 'react-bootstrap/Form';

class Contact extends Component {
  render() {
    return (
      <>

        <div id="slash"></div>

        <div id="pls"></div>

        <div id="idk-8">

          
          <div className="container-contact">
              <form className="contact-form">

                <p className="contact-p">Masz pytania? Chcesz uzyskać uprawnienia właściciela istniejącej już sali? <br />Napisz do nas!</p>
                <hr />

                <div>
                  <label>Imię</label>
                  <input className="name-input contact-input" />
                </div>

                <div class="message-contact">
                  <label>Wiadomość</label>
                  <textarea className="contact-input" rows="3"></textarea>
                </div>

                <button>
                  WYŚLIJ
                </button>

              </form>
          </div>
        </div>
        <div id="pls"></div>
      </>
    );
  }
}

export default Contact;
