import React, { useEffect, useRef } from 'react'

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
    bottom: 0,
    overflow: 'hidden'
  }
}))

function Map ({ userCoords }) {
  // M-UI styles instance
  const classes = useStyles()
  //TODO: if user rendered, get stores. attach data to marker? requery? 
  const mapRef = useRef(null)
  // initialize map in componentDidMount equivalent function but for function comp
  useEffect(() => {
    // fix for map rerendering, might be temporary fix
    mapRef.current = L.map('map', {
      // map starting spot
      center: [49.8419, 24.0315],
      zoom: 25,
      zoomControl: false,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          detectRetina: true,
          maxZoom: 19,
        })
      ]
    }, [])  
  }, [])

  // add marker
  const markerRef = useRef(null);
  useEffect(() => {
    if(userCoords){
      if (markerRef.current) {
        markerRef.current.setLatLng(userCoords);
      } else {
        markerRef.current = L.marker(userCoords).addTo(mapRef.current);
      }
    }
  },
    [userCoords]
  )

  // return map container
  return (
    <div className={classes.map} id='map'/>
  )
}

export default Map