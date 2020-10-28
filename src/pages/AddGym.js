import React, { Component } from "react";
import Hero from "../components/Hero";
import Form from "../components/gymForm";
import Banner from "../components/Banner";
import { Redirect} from 'react-router-dom'

class AddGym extends Component {

  state = {
    user: [],
  };

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const user = localStorage.getItem("user");
    this.setState({ user });
  }

  render() {

    if (!this.state.user) {
      return (
        <Redirect to="/login" />
      )
    }

    return (
      <>
        <Hero hero="gymsHero">
          <Banner title="DODAJ SALĘ" banner="gymsBanner">
            <div id="bar"></div>
          </Banner>
        </Hero>
        <div id="slash"></div>
        <div id="idk9">
          <div id="addGym_title">WYPEŁNIJ DANE</div>
          <div id="container-1">
            <Form></Form>
          </div>
        </div>
        <div id="pls"></div>
      </>
    );
  }
}

export default AddGym;
