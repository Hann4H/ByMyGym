import React from 'react';
import { firebaseAuth } from "./authReducer";

const AuthContext = React.createContext()
const initialState = {
  user: null
}

export const AuthProvider = (props) => {
  
  const value = initialState;
  
  return <AuthContext.Provider value={value}>
    {props.children}
  </AuthContext.Provider>
}
export const AuthConsumer = AuthContext.Consumer

export default AuthContext;




/*import React, { useState } from 'react';
import {authMethods} from './authmethods'

import { firebaseAuth } from "./authReducer";


export const Auth = React.createContext();
const initialState = {
    user: {}
}

export const AuthProvider = (props) => {

    const [state, dispatch] = React.useReducer(firebaseAuth, initialState);
    const value = {state, dispatch};

    return <Auth.Provider value={value}>
                {props.children}
           </Auth.Provider>

}

export default AuthProvider;*/


/*const handleSignup = () => {
    // middle man between firebase and signup 
    console.log('handleSignup')
    // calling signup from firebase server
    return authMethods.signup()
  }


const AuthProvider = (props) => {
    const [inputs, setInputs] = useState({email: '', password: ''})
    const [errors, setErrors] = useState([])
    const [token, setToken] = useState(null)

    return (
      <firebaseAuth.Provider
      value={{
        handleSignup,
        inputs, 
        setInputs,
      }}>
        {props.children}
  
      </firebaseAuth.Provider>
    );
  };
  

export default AuthProvider;
export const firebaseAuth = React.createContext()



import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from 'react-firebaseui/FirebaseAuth';

import firebase from "./firebase";

const defaultFirebaseContext = {
    authStatusReported: false,
    isUserSignedIn: false
};

export const FirebaseAuthContext = createContext(defaultFirebaseContext);


export default class FirebaseAuthProvider extends Component {

    state = defaultFirebaseContext;

    componentDidMount() {
        firebase.auth.onAuthStateChanged(user => this.setState({
            authStatusReported: true,
            isUserSignedIn: !!user
        }));
    }

    render(){
        const {children} = this.props;
        const {authStatusReported, isUserSignedIn} = this.state;
        return (
            <FirebaseAuthContext.Provider value={{isUserSignedIn, authStatusReported}}>
                {authStatusReported && children}
            </FirebaseAuthContext.Provider>
        );
    }
}*/