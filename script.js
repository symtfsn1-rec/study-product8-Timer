const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const progressCircle = document.getElementById('progressCircle');
const startBtn = document.getElementById('startBtn');

const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

let timerId = null;
let timerLeft = 25 * 60;
let totalTime = 25 * 60;
let isRunning = false;

progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = 0;

const updateDisplay = () => {
  const m = Math.floor(timerLeft / 60);
  const s = timerLeft % 60;

  minutesDisplay.textContent = m.toString().padStart(2, '0');
  secondsDisplay.textContent = s.toString().padStart(2, '0');

  const offset = circumference - (timerLeft / totalTime) * circumference;
  progressCircle.style.strokeDashoffset = offset;
};

const toggleTimer = () => {
  if (isRunning) {
    clearInterval(timerId);
    startBtn.textContent = 'START';
  } else {
    timerId = setInterval(() => {
      timerLeft--;
      updateDisplay();
      if (timerLeft <= 0) {
        clearInterval(timerId);
        alert('時間です！');
      }
    }, 1000);
    startBtn.textContent = 'PAUSE';
  }
  isRunning = !isRunning;
}

const resetTimer = () => {
  clearInterval(timerId);
  isRunning = false;
  timerLeft = totalTime;
  startBtn.textContent = 'START';
  updateDisplay();
};

startBtn.addEventListener('click', toggleTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);

document.getElementById('workBtn').addEventListener('click', () => {
  totalTime = 25 * 60;
  resetTimer();
  document.getElementById('workBtn').classList.add('active');
  document.getElementById('breakBtn').classList.remove('active');
});
document.getElementById('breakBtn').addEventListener('click', () => {
  totalTime = 5 * 60;
  resetTimer();
  document.getElementById('breakBtn').classList.add('active');
  document.getElementById('workBtn').classList.remove('active');
});