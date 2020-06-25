import React, { Component, useContext } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Routes from "./Routes"

export default function App() {
    return (
      <div>
        <Nav />
        <Routes />
        <Footer /> 
      </div>
    )
  } 

