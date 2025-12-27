// Auto-generate numbers (Khmer ១–១២)
const khmerNumbers = ["១២", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩", "១០", "១១"];

const numbers = khmerNumbers.map((num, index) => ({
  num,
  deg: index * 30
}));

// Auto-generate dots (0–354 every 6°)
const dots = Array.from({ length: 60 }, (_, i) => ({
  d: ".",
  deg: i * 6
}));

const clock = document.getElementById("clock");

// Add numbers
numbers.forEach((item) => {
  const div = document.createElement("div");
  div.className = "number";
  div.textContent = item.num;
  div.style.transform = `translate(-50%, -50%) rotate(${item.deg}deg) translateY(-150px) rotate(-${item.deg}deg)`;
  clock.appendChild(div);
});

// Add dots
dots.forEach((item) => {
  const div = document.createElement("div");
  div.className = "dot";
  div.textContent = item.d;
  div.style.transform = `translate(-50%, -50%) rotate(${item.deg}deg) translateY(-170px) rotate(-${item.deg}deg)`;
  clock.appendChild(div);
});

// Hands & digital
const hourHand = document.getElementById("hour");
const minuteHand = document.getElementById("minute");
const secondHand = document.getElementById("second");
const digital = document.getElementById("digital");

const kh = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

function toKhmer(n) {
  return String(n)
    .padStart(2, "0")
    .split("")
    .map((d) => kh[d])
    .join("");
}

function update() {
  const now = new Date();
  const h = now.getHours() % 12;
  const m = now.getMinutes();
  const s = now.getSeconds();

  const secDeg = s * 6;
  const minDeg = m * 6 + s * 0.1;
  const hourDeg = h * 30 + m * 0.5;

  secondHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;

  digital.textContent = `${toKhmer(now.getHours())}:${toKhmer(m)}:${toKhmer(s)}`;
}

update();
setInterval(update, 1000);
