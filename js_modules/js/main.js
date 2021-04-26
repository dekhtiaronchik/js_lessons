import "../css/main.sass";
import {
    diffToHtml,
    dateToObject
} from "./datecalc.js";
import {
    formatError
} from "./utils.js";
import {
    timeToObject,
} from "./timer.js";


const dateCalcForm = document.getElementById("datecalc");
const dateCalcResult = document.getElementById("datecalc__result");
dateCalcForm.addEventListener("submit", handleCalcDates);

function handleCalcDates(event) {
    dateCalcResult.innerHTML = "";
    event.preventDefault();
    let {
        firstDate,
        secondDate
    } = event.target.elements;
    firstDate = firstDate.value, secondDate = secondDate.value;
    if (firstDate && secondDate) {
        const diff = dateToObject(firstDate, secondDate);
        dateCalcResult.innerHTML = diffToHtml(diff);
    } else dateCalcResult.innerHTML = formatError("Для расчета промежутка необходимо заполнить оба поля");
}

function timeHandler() {
    if (!timerInput.value) {
        error.innerHTML = formatError("Для работы таймера нужно ввести все значения");
    } else {
        const diff = timeToObject(timerInput.value, "00:00:01");
        diff.hours = diff.hours < 10 ? '0' + diff.hours : diff.hours;
        diff.minutes = diff.minutes < 10 ? '0' + diff.minutes : diff.minutes;
        diff.seconds = diff.seconds < 10 ? '0' + diff.seconds : diff.seconds;
        timerInput.value = `${diff.hours}:${diff.minutes}:${diff.seconds}`;
        if (timerInput.value === "00:00:00") {
            audioObj.play();
            clearInterval(idTimer);
        }
    }
}

const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");
const error = document.getElementById("error");
const timerInput = document.getElementById("input-time");
let audioObj = new Audio("./end.mp3");
let idTimer;

btnStart.addEventListener("click", (event) => {
    event.preventDefault();
    idTimer = setInterval(timeHandler, 1000);
});

btnStop.addEventListener("click", (event) => {
    clearInterval(idTimer);
    event.preventDefault;
})