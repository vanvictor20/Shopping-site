"use strict";

const openCartBtn = document.getElementById("open-cart-btn");
const closeBtn = document.getElementById("close-btn");
const modal = document.querySelector(".modal-container");
const overlay = document.querySelector(".overlay");

const openModal = (e) => {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

openCartBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

// Cart: remove items, change quantities, keep the total in sync
const parsePrice = (text) => parseFloat(text.replace(/[^\d.]/g, "")) || 0;

const updateTotal = () => {
  let total = 0;
  document.querySelectorAll(".cart-box").forEach((box) => {
    const price = parsePrice(box.querySelector(".cart-price").textContent);
    const quantity = Number(box.querySelector(".cart-quantity").value);
    total += price * quantity;
  });
  document.querySelector(".total-price").textContent = `$${total.toFixed(2)}`;
};

document.querySelectorAll(".cart-remove").forEach((button) =>
  button.addEventListener("click", (e) => {
    e.target.closest(".cart-box").remove();
    updateTotal();
  })
);

document.querySelectorAll(".cart-quantity").forEach((input) =>
  input.addEventListener("change", (e) => {
    const value = Number(e.target.value);
    if (!Number.isFinite(value) || value <= 0) e.target.value = 1;
    updateTotal();
  })
);

updateTotal();
