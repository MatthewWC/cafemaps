import React, { useEffect } from 'react'

import L from 'leaflet'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  map: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  }
}))

function Map () {
  // M-UI styles instance
  const classes = useStyles()
  // refs
  const map = React.createRef()

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
    <div className={classes.map} id='map'/>
  )
}

export default Map