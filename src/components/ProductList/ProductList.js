import React, { useState, useEffect } from "react"
import styles from "./ProductList.module.css"
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc"
import arrayMove from "array-move"
import { DragIndicator } from "@material-ui/icons"
import TextField from "@material-ui/core/TextField"
import Section from "../Section/Section"
import Button from "@material-ui/core/Button"
import firebase, { firestore } from "firebase"
import { Add } from "@material-ui/icons"

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

firebase.initializeApp(config)

const db = firebase.firestore()

export default function(props) {
  const [sections, setSections] = useState([])
  const [email, setEmail] = useState("")
  useEffect(() => {
    gatherFormData()
  }, [])

  async function gatherFormData() {
    const doc = await db
      .collection("forms")
      .doc(firebase.auth().currentUser.uid)
      .get()
    setSections(
      doc.exists
        ? doc.data().data
        : [
            {
              name: "",
              products: [{ name: "", price: "" }]
            }
          ]
    )
    doc.data().email && doc.data().email.length > 0
      ? setEmail(doc.data().email)
      : setEmail(firebase.auth().currentUser.email)
  }

  const DragHandle = sortableHandle(() => (
    <DragIndicator className={styles.dragHandle} />
  ))
  const SortableItem = sortableElement(({ value, sortIndex }) => {
    return (
      <form autoComplete='off' className={styles.form}>
        <DragHandle />
        <Section
          section={value}
          setSection={newSection => {
            setSections(() => {
              const newSections = [...sections]
              newSections[sortIndex] = newSection
              db.collection("forms")
                .doc(firebase.auth().currentUser.uid)
                .set({ data: newSections, email: email })
              return newSections
            })
          }}
        />
      </form>
    )
  })
  const SortableContainer = sortableContainer(({ children }) => {
    return <div>{children}</div>
  })

  function onSortEnd({ oldIndex, newIndex }) {
    setSections(arrayMove(sections, oldIndex, newIndex))
    console.log(sections)
  }

  return (
    <div>
      <a
        className={styles.preview}
        target='_blank'
        href={
          "https://form.bestellliste.com?id=" + firebase.auth().currentUser.uid
        }>
        Formular aufrufen
      </a>
      <SortableContainer onSortEnd={onSortEnd} useDragHandle>
        {sections.map((value, index) => (
          <SortableItem
            key={`section-${index}`}
            index={index}
            sortIndex={index}
            value={value}
          />
        ))}
      </SortableContainer>
      <Button
        className={styles.addSectionButton}
        color='primary'
        onClick={event => {
          const newSections = [...sections]
          newSections.push({ name: "", products: [] })
          db.collection("forms")
            .doc(firebase.auth().currentUser.uid)
            .set({ data: newSections, email: email })
          setSections(newSections)
        }}>
        <Add /> Produktgruppe hinzufügen
      </Button>
      <br></br>
      <TextField
        className={styles.emailField}
        label='Öffentliche E-Mail-Adresse für Bestellungen'
        value={email}
        onChange={event => {
          setEmail(event.target.value)
        }}
        onBlur={event => {
          db.collection("forms")
            .doc(firebase.auth().currentUser.uid)
            .set({ data: sections, email: event.target.value })
        }}
      />
    </div>
  )
}
