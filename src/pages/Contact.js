import React, { Component } from "react";
import axios from 'axios';
import { th } from "date-fns/locale";

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    }
}

  handleSubmit(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    axios({
      method: "POST", 
      url:"http://localhost:4444/send", 
      data: {
          name: name,   
          email: email,  
          message: message //this.state.message
      }
    }).then((response)=>{
        if (response.data.msg === 'success'){
            alert("Message Sent."); 
            this.resetForm()
        }else if(response.data.msg === 'fail'){
            alert("Message failed to send.")
        }
    })

  }

  resetForm(){
      document.getElementById('contact-form').reset();
      this.setState({name: '', email: '', message: ''})
  }

  onMsgChange(event) {
    this.setState({message: event.target.value})
  }



  render() {
    return (
      <>

        <div id="slash"></div>

        <div id="pls"></div>

        <div id="idk-8">

          
          <div className="container-contact">
              <form className="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">


                <p className="contact-p">Masz pytania? Chcesz uzyskać uprawnienia właściciela istniejącej już sali? <br />Napisz do nas!</p>
                <hr />

                <div>
                  <label class="message-email" htmlFor="message-name">Imię</label>
                  <input className="name-input contact-input" id="name" type="text" name="name" required />
                </div>

                <div>
                  <label class="message-email" htmlFor="message-email">E-mail</label>
                  <input className="name-input contact-input" name="email" id="email" type="email" aria-describedby="emailHelp" required />
                </div>

                <div class="message-contact">
                  <label class="message" htmlFor="message-input">Wiadomość</label>
                  {/* <textarea className="contact-input" name="message" rows="3" id="message" type="text" value={this.state.message} onChange={this.onMsgChange.bind(this)} required></textarea> */}
                  <input className="name-input contact-input" name="message" id="message" type="text" required />
                </div>

                <button className="button" type="submit">
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
