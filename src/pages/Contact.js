import React, { Component } from "react";
import axios from 'axios';

class Contact extends Component {

  state = {
    name: '',
    message: '',
    email: '',
    sent: false,
    buttonText: 'Send Message'
  }

  formSubmit = (e) => {
    e.preventDefault()
  
    this.setState({
        buttonText: '...sending'
    })
  
    let data = {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message
    }
    
    axios.post('API_URI', data)
    .then( res => {
        this.setState({ sent: true }, this.resetForm())
    })
    .catch( () => {
      console.log('Message not sent')
    })
  }

  resetForm = () => {
    this.setState({
        name: '',
        message: '',
        email: '',
        buttonText: 'Message Sent'
    })
}


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

                <button className="button">
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
