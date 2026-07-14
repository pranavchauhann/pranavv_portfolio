import { prefersReduced } from './state.js';

export function initSplitHeadings(selector = 'main h2.section-title') {
  document.querySelectorAll(selector).forEach((heading) => {
    if (heading.dataset.splitDone) return;
    heading.dataset.splitDone = 'true';

    const words = heading.textContent.trim().split(/\s+/);
    heading.innerHTML = words
      .map((w) => `<span class="word-mask"><span class="word">${w}</span></span>`)
      .join(' ');

    const wordEls = heading.querySelectorAll('.word');

    if (prefersReduced) {
      gsap.set(wordEls, { y: '0%' });
      return;
    }

    gsap.to(wordEls, {
      y: '0%',
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: heading,
        start: 'top 80%',
        once: true,
      },
    });
  });
}
