import { prefersReduced, isTouch } from './state.js';

const PARTICLE_COUNT = 40;
const LINE_DIST = 120;
const GOLD = '201, 168, 76';

export function initHeroParticles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  if (isTouch) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  const hero = canvas.closest('.hero');
  let width, height, particles;
  let rafId = null;

  function resize() {
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  }

  function makeParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random(),
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      o: 0.15 + Math.random() * 0.15,
    }));
  }

  function drawFrame() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINE_DIST) {
          ctx.strokeStyle = `rgba(${GOLD}, 0.05)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      ctx.fillStyle = `rgba(${GOLD}, ${p.o})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function tick() {
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });
    drawFrame();
    rafId = requestAnimationFrame(tick);
  }

  resize();
  makeParticles();

  if (prefersReduced) {
    drawFrame();
  } else {
    tick();
    window.addEventListener('resize', () => {
      resize();
      makeParticles();
    });
  }
}
