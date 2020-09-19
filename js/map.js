const BOTTOM_LEFT_COORDINATES = [1.162859, 103.574099];
const TOP_RIGHT_COORDINATES = [1.478801, 104.103136];
const bounds = L.bounds(BOTTOM_LEFT_COORDINATES,TOP_RIGHT_COORDINATES);
const center = bounds.getCenter();
const MAX_ZOOM = 18;
const map = L.map('map').setView([center.x, center.y], 12);

map.setMaxBounds([
  TOP_RIGHT_COORDINATES,
  BOTTOM_LEFT_COORDINATES,
]);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmVvY2hlZWtpb25nIiwiYSI6ImNrOW1wemluYzA5ZTYzbHBqbjU4MWs1dzQifQ.ziIGnkXPUoaOEvk9FrMgbQ', {
  maxZoom: MAX_ZOOM,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/outdoors-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);

// omnivore.kml(`regions/MP14_REGION_NO_SEA_PL.kml`).addTo(map);
