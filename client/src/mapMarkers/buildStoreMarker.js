import gql from 'graphql-tag'
import L from 'leaflet'

async function buildStoreMarker (props, userCords) {

  try{
    console.log('users cords', userCords)
    const stores = await props.client.query({
      query: GET_STORES,
      variables: {
        latitude: userCords.latitude.toString(),
        longitude: userCords.longitude.toString()
      }
    })
    console.log(stores)
    const StoreIcon = L.Icon.extend({
      options: {
        iconUrl: 'RedPin.png',
        iconSize: [20,38],
        iconAncher: [22, 94],
        popupAnchor:  [0, -20]
      }
    })
    
    //your location
    const storeLocation = new StoreIcon()
    stores.data.getStores.map(store => {
       return L.marker([store.latitude, store.longitude], {icon: storeLocation})
        .addTo(props.map.current)
        .bindTooltip(store.storeName, { className: 'myCSSClass', permanent: true})
    })
    
} catch (error) {
  console.log(error)
}

  // query stores based off 25 mile circle from user cords
  // send longitude, latitude 
  // get back array of stores
  // build markers based on stores returned 
}

export default buildStoreMarker

const GET_STORES = gql`
  query getStores($latitude: String!, $longitude: String!){
    getStores(latitude: $latitude, longitude: $longitude){
      storeName
      latitude
      longitude
    }
  }`