import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./components/Profile";
import Nav from "./components/Nav";
import { AuthProvider } from "./Auth/Auth";
import Error from "./pages/Error";
import SignUpComponent from "./pages/SignUp";
import AddGym from "./pages/AddGym";
import GymProfile from "./pages/GymProfile";
import firebase from "./firebase";
import Footer from "./components/Footer";
import Login from "./pages/Login";

const Routes = () => (

    <Switch>
          <div className="body">
            <Route path="/" exact component={Home} />
            <Route path="/404" exact component={Error} />
            <Route path="/add" exact component={AddGym} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUpComponent} />
            <Route path="/gym_profile" exact component={GymProfile} />
            {/*<Route path='/profile' exact component={Profile} />*/}
          </div>
    </Switch>

);

export default Routes;