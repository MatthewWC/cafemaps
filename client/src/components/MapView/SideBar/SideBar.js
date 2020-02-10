import React from 'react'

import SearchBar from './SearchBar'
import StoreInfo from './StoreInfo'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// ---- M-UI imports ----

// M-UI styles 
const useStyles = makeStyles(theme => ({
  sideBar: {
    width: '500px',
    maxHeight: '80%',
    zIndex: 999,
    margin: 5,
    padding: 5
  }
}))

// adjust maxHeight ^ for storinfo fitting page

function SideBar (props) {
  // M-UI styles instance
  const classes = useStyles()

  return (
    <Grid container className={classes.sideBar}>
      <SearchBar geolocationFunction={props.geolocationFunction}/>
      <StoreInfo/>
    </Grid>
  )
}

export default SideBar