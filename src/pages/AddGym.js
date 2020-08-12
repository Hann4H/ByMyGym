import React, { Component } from "react";
import Hero from "../components/Hero";
import Form from "../components/gymForm";
import Banner from "../components/Banner";

class AddGym extends Component {
  render() {
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
