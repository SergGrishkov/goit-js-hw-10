import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const radioEl = document.querySelectorAll('input[type="radio"]');

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const delay = formEl.elements.delay.value;
  let radioValue;

  radioEl.forEach(r => {
    if (r.checked) {
      radioValue = r.value === 'fulfilled' ? true : false;
    }
  });

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (radioValue) {
        res(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        rej(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(e => {
      iziToast.success({
        position: 'topRight',
        message: e,
      });
      console.log(e);
    })
    .catch(e => {
      iziToast.error({
        position: 'topRight',
        message: e,
      });
      console.log(e);
    });

  formEl.reset();
});
