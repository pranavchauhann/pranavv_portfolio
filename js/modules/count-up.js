import { prefersReduced } from './state.js';

export function initCountUp(selector = '.stat-number') {
  document.querySelectorAll(selector).forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (Number.isNaN(target)) return;

    if (prefersReduced) {
      el.textContent = target + suffix;
      return;
    }

    const counter = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(counter.val) + suffix;
          },
        });
      },
    });
  });
}
