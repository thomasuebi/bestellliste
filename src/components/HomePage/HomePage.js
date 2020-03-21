import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import styles from "./HomePage.module.css"
import TextField from "@material-ui/core/Textfield"
import { FirebaseAuthConsumer } from "@react-firebase/auth"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import firebase from "firebase/app"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Box from "@material-ui/core/Box"
import ProductList from "../ProductList/ProductList"

export default function(props) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={styles.root}>
      <AppBar position='static'>
        <Toolbar className={styles.AppBar}>
          <Typography variant='h6'>Bestellliste.com</Typography>

          <PopupState variant='popover' popupId='demo-popup-menu'>
            {popupState => (
              <React.Fragment>
                <IconButton {...bindTrigger(popupState)}>
                  <FirebaseAuthConsumer>
                    {({ isSignedIn, user, providerId }) => {
                      return user.providerData.map(function(profile) {
                        return (
                          <Avatar
                            key='avatar'
                            alt={profile.displayName}
                            src={profile.photoURL}
                          />
                        )
                      })
                    }}
                  </FirebaseAuthConsumer>
                </IconButton>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={() => {
                      firebase.auth().signOut()
                    }}>
                    Ausloggen
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </Toolbar>
      </AppBar>
      <Container>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'>
          <Tab label='Produktliste' {...a11yProps(0)} />
          <Tab label='Bestellungen' {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ProductList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Bestellungen
        </TabPanel>
      </Container>
    </div>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  }
}
