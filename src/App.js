import React from "react"
import logo from "./logo.svg"
import styles from "./App.module.css"
import firebase from "firebase/app"
import "firebase/auth"
import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider
} from "@react-firebase/auth"
import LoginPage from "./components/LoginPage/LoginPage"
import HomePage from "./components/HomePage/HomePage"

const config = {
  apiKey: "",
  authDomain: "bestellliste-e3334.firebaseapp.com",
  databaseURL: "https://bestellliste-e3334.firebaseio.com",
  projectId: "bestellliste-e3334",
  storageBucket: "bestellliste-e3334.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}

function App() {
  return (
    <div className='App'>
      <FirebaseAuthProvider firebase={firebase} {...config}>
        {
          <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
              return isSignedIn ? <HomePage /> : <LoginPage />
            }}
          </FirebaseAuthConsumer>
        }
      </FirebaseAuthProvider>
    </div>
  )
}

export default App
