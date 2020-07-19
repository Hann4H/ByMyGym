import React from "react";
import { Switch, Route } from "react-router-dom";
import Gyms from "./pages/Gyms";
import Home from "./pages/Home";
import Error from "./pages/Error";
import SignUpComponent from "./pages/SignUp";
import AddGym from "./pages/AddGym";
import GymProfile from "./pages/GymProfile";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

const Routes = () => (
  <Switch>
    <React.Fragment>
      <div className="RouterBody">
        <Route path="/" exact component={Home} />
        <Route path="/404" exact component={Error} />
        <Route path="/add" exact component={AddGym} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUpComponent} />
        <Route path="/gym_profile/:id" component={GymProfile} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/gyms" exact component={Gyms} />
        <Route path="/search" exact component={Search} />
      </div>
    </React.Fragment>
  </Switch>
);

export default Routes;
