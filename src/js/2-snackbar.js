import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = form.elements.delay.value;
  const state = form.elements.state.value;
  makePromise({ value: delay, delay: delay, state: state })
    .then(value =>
      showMessage('izi-check', '#82C43C', `Fulfilled promise in ${delay}ms`)
    )
    .catch(error =>
      showMessage('izi-close-icon', '#FC5A5A', `Rejected promise in ${delay}ms`)
    );
});

const makePromise = ({ value, delay, state }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(value);
      } else {
        reject(value);
      }
    }, delay);
  });
};

const showMessage = (icon, color, msg) => {
  iziToast.show({
    position: 'topCenter',
    iconColor: '#FAFAFB',
    icon: icon,
    messageColor: '#FAFAFB',
    messageSize: '16px',
    backgroundColor: color,
    close: false,
    closeOnClick: true,
    message: msg,
  });
};