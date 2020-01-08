// https://www.youtube.com/watch?v=PMtXhxW6t2k <== helpful video

import React, { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import populateStores from './Markers/populateStores'
import populateUsers from './Markers/populateUsers'
// ---- material-ui imports ----
import { makeStyles } from '@material-ui/core/styles'
// -----------------------------

// material-ui styles
const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden'

  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
}))

function Map () {
  // styles instance
  const classes = useStyles()

  // initialize map in componentDidMount equivalent function but for function comp
  useEffect(() => {
    const map = L.map('map', {
      // map starting spot
      center: [34.357719, -84.040246],
      zoom: 25,
      zoomControl: false
    }, [])

    // map tile design
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      detectRetina: true,
      maxZoom: 19,
    }).addTo(map)

    // markers
    populateStores(map)
    populateUsers(map)
    
  })

  // return map container
  return (
    <div className={classes.root}>
      <div className={classes.map} id='map'/>
    </div>
  )
  
}

export default Map
