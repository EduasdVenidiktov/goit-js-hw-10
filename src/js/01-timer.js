'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const button = document.querySelector('button');
const input = document.querySelector('#datetime-picker');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');
const divTimer = document.querySelector('.timer');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

class Timer {
  constructor(tick) {
    this.intervalId = null;

    this.tick = tick;
  }

  start() {
    const startTime = userSelectedDate.getTime();
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;

      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        this.tick({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const time = convertMs(deltaTime);
      this.tick(time);
    }, 1000);
  }
}

function onTick(time) {
  spanDays.textContent = pad(time.days);
  spanHours.textContent = pad(time.hours);
  spanMinutes.textContent = pad(time.minutes);
  spanSeconds.textContent = pad(time.seconds);
}

const timer = new Timer(onTick);
let timerStarted = false;

button.addEventListener('click', () => {
  timer.start();
  timerStarted = true;
  button.disabled = true;
  input.disabled = true;
});

function pad(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: 'red',
        messageColor: 'white',
        position: 'topCenter',
        transitionIn: 'bounceInDown',
        timeout: 3000,
        zindex: 999,
        close: false,
        iconUrl: '../img/highlight_off_black_24dp.svg',
      });

      if (!timerStarted) {
        button.disabled = true;
      }
    } else {
      if (!timerStarted) {
        button.disabled = false;
        input.disabled = false;
      }
    }
  },
};

flatpickr(input, options);
