// Завдання 1 - перемикач кольорів​

// Виконуй це завдання у файлах 01-color-switcher.html і 01-color-switcher.js. Подивися демо-відео роботи перемикача.

// HTML містить кнопки «Start» і «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).
// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");
const bodyColor = document.querySelector("body");

let timerId = null;
btnStop.disabled = true;

btnStart.addEventListener("click", onStart);
btnStop.addEventListener("click", OnStop);

function onStart(e) {
    btnStart.disabled = true;
    btnStop.disabled = false;
    timerId = setInterval((ChangeColor), 1000);
    function ChangeColor() {
        bodyColor.style.backgroundColor = getRandomHexColor();
    }
}

function OnStop(e) {
    clearInterval(timerId);
    btnStart.disabled = false;
    btnStop.disabled = true;
}
