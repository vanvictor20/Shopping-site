"use strict";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", () => {
  section1.scrollIntoView({ behavior: "smooth" });
});

// Map: centre on the event's coordinates, read from the page
const readCoordinate = (selector) =>
  Number(
    document
      .querySelector(selector)
      .textContent.split(":")[1]
      .trim()
      .substring(0, 10)
  );

const latitude = readCoordinate(".line3");
const longitude = readCoordinate(".line4");

const map = L.map("map").setView([latitude, longitude], 20);

L.tileLayer(
  "https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}",
  {
    attribution: "TICKETHIVE",
    minZoom: 0,
    maxZoom: 22,
    subdomains: "abcd",
    accessToken:
      "E77dSVd7j4hyNUxF9j4ox2GtJkWcM2dqEdDK5eNF1SrBFxf9WOiGwBKExUFYO97R",
  }
).addTo(map);

const eventName = document
  .querySelector(".home-content h1")
  .textContent.trim()
  .split("\n")
  .map((part) => part.trim())
  .join(" ");

const eventLocation = document.querySelector(".localisation h3").textContent;

const marker = L.marker([latitude, longitude], { draggable: true });
marker
  .bindPopup(`<h4> ${eventName}  ::  ${eventLocation} \n ${marker.getLatLng()}</h4>`)
  .openPopup()
  .addTo(map);
