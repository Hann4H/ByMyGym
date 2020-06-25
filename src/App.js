import React, { Component, useContext } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Routes from "./Routes"
import { AuthProvider } from "./AuthProvider"


export default function App() {

    return (
      
      <div>
        
        <Nav />
        <Routes />

        <Footer />
        
      </div>

    )
  } 


/*class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.authListener = this.authListener.bind(this);
  }
  componentDidMount() {
    this.authListener();
    
  }
  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');

      }
    });
  }
  render() {
    
    return (

      <div>
        
        <Nav />
        <Routes />

        <Footer />
        
      </div>

    );
  }
}

export default App;*/
