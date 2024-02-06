'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function createPromise(event) {
  event.preventDefault();

  const delay = form.delay.value;
  const state = form.state.value;

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else if (state === 'rejected') {
      setTimeout(() => reject(delay), delay);
    }
  });

  promise
    .then(delay => {
      iziToast.success({
        position: 'topCenter',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        position: 'topCenter',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}

form.addEventListener('submit', createPromise);
