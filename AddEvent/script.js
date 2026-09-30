"use strict";

// Map: pick the event location by clicking or searching
const map = L.map("map").setView([36.806389, 10.181667], 10);

L.tileLayer(
    "https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}",
    {
        attribution: "TICKETHIVE",
        minZoom: 0,
        maxZoom: 22,
        subdomains: "abcd",
        accessToken:
            "E77dSVd7j4hyNUxF9j4ox2GtJkWcM2dqEdDK5eNF1SrBFxf9WOiGwBKExUFYO97R"
    }
).addTo(map);

const PICKED_MESSAGE =
    "Your event will be here , take these coordinates for further personal use : ";

let singleMarker = L.marker([36.806389, 10.181667], { draggable: true });
singleMarker
    .bindPopup(
        "Where do you want your event ? search in the map then click to validate your position " +
            singleMarker.getLatLng()
    )
    .openPopup()
    .addTo(map);

const placeMarker = (latlng) => {
    map.removeLayer(singleMarker);
    singleMarker = L.marker(latlng, { draggable: true });
    singleMarker
        .bindPopup(PICKED_MESSAGE + singleMarker.getLatLng())
        .addTo(map)
        .openPopup();

    document.querySelector("#latitude").value = latlng.lat;
    document.querySelector("#longitude").value = latlng.lng;
};

map.on("mousemove", (e) => {
    document.querySelector(".coordinate").innerHTML =
        "lat :" + e.latlng.lat + "  lng :" + e.latlng.lng;
});

map.on("click", (e) => placeMarker(e.latlng));

L.Control.geocoder({ defaultMarkGeocode: false })
    .on("markgeocode", (e) => {
        placeMarker(e.geocode.center);
        map.fitBounds(e.geocode.bbox);
    })
    .addTo(map);
