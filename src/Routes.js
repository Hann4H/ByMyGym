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
import FAQ from "./pages/FAQ";
import BookingView from "./pages/BookingView";
import GymView from "./pages/GymView";
import NoAccess from "./pages/NoAccess";
import ReservationsView from "./pages/ReservationsView";
import Reset from "./pages/Reset";

import FinishReservation from "./pages/FinishReservation";
import Maps from "./pages/Maps";
import OwnerManager from "./pages/OwnerManager";

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

const Routes = () => (
    <React.Fragment>
      <div className="RouterBody">
      <Route component={ScrollToTop} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/faq" exact component={FAQ} />
        <Route path="/add" exact component={AddGym} />
        <Route path="/login" exact component={Login} />
        <Route path="/gym_profile/login" exact component={Login} />
        <Route path="/signup" exact component={SignUpComponent} />
        <Route path="/reset" exact component={Reset} />
        <Route path="/gym_profile/:id" component={GymProfile} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/gyms" exact component={Gyms} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/booking" exact component={BookingView} />
        <Route path="/newgyms" exact component={GymView} />
        <Route path="/map" exact component={Maps}/>
        <Route path="/reservations" exact component={ReservationsView} />
        <Route path="/ownerManager" exact component={OwnerManager} />
        <Route path="/finishReservation" exact component={FinishReservation} />
        <Route path="/noaccess" exact component={NoAccess} />
        <Route path="*" component={Error} status={404}/>
        
        </Switch>
      </div>
    </React.Fragment>
);

export default Routes;
