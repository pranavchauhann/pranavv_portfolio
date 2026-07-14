import { prefersReduced } from './state.js';

export function initScrollReveals(selector = '[data-reveal]') {
  if (prefersReduced) return;

  document.querySelectorAll(selector).forEach((container) => {
    const items = container.children.length ? Array.from(container.children) : [container];

    gsap.from(items, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        once: true,
      },
    });
  });
}
