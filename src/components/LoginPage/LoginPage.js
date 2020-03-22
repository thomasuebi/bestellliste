import React, { useState } from "react"
import styles from "./LoginPage.module.css"
import firebase from "firebase/app"
import logo from "../HomePage/logo.png"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Alert from "@material-ui/lab/Alert"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import {
  FacebookLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons"

export default function() {
  const [errorAlert, setErrorAlert] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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

          <TextField
            className={styles.textfield}
            id='outlined-basic'
            label='E-Mail'
            variant='outlined'
            type='email'
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            className={styles.textfield}
            type='password'
            id='outlined-basic'
            label='Passwort'
            variant='outlined'
            onChange={event => setPassword(event.target.value)}
          />
          <Button
            onClick={() => {
              firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(function(error) {
                  setErrorAlert(error.message)
                })
            }}>
            Login
          </Button>
          <Button
            onClick={() => {
              firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(function(error) {
                  setErrorAlert(error.message)
                })
            }}>
            Registrieren
          </Button>
          <hr className={styles.hr} />
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
