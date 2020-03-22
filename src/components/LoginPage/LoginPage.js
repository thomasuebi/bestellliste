import React, { useState } from "react"
import styles from "./LoginPage.module.css"
import firebase from "firebase/app"
import logo from "../HomePage/logo.png"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Alert from "@material-ui/lab/Alert"
import {
  FacebookLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons"

export default function() {
  const [errorAlert, setErrorAlert] = useState("")
  return (
    <div className={styles.root}>
      <Card>
        <CardContent className={styles.cardContent}>
          <h1 className={styles.title}>
            <img src={logo} className={styles.logo} />
          </h1>
          {errorAlert.length > 0 && (
            <Alert severity='error'>{errorAlert}</Alert>
          )}
          <FacebookLoginButton
            onClick={() => {
              const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
              firebase
                .auth()
                .signInWithPopup(facebookAuthProvider)
                .then(function(result) {})
                .catch(function(error) {
                  setErrorAlert(error.message)
                })
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
