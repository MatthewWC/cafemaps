import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import LocationSearchingIcon from '@material-ui/icons/LocationSearching'
import buildUserMarker from '../../mapMarkers/buildUserMarker'
import buildStoreMarker from '../../mapMarkers/buildStoreMarker'

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
  const classes = useStyles()
  const geoButton = React.createRef()

  async function handleClick(props){
    await buildUserMarker(props)
    
    //await buildStoreMarker(props)
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