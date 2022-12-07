import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onBtnFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onBtnFormSubmit(event) {
  event.preventDefault();

  let delayFirst = Number(event.currentTarget.elements.delay.value);
  const delayStep = Number(event.currentTarget.elements.step.value);
  const amount = Number(event.currentTarget.elements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayFirst)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delayFirst += delayStep;
  }
}
