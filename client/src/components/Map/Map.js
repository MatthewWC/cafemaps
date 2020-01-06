// https://www.youtube.com/watch?v=PMtXhxW6t2k <== helpful video

import React, { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
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

  // coffee shop icon
  const LeafIcon = L.Icon.extend({
    options: {
        iconUrl: 'CoffeeCup.png',
        iconSize:     [38, 38],
        iconAnchor:   [0, 0],
        popupAnchor:  [15, 0]
    }
  });
  const iconOne = new LeafIcon()

  //your location
  const userIcon = L.Icon.extend({
    options: {
      iconUrl: 'home.png',
      iconSize: [38,38],
      iconAncher: [22, 94],
      popupAnchor:  [0, -20]
    }
  })
  const userLocation = new userIcon()
  
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
    L.marker([34.357719, -84.040246], {icon: userLocation}).addTo(map).bindPopup('You are here.')
    L.marker([34.349482, -84.049601], {icon: iconOne}).addTo(map).bindPopup("Starbucks");
    L.marker([51.495, -0.083], {icon: iconOne}).addTo(map).bindPopup("I am a coffee.");
    L.marker([51.49, -0.1], {icon: iconOne}).addTo(map).bindPopup("I am a coffee.");

  })

  // return map container
  return (
    <div className={classes.root}>
      <div className={classes.map} id='map'/>
    </div>
  )
  
}

export default Map
