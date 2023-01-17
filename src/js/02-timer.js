// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(3600000)); // {days: 0, hours: 1, minutes: 0, seconds: 0}

const refs = {
  datetimePicker: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("button[data-start]"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};
console.log(refs);

let timerId = null;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (refs.datetimePicker.value <= new Date()) {
      refs.btnStart.disabled = true;
      Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      refs.startBtn.disabled = false;
    }

    console.log(selectedDates[0]);
  },
};

flatpickr(refs.datetimePicker, options);
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

refs.startBtn.addEventListener("click", () => {
  refs.startBtn.disabled = true;
  timerId = setInterval(() => {
    let dataTimer = new Date(refs.datetimePicker.value) - new Date();
    if (dataTimer >= 0) {
      let time = convertMs(dataTimer);
      refs.days.textContent = addLeadingZero(time.days);
      refs.hours.textContent = addLeadingZero(time.hours);
      refs.minutes.textContent = addLeadingZero(time.minutes);
      refs.seconds.textContent = addLeadingZero(time.seconds);
    } else {
      Notiflix.Notify.success("Finish!");
      clearInterval(timerId);
    }
  }, 1000);
});
