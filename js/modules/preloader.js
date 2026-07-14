import { prefersReduced } from './state.js';

export function initPreloader(onComplete) {
  const preloader = document.getElementById('preloader');
  const countEl = document.getElementById('preloaderCount');
  const fillEl = document.getElementById('preloaderFill');
  const panelTop = document.getElementById('preloaderPanelTop');
  const panelBottom = document.getElementById('preloaderPanelBottom');

  function revealHero() {
    const words = document.querySelectorAll('#heroName .word');
    const typeLine = document.getElementById('heroTypeLine');
    const ctas = document.getElementById('heroCtas');

    gsap.timeline()
      .to(words, { y: '0%', duration: 0.8, ease: 'power3.out', stagger: 0.06 })
      .to(typeLine, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '+=0.12')
      .to(ctas, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '+=0.12');
  }

  function teardown() {
    preloader.remove();
    panelTop.remove();
    panelBottom.remove();
    document.body.classList.remove('is-loading');
    if (onComplete) onComplete();
  }

  if (prefersReduced) {
    gsap.set(['#heroName .word'], { y: '0%' });
    gsap.set(['#heroTypeLine', '#heroCtas'], { opacity: 1, y: 0 });
    gsap.to(preloader, {
      opacity: 0,
      duration: 0.4,
      onComplete: teardown,
    });
    return;
  }

  const counter = { val: 0 };
  gsap.to(counter, {
    val: 100,
    duration: 2,
    ease: 'power2.out',
    onUpdate: () => {
      const v = Math.round(counter.val);
      countEl.textContent = v;
      fillEl.style.width = v + '%';
    },
    onComplete: () => {
      revealHero();
      gsap.timeline({ onComplete: teardown })
        .to(preloader, { opacity: 0, duration: 0.5, ease: 'power2.out' })
        .to(panelTop, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '-=0.1')
        .to(panelBottom, { yPercent: 100, duration: 0.7, ease: 'power4.inOut' }, '<');
    },
  });
}
