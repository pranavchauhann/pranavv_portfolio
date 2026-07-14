import { prefersReduced } from './state.js';

const MAX_OFFSET = 20;

export function initPhotoParallax() {
  if (prefersReduced) return;

  document.querySelectorAll('.photo-col').forEach((col, i) => {
    const amount = i % 2 === 0 ? MAX_OFFSET : -MAX_OFFSET;
    gsap.fromTo(
      col,
      { y: -amount },
      {
        y: amount,
        ease: 'none',
        scrollTrigger: {
          trigger: col,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });
}
