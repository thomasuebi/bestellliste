import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import styles from "./HomePage.module.css"
import { FirebaseAuthConsumer } from "@react-firebase/auth"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import firebase from "firebase/app"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Box from "@material-ui/core/Box"
import ProductList from "../ProductList/ProductList"
import logo from "./logo.png"
import { withStyles } from "@material-ui/core/styles"
import OrderList from "../OrderList/OrderList"

export default function(props) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const StyledTabs = withStyles({
    indicator: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
      "& > div": {
        maxWidth: 70,
        width: "100%",
        backgroundColor: "#2C934E"
      }
    }
  })(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />)

  return (
    <div className={styles.root}>
      <AppBar position='fixed'>
        <Toolbar className={styles.AppBar}>
          <Typography variant='h6'>
            <a href={"https://bestellliste.com"}>
              <img src={logo} className={styles.logo} />
            </a>
          </Typography>

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
      <Container className={styles.rootContainer}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'>
          <Tab label='Produktliste' {...a11yProps(0)} />
          <Tab label='Bestellungen' {...a11yProps(1)} />
          <Tab label='Einbinden/Link' {...a11yProps(2)} />
        </StyledTabs>
        <TabPanel value={value} index={0}>
          <ProductList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OrderList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
              return (
                <div>
                  <h2>Link</h2>
                  <pre>https://form.bestellliste.com?id={user.uid}</pre>
                  <h2>Iframe</h2>
                  <pre>
                    {"<iframe src=' https://form.bestellliste.com?id=" +
                      user.uid +
                      "></iframe>"}
                  </pre>
                </div>
              )
            }}
          </FirebaseAuthConsumer>
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
