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
  apiKey: "AIzaSyBMRmd0qVwZlNKxddN71lpHAGgOMrt-7wc",
  authDomain: "bestellliste-e3334.firebaseapp.com",
  databaseURL: "https://bestellliste-e3334.firebaseio.com",
  projectId: "bestellliste-e3334",
  storageBucket: "bestellliste-e3334.appspot.com",
  messagingSenderId: "702169543027",
  appId: "1:702169543027:web:31061d919b597d2a42d506",
  measurementId: "G-XD72ZYJ9DT"
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
