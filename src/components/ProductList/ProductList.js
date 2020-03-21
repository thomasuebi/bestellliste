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
import Section from "../Section/Section"
import Button from "@material-ui/core/Button"
import firebase, { firestore } from "firebase"

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

  useEffect(async () => {
    const doc = await db
      .collection("forms")
      .doc(firebase.auth().currentUser.uid)
      .get()
    setSections(
      doc.exists
        ? doc.data().data
        : [
            {
              name: "Klopapier",
              products: [{ name: "Extra Soft", price: "3.90" }]
            },
            {
              name: "Pizzen",
              products: [
                { name: "Margharita", price: "6.90" },
                { name: "Palermo", price: "7.90" },
                { name: "Hawaii", price: "7.90" }
              ]
            }
          ]
    )
  }, [])

  const DragHandle = sortableHandle(() => <DragIndicator />)
  const SortableItem = sortableElement(({ value, sortIndex }) => {
    return (
      <form autoComplete='off'>
        <DragHandle />
        <Section
          section={value}
          setSection={newSection => {
            setSections(() => {
              const newSections = [...sections]
              newSections[sortIndex] = newSection
              db.collection("forms")
                .doc(firebase.auth().currentUser.uid)
                .set({ data: newSections })
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
        color='primary'
        onClick={event => {
          const newSections = [...sections]
          newSections.push({ name: "", products: [] })
          db.collection("forms")
            .doc(firebase.auth().currentUser.uid)
            .set({ data: newSections })
          setSections(newSections)
        }}>
        Produktgruppe hinzufügen
      </Button>
    </div>
  )
}
