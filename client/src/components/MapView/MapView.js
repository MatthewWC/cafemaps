import React from 'react'

import Map from './Map'
import SideBar from './SideBar/SideBar'
import UserButton from './UserButton'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  mapViewRoot: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  mapViewChildren: {
    zIndex: 1000,
    height: '100%',
    width: '500px'
  }
}))

function MapView () {
  // M-UI styles instance
  const classes = useStyles()

  return (
    <div className={classes.mapViewRoot}>
      <Map/>
      <SideBar/>
    </div>
  )
}

// render zoom comp
// render user coords?

export default MapView