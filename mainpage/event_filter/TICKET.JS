"use strict";

document.querySelector(".dropdown-menu").addEventListener("click", (e) => {
  document.querySelector(".btn").textContent = e.target.textContent;
});
