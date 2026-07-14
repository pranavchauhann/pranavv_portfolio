import { prefersReduced } from './state.js';

export function initProjectBorders() {
  document.querySelectorAll('.project-card').forEach((card) => {
    const svg = card.querySelector('.project-border-svg');
    const rect = svg && svg.querySelector('rect');
    if (!rect) return;

    function size() {
      const w = card.offsetWidth;
      const h = card.offsetHeight;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      rect.setAttribute('x', 0.5);
      rect.setAttribute('y', 0.5);
      rect.setAttribute('width', Math.max(w - 1, 0));
      rect.setAttribute('height', Math.max(h - 1, 0));
      const perimeter = 2 * ((w - 1) + (h - 1));
      rect.style.strokeDasharray = perimeter;
      if (!card.dataset.borderDrawn) {
        rect.style.strokeDashoffset = perimeter;
      }
    }

    size();
    window.addEventListener('resize', size);

    if (prefersReduced) {
      rect.style.strokeDashoffset = 0;
      card.dataset.borderDrawn = 'true';
      return;
    }

    ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        card.dataset.borderDrawn = 'true';
        gsap.to(rect, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out' });
      },
    });
  });
}
