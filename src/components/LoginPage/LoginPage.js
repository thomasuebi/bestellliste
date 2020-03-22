import React from "react"
import styles from "./LoginPage.module.css"
import firebase from "firebase/app"
import logo from "../HomePage/logo.png"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import {
  FacebookLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons"

export default function() {
  return (
    <div className={styles.root}>
      <Card>
        <CardContent className={styles.cardContent}>
          <h1 className={styles.title}>
            <img src={logo} className={styles.logo} />
          </h1>
          <FacebookLoginButton
            onClick={() => {
              const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
              firebase.auth().signInWithPopup(facebookAuthProvider)
            }}>
            <span>Weiter mit Facebook</span>
          </FacebookLoginButton>
          <GoogleLoginButton
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
              firebase.auth().signInWithPopup(googleAuthProvider)
            }}>
            <span>Weiter mit Google</span>
          </GoogleLoginButton>
        </CardContent>
      </Card>
    </div>
  )
}
