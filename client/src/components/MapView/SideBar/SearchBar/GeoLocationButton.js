import React from 'react'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import LocationSearchingIcon from '@material-ui/icons/LocationSearching'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  buttonRoot: {
    maxWidth: '50px',
    minWidth: '50px',
    minHeight: '50px',
    marginTop: '3px'
  }
}))

function GeoLocationButton (props){
  // M-UI styles instance 
  const classes = useStyles()
  // refs
  const geoButton = React.createRef()

  return (
    <Fab
      ref={geoButton}
      variant='extended'
      className={classes.buttonRoot}>
      <LocationSearchingIcon/>
    </Fab>
  )
}

export default GeoLocationButton