
import Notiflix from "notiflix";

const form = document.querySelector(".form");

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let delay = Number(form.elements.delay.value);
  let step = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value);
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          { useIcon: false }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          { useIcon: false }
        );
      });
  }
});
