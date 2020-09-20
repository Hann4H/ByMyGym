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
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import BookingView from "./pages/BookingView";
import FinishReservation from "./pages/FinishReservation";

const Routes = () => (
    <React.Fragment>
      <div className="RouterBody">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/add" exact component={AddGym} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUpComponent} />
        <Route path="/gym_profile/:id" component={GymProfile} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/gyms" exact component={Gyms} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/booking" exact component={BookingView} />
        <Route path="/finishReservation" exact component={FinishReservation} />
        <Route path="*" component={Error} status={404}/>
        </Switch>
      </div>
    </React.Fragment>
);

export default Routes;
