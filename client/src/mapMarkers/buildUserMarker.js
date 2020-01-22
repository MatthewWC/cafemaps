import L from 'leaflet'

import buildStoreMarker from './buildStoreMarker'

async function buildUserMarker (props) {
  let user
  
  // if geolocate fails
  function onGeolocateError(error){
    // create pop up to inform user we dont have permission to use their location 
  }
 
  function onGeolocateSuccess(coordinates) {
    // user coordinates from successful return 
    const { latitude, longitude } = coordinates.coords
    // build user marker on map
    user = L.marker([latitude, longitude], {icon: userLocation}).addTo(props.map.current).bindPopup("You are here.")
    // pass user coords to store marker to populate
    buildStoreMarker(props, { latitude, longitude })
  }
  // geolocate call
  navigator.geolocation.getCurrentPosition(
    onGeolocateSuccess,
    onGeolocateError
  )
  // build user icon style & anchor position
  const UserIcon = L.Icon.extend({
    options: {
      iconUrl: 'home.png',
      iconSize: [38,38],
      iconAncher: [22, 94],
      popupAnchor:  [0, -20]
    }
  }) 
  // new instance of icon 
  const userLocation = new UserIcon()
}

export default buildUserMarker
