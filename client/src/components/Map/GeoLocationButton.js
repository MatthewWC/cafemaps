import React from 'react'

// ---- material-ui imports ----
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import LocationSearchingIcon from '@material-ui/icons/LocationSearching'
// -----------------------------

import buildUserMarker from '../../mapMarkers/buildUserMarker'

// material-ui styles
const useStyles = makeStyles(theme => ({
  root: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  button: {
    position: 'relative',
    zIndex: 1000,
    maxWidth: '300px',
    minWidth: '300px'
  },
  icon: {
    margin: '5px'
  }
}))

function GeoLocationButton (props){
  // material-ui styles instance
  const classes = useStyles()
  // refs
  const geoButton = React.createRef()

  // handle geobutton click
  async function handleClick(props){
    await buildUserMarker(props)
  }

  return (
   <div className={classes.root}>
    <Fab
      onClick={() => {
        handleClick(props)
      }}
      ref={geoButton}
      variant='extended'
      className={classes.button}>
      <LocationSearchingIcon className={classes.icon}/>
      Search Using My Location
    </Fab>
   </div>
  )
}

export default GeoLocationButton