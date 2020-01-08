import L from 'leaflet'

async function populateStores (map){

  const LeafIcon = L.Icon.extend({
    options: {
        iconUrl: 'CoffeeCup.png',
        iconSize:     [38, 38],
        iconAnchor:   [0, 0],
        popupAnchor:  [15, 0]
    }
  });

  // coffee shop icon
  const iconOne = new LeafIcon()

  // add markers
  L.marker([34.349482, -84.049601], {icon: iconOne}).addTo(map).bindPopup("Starbucks")
}

export default populateStores
