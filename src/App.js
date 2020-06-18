import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import Nav from "./components/Nav";
import { AuthProvider } from "./Auth/Auth"
import Error from "./pages/Error";
import SignUp from "./components/SignUp";
import AddGym from "./pages/AddGym";
import GymProfile from "./pages/GymProfile";
import firebase from "./firebase";
import Footer from "./components/Footer";
import Login from "./pages/Login";


class App extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      user : {}
    }
  }
  componentDidMount()
  {
    this.authListener();
  }
  authListener(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user})
      }
      else{
        this.setState({user : null})
      }
    })
  }
  render () {
    return (
          <div>
          <Nav/>
          <Switch>
            <div className="body">
              <Route path="/" exact component={Home}/>
              <Route path="/404" exact component={Error} />
              <Route path="/add" exact component={AddGym} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/gym_profile" exact component={GymProfile} />
            </div>
          </Switch>

          <Footer />
          </div>
    );
  }
};

export default App;