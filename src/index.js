import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import {GymProvider} from './Context';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDjFhhGW3cRmqq4bYCarNJHV_3vFXl58Qs",
  authDomain: "bemygym-123.firebaseapp.com",
  databaseURL: "https://bemygym-123.firebaseio.com",
  projectId: "bemygym-123",
  storageBucket: "bemygym-123.appspot.com",
  messagingSenderId: "1083395574248",
  appId: "1:1083395574248:web:60071809562cbbfd003c5d",
  measurementId: "G-X9CPF7Z9ZV"
};

firebase.initializeApp(config);

ReactDOM.render(
  <GymProvider>
    <Router>
      <Route component={App} />
    </Router>
  </GymProvider>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
