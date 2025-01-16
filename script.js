let timer;
let isRunning = false;
let elapsedTime = 0; // Time in milliseconds
let lapCount = 1;

const startStopButton = document.getElementById('start-stop-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');
const timeDisplay = document.getElementById('time-display');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const lapList = document.getElementById('lap-list');

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return {
        hours: hours < 10 ? '0' + hours : hours,
        minutes: minutes < 10 ? '0' + minutes : minutes,
        seconds: seconds < 10 ? '0' + seconds : seconds
    };
}

function updateDisplay() {
    const time = formatTime(elapsedTime);
    hoursDisplay.textContent = time.hours;
    minutesDisplay.textContent = time.minutes;
    secondsDisplay.textContent = time.seconds;
}

function startStopwatch() {
    timer = setInterval(() => {
        elapsedTime += 1000; // Increase time by 1 second
        updateDisplay();
    }, 1000);
}

function stopStopwatch() {
    clearInterval(timer);
    updateDisplay();
}

function toggleStartStop() {
    if (isRunning) {
        stopStopwatch();
        startStopButton.textContent = 'Start';
    } else {
        startStopwatch();
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
    lapButton.disabled = !isRunning;
    resetButton.disabled = !isRunning;
}

function resetStopwatch() {
    stopStopwatch();
    elapsedTime = 0;
    lapCount = 1;
    updateDisplay();
    lapList.innerHTML = '';
    startStopButton.textContent = 'Start';
    lapButton.disabled = true;
    resetButton.disabled = true;
    isRunning = false;
}

function recordLap() {
    const time = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${time.hours}:${time.minutes}:${time.seconds}`;
    lapList.appendChild(lapItem);
    lapCount++;
}

startStopButton.addEventListener('click', toggleStartStop);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
