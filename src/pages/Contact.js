import React, { Component } from "react";
import axios from 'axios';

class Contact extends Component {

  state = {
    name: '',
    message: '',
    email: '',
    sent: false,
    buttonText: 'Wyślij'
  }

  formSubmit = (e) => {
    e.preventDefault()
  
    this.setState({
        buttonText: '...wysyłanie'
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
        buttonText: 'Wiadomość wysłana!'
    })
}

  render() {
    return (
      <>

        <div id="slash"></div>

        <div id="pls"></div>

        <div id="idk-8">

          
          <div className="container-contact">
              <form className="contact-form" onSubmit={ (e) => this.formSubmit(e)}>

                <p className="contact-p">Masz pytania? Chcesz uzyskać uprawnienia właściciela istniejącej już sali? <br />Napisz do nas!</p>
                <hr />

                <div>
                  <label class="message-email" htmlFor="message-email">E-mail</label>
                  <input className="name-input contact-input" 
                  onChange={(e) => this.setState({ email: e.target.value})} name="email" type="email" required value={this.state.email}/>
                </div>

                <div class="message-contact">
                  <label class="message" htmlFor="message-input">Wiadomość</label>
                  <textarea className="contact-input" rows="3"
                  onChange={e => this.setState({ message: e.target.value})} name="message" type="text" value={this.state.message} required></textarea>
                </div>

                <button className="button" type="submit">
                { this.state.buttonText }
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
