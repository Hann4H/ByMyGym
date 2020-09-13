import React, { Component } from "react";
import axios from 'axios';
import { th } from "date-fns/locale";

const validEmailRegex = RegExp(
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

const countErrors = (errors) => {
  let count = 0;
  Object.values(errors).forEach((val) => val.length > 0 && (count = count + 1));
  return count;
};


class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      email: '',
      message: '',
      formValid: false,
      errorCount: null,
      errors: {
        nickname: "",
        email: "",
        message: ""
      },
    }
  }

  onNameChange(event) {
    this.setState({nickname: event.target.value})
  }    

  onEmailChange(event) {
    this.setState({email: event.target.value})
  }    

  onMsgChange(event) {
    this.setState({message: event.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "nickname":
        errors.nickname = value.length < 2 ? "imię jest niepoprawne" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "e-mail jest niepoprawny";
        break;
      case "message":
        errors.number =
          value.length < 9 ? "wpisz wiadomość" : "";
        break;
      default:
        break;
    }

    axios({
      method: "POST", 
      url:"http://localhost:4444/send", 
      data: {
          name: this.state.nickname,   
          email: this.state.email,  
          message: this.state.message
      }
    }).then((response)=>{
        if (response.data.status === 'success'){
            alert("Wiadomość została wysłana"); 
            this.resetForm()
        }else if(response.data.status === 'fail'){
            alert("Błąd")
        }
    })

  }

  resetForm(){
    this.setState({nickname: '', email: '', message: ''})
  }

  render() {
    const { errors, formValid } = this.state;
    
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
                  <input className="name-input contact-input" value={this.state.nickname} onChange={this.onNameChange.bind(this)} id="nickname" type="text" name="nickname" required />
                  {errors.nickname.length > 0 && (
                    <span className="error">{errors.nickname}</span>
                  )}
                </div>

                <div>
                  <label class="message-email" htmlFor="message-email">E-mail</label>
                  <input className="name-input contact-input" value={this.state.email} onChange={this.onEmailChange.bind(this)} name="email" id="email" type="email" aria-describedby="emailHelp" required />
                  {errors.email.length > 0 && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>

                <div class="message-contact">
                  <label class="message" htmlFor="message-input">Wiadomość</label>
                  <textarea className="contact-input" value={this.state.message} onChange={this.onMsgChange.bind(this)} name="message" rows="3" id="message" type="text" required></textarea>
                  {errors.message.length > 0 && (
                    <span className="error">{errors.message}</span>
                  )}
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
