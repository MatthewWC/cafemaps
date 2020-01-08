import L from 'leaflet'

function populateUsers (map) {
  const UserIcon = L.Icon.extend({
    options: {
      iconUrl: 'home.png',
      iconSize: [38,38],
      iconAncher: [22, 94],
      popupAnchor:  [0, -20]
    }
  })

  //your location
  const userLocation = new UserIcon()

  L.marker([34.357638, -84.040233], {icon: userLocation}).addTo(map).bindPopup("You are here.")
}
export default populateUsers