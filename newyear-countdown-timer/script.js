const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');

const newYear = new Date().getFullYear() + 1;
const nextYearStartTime = new Date(`January 01 ${newYear} 00:00:00`);

year.innerHTML = newYear;

function updateCountdownTimer() {
    const currentTime = new Date();
    const difference = nextYearStartTime - currentTime;
    
    const d = Math.floor(difference / 1000 / 60 / 60 /24);
    const h = Math.floor(difference / 1000 / 60 / 60) % 24;
    const m = Math.floor(difference / 1000 / 60) % 60;
    const s = Math.floor(difference / 1000 ) % 60;

    days.innerHTML = d;
    hours.innerHTML = h < 10 ? '0'+ h : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0'+ s : s;
}

setInterval(() => {
    updateCountdownTimer()
}, 1000);
