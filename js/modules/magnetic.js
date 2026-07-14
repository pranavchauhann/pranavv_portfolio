import { prefersReduced, isTouch } from './state.js';

const RADIUS = 60;
const MAX_PULL = 8;

export function initMagnetic() {
  if (isTouch || prefersReduced) return;

  const els = Array.from(document.querySelectorAll('[data-magnetic]'));
  if (!els.length) return;

  const movers = els.map((el) => ({
    el,
    strength: parseFloat(el.dataset.magneticStrength || '1'),
    xTo: gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' }),
    yTo: gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' }),
    active: false,
  }));

  window.addEventListener('mousemove', (e) => {
    movers.forEach((m) => {
      const rect = m.el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < RADIUS) {
        m.active = true;
        const pull = MAX_PULL * m.strength;
        m.xTo((dx / RADIUS) * pull);
        m.yTo((dy / RADIUS) * pull);
      } else if (m.active) {
        m.active = false;
        gsap.to(m.el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
      }
    });
  }, { passive: true });
}
