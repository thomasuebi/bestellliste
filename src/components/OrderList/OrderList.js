import React, { useState, useEffect, Fragment } from "react"
import styles from "./OrderList.module.css"
import firebase, { firestore } from "firebase"
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core"

const db = firebase.firestore()

export default function (props) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    gatherOrderData()
  }, [])

  async function gatherOrderData() {
    const ordersRef = db.collection("orders")
    const ordersData = await ordersRef
      .where("formId", "==", firebase.auth().currentUser.uid)
      .get()
    let newOrders = []
    ordersData.forEach((orderData) => newOrders.push(orderData.data()))
    ordersData.forEach((orderData) => console.log(orderData))
    newOrders = newOrders
      .sort((a, b) => {
        return a.created || 0 - b.created || 0
      })
      .reverse()
    console.log(newOrders)
    setOrders(newOrders)
  }

  return (
    <div>
      {orders.map((order) => (
        <Card className={styles.card}>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Produkte</b>
                  </TableCell>
                  <TableCell>
                    {order.data.map((product) => {
                      return (
                        <Fragment>
                          {product.stückzahl +
                            "x " +
                            product.name +
                            " (" +
                            product.gesamtpreis +
                            " €)"}
                          <br></br>
                        </Fragment>
                      )
                    })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Gesamtpreis</b>
                  </TableCell>
                  <TableCell>{order.kontakdaten.gesamtpreis} €</TableCell>
                </TableRow>
                {order.kontakdaten.wunsch ? (
                  <TableRow>
                    <TableCell>
                      <b>Wunsch</b>
                    </TableCell>
                    <TableCell>{order.kontakdaten.wunsch}</TableCell>
                  </TableRow>
                ) : null}
                <TableRow>
                  <TableCell>
                    <b>Name</b>
                  </TableCell>
                  <TableCell>
                    {order.kontakdaten.vorname +
                      " " +
                      order.kontakdaten.nachname}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Adresse</b>
                  </TableCell>
                  <TableCell>
                    {order.kontakdaten.straße}
                    <br></br>
                    {order.kontakdaten.postleitzahl +
                      "" +
                      order.kontakdaten.stadt}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Kontaktdaten</b>
                  </TableCell>
                  <TableCell>
                    {order.kontakdaten.email}
                    <br></br>
                    {order.kontakdaten.telefonnummer}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Gewünschte Lieferzeit</b>
                  </TableCell>
                  <TableCell>
                    {order.kontakdaten.wunschtermin}
                    <br></br>
                    {order.kontakdaten.lieferzeit}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Zustellung</b>
                  </TableCell>
                  <TableCell>
                    {order.kontakdaten.zustellung}
                    <br></br>
                    {order.kontakdaten.zahlung}
                    <br></br>
                    {order.kontakdaten.anmerkung}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
