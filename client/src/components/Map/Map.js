// https://www.youtube.com/watch?v=PMtXhxW6t2k <== helpful video

import React, { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import GeoLocationButton from './GeoLocationButton'
// ---- material-ui imports ----
import { makeStyles } from '@material-ui/core/styles'

// -----------------------------

// material-ui styles
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  mapContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    position: 'relative',
    overflow: 'hidden'
  },
  map: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  }
}))

function Map (props) {
  const map = React.createRef()
  // styles instance
  const classes = useStyles()

  // initialize map in componentDidMount equivalent function but for function comp
  useEffect(() => {

    map.current = new L.map('map', {
      // map starting spot
      center: [34.3577190, -84.04024600],
      zoom: 25,
      zoomControl: false
    }, [])

    // map tile design
    new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      detectRetina: true,
      maxZoom: 19,
    }).addTo(map.current)
  })

  // return map container
  return (
    <div className={classes.root}>
      <div className={classes.mapContainer}>
        <GeoLocationButton client={props.client} map={map}/>
        <div 
          className={classes.map} id='map'/>
      </div>
    </div>
  )
}

export default Map
