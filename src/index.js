import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./navbar.css";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { GymProvider } from "./Context";
import firebase from './firebase';
import  AppContext  from "./Context";


ReactDOM.render(
    <Router>
      <AppContext.Provider>
        <App />
      </AppContext.Provider>
    </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();