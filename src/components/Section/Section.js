import React, { useState } from "react"
import styles from "./Section.module.css"
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc"
import arrayMove from "array-move"
import { DragIndicator } from "@material-ui/icons"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

export default function(props) {
  const { section, setSection, sectionIndex } = props
  return (
    <Card variant='outlined' className={styles.section}>
      <CardContent>
        <input
          key={"sectionInput" + sectionIndex}
          defaultValue={section.name}
          onBlur={event => setSection({ ...section, name: event.target.value })}
          className={styles.inputSectionName}
          type='text'
          placeholder='Unbenannte Produktgruppe'
        />
        {section.products.map((product, index) => {
          return (
            <div className={styles.inputProduct}>
              <input
                key={"section" + sectionIndex + "productname" + index}
                onBlur={event => {
                  const newProducts = [...section.products]
                  newProducts[index] = {
                    name: event.target.value,
                    price: section.products[index].price
                  }
                  setSection({ ...section, products: newProducts })
                }}
                className={styles.inputProductName}
                defaultValue={product.name}
                type='text'
                placeholder='Unbenanntes Produkt'
              />
              <input
                key={"section" + sectionIndex + "productprice" + index}
                onBlur={event => {
                  const newProducts = [...section.products]
                  newProducts[index] = {
                    name: section.products[index].name,
                    price: event.target.value
                  }
                  setSection({ ...section, products: newProducts })
                }}
                className={styles.inputProductPrice}
                defaultValue={product.price}
                type='number'
                placeholder='0.00'
              />
            </div>
          )
        })}

        <Button
          color='primary'
          onClick={event => {
            const newProducts = [...section.products]
            newProducts.push({ name: "", price: "" })
            setSection({ ...section, products: newProducts })
          }}>
          Produkt hinzufügen
        </Button>
      </CardContent>
    </Card>
  )
}
