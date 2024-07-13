const clock = document.querySelector('.clock');
const date = clock.querySelector('.date');
const time = clock.querySelector('.time');

function updateClock() {
  const now = new Date();
  const dateString = now.toLocaleDateString();
  const timeString = now.toLocaleTimeString();
  date.textContent = dateString;
  time.textContent = timeString;
}

updateClock();

setInterval(updateClock, 1000)

