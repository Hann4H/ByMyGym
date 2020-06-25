import React, { Component, useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import firebase from '../firebase'
import AuthContext from "../AuthProvider";

class Nav extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      error: "",
      toggle: false
    };
    this.loggedIn = this.componentDidMount.bind(this);
}

logout() {
    firebase.auth().signOut();
}
  
componentDidMount() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  });
}
Toggle = () => {
  this.setState({ toggle: !this.state.toggle });
};

render() {
  if (window.location.pathname === '/signup') return null;
  if (window.location.pathname === '/login') return null;
  return (
    <>
      <div className="navBar">
        <button class="hamburger-button" onClick={this.Toggle}>
          <FaAlignRight />
        </button>
        <ul
          className={this.state.toggle ? "nav-links show-nav" : "nav-links"}
        >
          <li>
            <Link to="/">
              <img
                src={require("../img/logo.png")}
                alt="logo"
                className="logo"
              />
            </Link>
          </li>
          <li style={{ width: "100%" }}></li>
            <li>
              <button className="searchButton">
                <FaSearch size="30px"></FaSearch>
              </button>
            </li>
            <li>
              <button>
                <Link to="/add">DODAJ SALĘ</Link>
              </button>
            </li>
            <li>
            {this.state.loggedIn ?
              <button onClick={this.logout}>WYLOGUJ</button>                
              :
              <button><Link to='login'>ZALOGUJ</Link></button>              
            
            }
          
          </li>
        </ul>
      </div>
    </>
  );
}
}


export default Nav;


/*const Nav = (props) => {
    
    const [userState, setUserState] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    
    const {state, dispatch} = React.useContext(Auth);

    useEffect(() => {
        firebase.getUserState().then(user => {
            if(user){
                setUserState(user);
                setUserEmail(user.email);
            }
        });
    });

    const logout = () => {
        firebase.logout();
        setUserState(null);
        props.history.replace("/login");
        return dispatch({
            type: "LOGOUT",
            payload: {}
        });
    }
    
    let buttons;
    if(userState != null || state.user.hasOwnProperty("user")){
        //console.log(state);
        buttons =  ( <React.Fragment>
                        <li>{userEmail}</li>
                        <li><button className="logout" onClick={logout}>LogOut</button></li>
                    </React.Fragment> )
    }else{
        buttons = (
            <React.Fragment>
                <li><Link to="/signin">SignIn</Link></li>
                <li><Link to="/login">LogIn</Link></li>              
            </React.Fragment>
        )
    }



    return(
        <nav>
            <ul>

            {buttons}
            </ul>
        </nav>
    )
}
export default withRouter(Nav);







class Nav extends Component {

    constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
      this.state = {
        error: "",
        toggle: false
      };
  }


  user() {
    firebase.auth.onAuthStateChanged(user => this.setState({
        authStatusReported: true,
        isUserSignedIn: !!user
    }));
}

  logout() {
      firebase.auth().signOut();
  }
    

  Toggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    if (window.location.pathname === '/signup') return null;
    if (window.location.pathname === '/login') return null;
    return (
      <>
        <div className="navBar">
          <button class="hamburger-button" onClick={this.Toggle}>
            <FaAlignRight />
          </button>
          <ul
            className={this.state.toggle ? "nav-links show-nav" : "nav-links"}
          >
            <li>
              <Link to="/">
                <img
                  src={require("../img/logo.png")}
                  alt="logo"
                  className="logo"
                />
              </Link>
            </li>
            <li style={{ width: "100%" }}></li>
              <li>
                <button className="searchButton">
                  <FaSearch size="30px"></FaSearch>
                </button>
              </li>
              <li>
                <button>
                  <Link to="/add">DODAJ SALĘ</Link>
                </button>
              </li>
              <li>
              {/*{this.props.appContext.inputs ?(
          <span>
            <button onClick={() => firebase.auth().signOut()}>WYLOGUJ</button>
          </span>
        ) : (
          <Link to="login" >
            <button>ZALOGUJ</button>
          </Link>
        )}
            
            </li>
          </ul>
        </div>
      </>
    );
  }
}


export default Nav;*/