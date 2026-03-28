// 2-snackbar.js

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
event.preventDefault();

const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;   // "fulfilled" або "rejected"

  // Створення промісу
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
    if (state === "fulfilled") {
        resolve(delay);
} else {
        reject(delay);
}
    }, delay);
});

  // Обробка результату промісу
promise
    .then((delayValue) => {
    iziToast.success({
        title: "✅ Fulfilled",
        message: `Fulfilled promise in ${delayValue}ms`,
        position: "topRight",
        timeout: 5000,
    });
    })
    .catch((delayValue) => {
    iziToast.error({
        title: "❌ Rejected",
        message: `Rejected promise in ${delayValue}ms`,
        position: "topRight",
        timeout: 5000,
    });
    });

  // Очищення форми після створення
form.reset();
});