import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import Nav from "./components/Nav";
import Auth from "./Auth/Auth";
import Error from "./pages/Error";
import Callback from "./Callback";
import AddGym from "./pages/AddGym";
import GymProfile from "./pages/GymProfile";
import firebase from "./firebase";
import Footer from "./components/Footer";

import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render() {
    return (
      <>
        <Nav auth={this.auth} />
        <Switch>
          <div className="body">
            <Route
              path="/"
              exact
              render={(props) => <Home auth={this.auth} {...props} />}
            />
            <Route
              path="/callback"
              render={(props) => <Callback auth={this.auth} {...props} />}
            />
            <Route
              path="/profile"
              render={(props) =>
                this.auth.isAuthenticated() ? (
                  <Profile auth={this.auth} {...props} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route path="/404" component={Error} />
            <Route path="/add" component={AddGym} />

            {/*SAMPLE GYM PROFILE*/}
            <Route path="/gym_profile" component={GymProfile} />
          </div>
        </Switch>
        <div id="pls"></div>
        <Footer />
      </>
    );
  }
}

export default App;
