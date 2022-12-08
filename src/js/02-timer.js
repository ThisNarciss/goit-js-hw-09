import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
startBtn.setAttribute('disabled', 'true');

let futureDate = null;
let isActive = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      startBtn.setAttribute('disabled', 'true');
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }

    futureDate = selectedDates[0];
  },
};

flatpickr('input#datetime-picker', options);

startBtn.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  if (isActive) {
    return;
  }

  isActive = true;

  const timerId = setInterval(() => {
    if (Date.now() >= futureDate) {
      clearInterval(timerId);
      return;
    }
    const deltaTime = futureDate - Date.now();
    const timeConvert = convertMs(deltaTime);
    const { days, hours, minutes, seconds } = timeConvert;
    timerDays.textContent = days;
    timerHours.textContent = hours;
    timerMinutes.textContent = minutes;
    timerSeconds.textContent = seconds;
    console.log(`${days}::${hours}:${minutes}:${seconds}`);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
