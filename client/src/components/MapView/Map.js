import React, { useEffect, useRef } from 'react'
import gql from 'graphql-tag'
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

function Map ({ client, userCoords, onStoreMarkerClicked }) {
  
  // M-UI styles instance
  const classes = useStyles()
  //TODO: if user rendered, get stores. attach data to marker? requery? 
  const mapRef = useRef(null)
  const userMarkerRef = useRef(null)
  // initialize map in componentDidMount equivalent function but for function comp
  useEffect(() => {
    // get user ip
    async function ipLookUp () {
      const response = await fetch('http://ip-api.com/json')
      return await response.json()
    }

    ipLookUp().then((data) => {
      // fix for map rerendering, might be temporary fix
      mapRef.current = L.map('map', {
        // map starting spot
        center: [data.lat, data.lon],
        zoom: 12,
        zoomControl: false,
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 19,
          })
        ]
      }, [])  
    })
  }, [])

  // add user marker
  useEffect(() => {
    // if user allows geolocation
    if(userCoords){
      // move map center to user
      mapRef.current.flyTo(userCoords, 14.5)
      if (userMarkerRef.current) {
        // if user marker does exist, set new lat/lng
        userMarkerRef.current.setLatLng(userCoords);
      } else {
        // if user marker doesnt exist, build it
        userMarkerRef.current = L.marker(userCoords).addTo(mapRef.current)
      }
    }
  }, [userCoords])

  // add store markers
  useEffect(() => {
    if(userCoords){
      // get stores function
      async function getStores(client){
        return await client.query({
          query: GET_STORES,
          variables: {
            latitude: userCoords.lat.toString(),
            longitude: userCoords.lng.toString()
          }
        })
      }
      // get stores
      //TODO: if stores are out of new user range, remove the markers.
      getStores(client).then(stores => {
        
        // map stores
        //TODO: show/hide storeinfo, maybe center map on marker
        stores.data.getStores.map(store => {
          // build markers
          return L.marker([store.latitude, store.longitude])
            .addTo(mapRef.current)
            .bindTooltip(store.storeName, { className: 'myCSSClass', permanent: true})
            .on('click', () => {
              mapRef.current.flyTo([store.latitude, store.longitude])
              onStoreMarkerClicked(store)
            })
        })
      })
    }
  }, [userCoords, client, onStoreMarkerClicked])

  // return map container
  return (
    <div className={classes.map} id='map'/>
  )
}

export default Map

// query for stores
const GET_STORES = gql`
  query getStores($latitude: String!, $longitude: String!){
    getStores(latitude: $latitude, longitude: $longitude){
      latitude
      longitude
      storeName
      imageUrl
      addressOne
      addressTwo
      city
      state
      zipcode
      moHours
      tuHours
      weHours
      thHours
      frHours
      saHours
      suHours
      wifi
      bakery
      milkAlt
      indoorSeating
      driveThru
      roastery
    }
  }`