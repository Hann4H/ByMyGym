import React , { Component, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "../firebase";
import TextField from '@material-ui/core/TextField';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import AuthContext from "../AuthProvider"



const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: "/"
  }

  
  class Login extends Component{

    static contextType = AuthContext

      constructor()
      {
          super();
          this.login = this.login.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.signup = this.signup.bind(this);
          this.state={
              email : "",
              password : "",
              loggedIn: false
          };
      }
  
      login(e){
          e.preventDefault();
          firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
              console.log(u);
          }).catch((err)=>{
              console.log(err);
          })
      }
  
      signup(e){
          e.preventDefault();
          firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
              console.log(u)
          }).catch((err)=>{
              console.log(err);
          })
      }
      
      handleChange(e){
          this.setState({
              [e.target.name] : e.target.value
          })
      }
  
      user() {
        firebase.auth.onAuthStateChanged().then((u)=>{
            this.state.loggedIn = true;
        })
      }
      
  
      render() {
        

          return(
              <div className="login-page">
                  <div className="login-wave"></div>
  
                  <div className="login-background">
                      <Link to="/"><img className="login-logo" src={require("../img/logo.png")}/></Link>
                      <form className="login-form" noValidate autoComplete="off">
                          <TextField
                          type="email"
                          id="email"
                          name="email"
                          placeholder="adres e-mail"
                          onChange={this.handleChange}
                          value={this.state.email}
                          color="secondary"
                          />
                          <TextField
                          name="password"
                          type= "password"
                          onChange={this.handleChange}
                          id="password"
                          placeholder="hasło"
                          value={this.state.password}
                          color="secondary"
                          />
                          <button onClick={this.login}>Zaloguj</button>
                          
                          <Link to="/signup" className="login-link-signup"><p>Nie masz konta? <span>Zarejestruj się!</span></p></Link>
                          
                      </form>
                      <FirebaseAuth className="login-external" uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                  </div>
                  
              </div>
              
          )
      }
  }
  export default Login;



/*const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [routeRedirect, setRouteRedirect] = useState(false);
    const [signInFlow, setSignInFlow] = useState("popup");
    const [signInOptions, setSignInOptions] = useState([firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID]);
    const [signInSuccessUrl, setSignInSuccessUrl] = useState("/");

    const {state, dispatch} = React.useContext(Auth);

    const login = async(e) => {
        e.preventDefault();
        let response = await firebase.login(email, password);
        if(response.hasOwnProperty("message")){
            console.log(response.message);
        }else{
            //console.log(response.user);
            setRouteRedirect(true);
            return dispatch({
                type: "LOGIN",
                payload: response.user
            });
           
        }
    }


    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    }

    return(
        <React.Fragment>

            <div className="login-page">
                <div className="login-wave"></div>

                <div className="login-background">
                    <Link to="/"><img className="login-logo" src={require("../img/logo.png")}/></Link>
                    <form className="login-form" noValidate autoComplete="off">
                        <TextField
                        type="email"
                        id="email"
                        name="email"
                        placeholder="adres e-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        color="secondary"
                        />
                        <TextField
                        name="password"
                        type= "password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        placeholder="hasło"
                        color="secondary"
                        />
                        <button onClick={login}>Zaloguj</button>
                        <Link to="/signup" className="login-link-signup"><p>Nie masz konta? <span>Zarejestruj się!</span></p></Link>
                        
                    </form>
                    <FirebaseAuth className="login-external" signInSuccessUrl={signInSuccessUrl} signInFlow={signInFlow} signInOptions={signInOptions} firebaseAuth={firebase.auth()}/>
                </div>
                
            </div>
    
        </React.Fragment>

    )


}



export default Login;





const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: "/"
}

class Login extends Component{
    constructor()
    {
        super();
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state={
            email : "",
            password : ""
        };
    }

    login(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            console.log(u)
        }).catch((err)=>{
            console.log(err);
        })
    }

    signup(e){
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            console.log(u)
        }).catch((err)=>{
            console.log(err);
        })
    }
    
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    

    render() {
        return(
            <div className="login-page">
                <div className="login-wave"></div>

                <div className="login-background">
                    <Link to="/"><img className="login-logo" src={require("../img/logo.png")}/></Link>
                    <form className="login-form" noValidate autoComplete="off">
                        <TextField
                        type="email"
                        id="email"
                        name="email"
                        placeholder="adres e-mail"
                        onChange={this.handleChange}
                        value={this.state.email}
                        color="secondary"
                        />
                        <TextField
                        name="password"
                        type= "password"
                        onChange={this.handleChange}
                        id="password"
                        placeholder="hasło"
                        value={this.state.password}
                        color="secondary"
                        />
                        <button onClick={this.login}>Zaloguj</button>
                        <Link to="/signup" className="login-link-signup"><p>Nie masz konta? <span>Zarejestruj się!</span></p></Link>
                        
                    </form>
                    <FirebaseAuth className="login-external" uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                </div>
                
            </div>
            
        )
    }
}
export default Login;*/