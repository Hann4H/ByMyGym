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
import Login from "./pages/Login";
import SignUp from "./components/SignUp";

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
            <Route path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp}/>

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
