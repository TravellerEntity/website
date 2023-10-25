const gravity = 0.8;
const timeToLive = 100;
const xVelSpread = 2;
const xSpread = 10;
const ySpread = 20;
const launchSpeedMin = 8;
const launchSpeedMax = 15;
const numParticles = 25;
const rectWidth = 8;
const rectHeight = 8;

const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

var particles = [];

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor(x, y, vx, vy, color, ttl) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.ttl = ttl;
  }
}

function addParticles(e) {
  console.log(particles);
  var ex = e.clientX;
  var ey = e.clientY;
  for (let i = 0; i < numParticles; i++) {
    const x = getRandom(ex - xSpread, ex + xSpread);
    const y = getRandom(ey - ySpread, ey + ySpread);
    const vx = getRandom(-xVelSpread, xVelSpread);
    const vy = -getRandom(launchSpeedMin, launchSpeedMax);
    const ttl = timeToLive;
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    particles.push(new Particle(x, y, vx, vy, color, ttl));
    console.log("added particle " + i + " at " + x + "," + y);
  }
}

function update() {
  particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += gravity;
    particle.ttl -= 1;
  });
  var filtered = particles.filter(function (p) {
    return p.ttl >= 0;
  });
  particles = filtered;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.fillRect(particle.x, particle.y, rectWidth, rectHeight);
  });
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();

document.addEventListener("click", addParticles);