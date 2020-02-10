import React from 'react'

import Map from './Map'
import SideBar from './SideBar/SideBar'
//TODO: import user button

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  mapViewRoot: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
}))

function MapView () {
  // M-UI styles instance
  const classes = useStyles()
  // init user cords
  const [ userCoords, setUserCoords ] = React.useState(null)

  function handleGeolocate (){
    // if geolocate fails
    function onGeolocateError(error){
      // create pop up to inform user we dont have permission to use their location 
      //TODO: figure out why error only hits so often. is this endpoint timeout?
    }
 
    function onGeolocateSuccess(coordinates) {
      // user coordinates from successful return 
      setUserCoords({lat: coordinates.coords.latitude, lng: coordinates.coords.longitude})
      // chang state, pass cords to map component
      
    }

    // geolocate call
    navigator.geolocation.getCurrentPosition(onGeolocateSuccess, onGeolocateError)
  }

  return (
    <div className={classes.mapViewRoot}>
      <Map userCoords={userCoords}/>
      <SideBar geolocationFunction={handleGeolocate}/>
    </div>
  )
}

// render zoom comp
// render user coords?

export default MapView