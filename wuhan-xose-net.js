let uri = window.location.toString();
if (uri.indexOf("?") > 0) {
    let clean_uri = uri.substring(0, uri.indexOf("?"));
    window.history.replaceState({}, document.title, clean_uri)
}
let data;
$.get("https://sgwuhan.xose.net/api/?" + Date.now(), function (d) {
    data = JSON.parse(d)["data"];
    initMap()
});
let center = L.bounds([1.56073, 104.11475], [1.16, 103.502]).getCenter();
let map = L.map('mapdiv').setView([center.x, center.y], 12);
map.setMaxBounds([
    [1.56073, 104.1147],
    [1.16, 103.502]
]);
let isLight = null;
if (localStorage.getItem('theme') == 'dark') {
    isLight = true
}
setTheme();
let basemap;

function setTheme() {
    if (!isLight || isLight == null) {
        basemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
            minZoom: 11
        });
        localStorage.setItem('theme', 'light');
        isLight = true
    } else {
        basemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
            minZoom: 11
        });
        localStorage.setItem('theme', 'dark');
        isLight = false
    }
    $("#toggleTheme").prop("checked", isLight);
    basemap.addTo(map)
}
$(document).on("change", "#toggleTheme", function () {
    setTheme()
});

function initMap() {
    let newCase = L.divIcon({
        html: '<div class="centraldot"></div>',
        iconSize: [20, 20]
    });
    let updCase = L.divIcon({
        html: '<div class="centraldot2"></div>',
        iconSize: [20, 20]
    });
    let oldCase = L.icon.pulse({
        iconSize: [20, 20],
        color: 'orange',
        fillColor: 'orange',
        animate: false
    });
    let etcCase = L.icon.pulse({
        iconSize: [20, 20],
        color: 'white',
        fillColor: 'white',
        animate: false
    });
    for (let i = 0; i < data.length; i++) {
        if (data[i]["caseType"] == "newCase") {
            L.marker([data[i]["lat"], data[i]["lng"]], {
                icon: newCase,
                idx: i,
                ridx: data[i]["relatedArrayNo"],
                zIndexOffset: 999
            }).bindPopup("<b>Case:</b> " + data[i]["caseNo"] + " (Confirmed on: " + data[i]["confirmDate"] + ")<br><b>Age:</b> " + data[i]["age"] + "<br><b>Gender:</b> " + data[i]["gender"] + "<br><b>From:</b> " + data[i]["from"] + "<br><b>Citizenship:</b> " + data[i]["citizenship"] + "<br><b>Stayed:</b> " + data[i]["stayed"] + "<br><b>Visited:</b> " + data[i]["visited"] + "<br><b>Source: <a href='https://www.moh.gov.sg/news-highlights/details/" + data[i]["mohURL"] + "' target='_blank'>Ministry Of Health</a></b>").addTo(map).on('click', function (e) {
                toggleHideMarkers(e.target.options.idx, e.target.options.ridx)
            })
        } else if (data[i]["caseType"] == "updCase") {
            L.marker([data[i]["lat"], data[i]["lng"]], {
                icon: updCase,
                idx: i,
                ridx: data[i]["relatedArrayNo"],
                zIndexOffset: 777
            }).bindPopup("<b>Case:</b> " + data[i]["caseNo"] + " (Confirmed on: " + data[i]["confirmDate"] + ")<br><b>Age:</b> " + data[i]["age"] + "<br><b>Gender:</b> " + data[i]["gender"] + "<br><b>From:</b> " + data[i]["from"] + "<br><b>Citizenship:</b> " + data[i]["citizenship"] + "<br><b>Stayed:</b> " + data[i]["stayed"] + "<br><b>Visited:</b> " + data[i]["visited"] + "<br><b>Source: <a href='https://www.moh.gov.sg/news-highlights/details/" + data[i]["mohURL"] + "' target='_blank'>Ministry Of Health</a></b>").addTo(map).on('click', function (e) {
                toggleHideMarkers(e.target.options.idx, e.target.options.ridx)
            })
        } else if (data[i]["caseType"] == "oldCase") {
            L.marker([data[i]["lat"], data[i]["lng"]], {
                icon: oldCase,
                idx: i,
                ridx: data[i]["relatedArrayNo"],
                zIndexOffset: 555
            }).bindPopup("<b>Case:</b> " + data[i]["caseNo"] + " (Confirmed on: " + data[i]["confirmDate"] + ")<br><b>Age:</b> " + data[i]["age"] + "<br><b>Gender:</b> " + data[i]["gender"] + "<br><b>From:</b> " + data[i]["from"] + "<br><b>Citizenship:</b> " + data[i]["citizenship"] + "<br><b>Stayed:</b> " + data[i]["stayed"] + "<br><b>Visited:</b> " + data[i]["visited"] + "<br><b>Source: <a href='https://www.moh.gov.sg/news-highlights/details/" + data[i]["mohURL"] + "' target='_blank'>Ministry Of Health</a></b>").addTo(map).on('click', function (e) {
                toggleHideMarkers(e.target.options.idx, e.target.options.ridx)
            })
        } else {
            if (data[i]["mohURL"] == "") {
                L.marker([data[i]["lat"], data[i]["lng"]], {
                    icon: etcCase,
                    idx: i,
                    ridx: data[i]["relatedArrayNo"]
                }).bindPopup("<b>Related To Case:</b> " + data[i]["relatedCaseNo"] + "<br><b>Location:</b> " + data[i]["location"]).addTo(map).on('click', function (e) {
                    toggleHideMarkers(e.target.options.idx, e.target.options.ridx)
                })
            } else {
                L.marker([data[i]["lat"], data[i]["lng"]], {
                    icon: etcCase,
                    idx: i,
                    ridx: data[i]["relatedArrayNo"]
                }).bindPopup("<b>Related To Case:</b> " + data[i]["relatedCaseNo"] + "<br><b>Location:</b> " + data[i]["location"] + "<br><b>Source: <a href='https://www.moh.gov.sg/news-highlights/details/" + data[i]["mohURL"] + "' target='_blank'>Ministry Of Health</a></b>").addTo(map).on('click', function (e) {
                    toggleHideMarkers(e.target.options.idx, e.target.options.ridx)
                })
            }
        }
    }
}
map.on('popupclose', function (e) {
    toggleHideMarkers("", "");
    for (let i = 0; i < theLines.length; i++) {
        theLines[i].remove()
    }
    theLines = []
});
let theLines = [];

function toggleHideMarkers(markerIdx, relatedIdx) {
    if (markerIdx == "") {
        $(".leaflet-marker-pane > div").css("opacity", "1")
    } else {
        $(".leaflet-marker-pane > div").eq(markerIdx).siblings().css("opacity", "0.1")
    }
    if (relatedIdx != "") {
        let rIdx = relatedIdx.split(",");
        for (let i = 0; i < rIdx.length; i++) {
            $(".leaflet-marker-pane > div").eq(parseInt(rIdx[i])).css("opacity", "1");
            try {
                theLines.push(new LeaderLine($(".leaflet-marker-pane > div").eq(markerIdx)[0], $(".leaflet-marker-pane > div").eq(parseInt(rIdx[i]))[0], {
                    dash: false,
                    color: 'white',
                    startSocket: 'auto',
                    path: 'magnet',
                    size: 2,
                    endPlug: 'behind',
                    startPlugColor: '#0291cc',
                    endPlugColor: '#81c8e6',
                    gradient: true
                }))
            } catch (ex) {}
        }
    }
}
map.on('zoomend', function (e) {
    mapEvents()
});
map.on('move', function (e) {
    mapEvents()
});

function mapEvents() {
    if (theLines.length > 0) {
        for (let i = 0; i < theLines.length; i++) {
            theLines[i].position()
        }
    }
}
$(document).on("click", "#okBtn", function () {
    $("#modalContainer").hide()
}); 
