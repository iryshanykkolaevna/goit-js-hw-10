import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      userSelectedDate = selectedDates[0].getTime();
      startBtn.disabled = false;
    } else {
      iziToast.show({
        position: 'topCenter',
        iconColor: '#FAFAFB',
        icon: 'izi-close-icon',
        messageColor: '#FAFAFB',
        messageSize: '16px',
        backgroundColor: '#FC5A5A',
        close: false,
        closeOnClick: true,
        message: 'Please choose a date in the future!',
      });
      startBtn.disabled = true;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', event => {
  const timerID = setInterval(() => {
    startBtn.disabled = true;
    const timeDiff = userSelectedDate - Date.now();
    const timeObj = convertMs(timeDiff);
    if (timeDiff <= 0) {
      clearInterval(timerID);
    } else {
      dataDays.textContent = addLeadingZero(timeObj.days);
      dataHours.textContent = addLeadingZero(timeObj.hours);
      dataMinutes.textContent = addLeadingZero(timeObj.minutes);
      dataSeconds.textContent = addLeadingZero(timeObj.seconds);
    }
  }, 1000);
});

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

function addLeadingZero(value) {
  value = String(value);
  return value.length < 2 ? value.padStart(2, '0') : value;
}
