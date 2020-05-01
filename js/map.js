const bottomLeft = [1.162859, 103.574099];
const topRight = [1.478801, 104.103136];
const bounds = L.bounds(bottomLeft,topRight)
const center = bounds.getCenter();

const map = L.map('map').setView([center.x, center.y], 12);

map.setMaxBounds([
    topRight,
    bottomLeft,
]);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmVvY2hlZWtpb25nIiwiYSI6ImNrOW1wemluYzA5ZTYzbHBqbjU4MWs1dzQifQ.ziIGnkXPUoaOEvk9FrMgbQ', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

omnivore.kml(`regions/MP14_REGION_NO_SEA_PL.kml`).addTo(map);
