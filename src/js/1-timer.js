// 1-timer.js

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Елементи
const datetimePicker = document.getElementById("datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let timerInterval = null;

// Налаштування flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      iziToast.error({
        title: "Помилка",
        message: "Please choose a date in the future",
        position: "topRight",
        timeout: 4000,
      });
      startBtn.disabled = true;
      userSelectedDate = null;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

// Ініціалізація календаря
flatpickr("#datetime-picker", options);

// Допоміжні функції
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function startTimer() {
  if (!userSelectedDate) return;

  startBtn.disabled = true;
  datetimePicker.disabled = true;

  timerInterval = setInterval(() => {
    const timeLeft = userSelectedDate - new Date();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      datetimePicker.disabled = false;
      startBtn.disabled = true;
      userSelectedDate = null;

      iziToast.success({
        title: "Done!",
        message: "Timer has finished",
        position: "topRight",
        timeout: 5000,
      });
      return;
    }

    updateTimer(convertMs(timeLeft));
  }, 1000);
}

// Обробник кнопки
startBtn.addEventListener("click", startTimer);

// Початковий стан
startBtn.disabled = true;