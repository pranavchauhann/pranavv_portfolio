import { initLenis } from './modules/lenis-setup.js';
import { initNav } from './modules/nav.js';
import { initGrain } from './modules/grain.js';
import { initCursor } from './modules/cursor.js';
import { initMagnetic } from './modules/magnetic.js';
import { initHeroParticles } from './modules/hero-particles.js';
import { initTypewriter } from './modules/hero-typewriter.js';
import { initPreloader } from './modules/preloader.js';
import { initSplitHeadings } from './modules/split-headings.js';
import { initScrollReveals } from './modules/scroll-reveal.js';
import { initCountUp } from './modules/count-up.js';

gsap.registerPlugin(ScrollTrigger);

window.__lenis = initLenis();
initNav();
initGrain();
initCursor();
initHeroParticles();
initSplitHeadings();
initScrollReveals();
initCountUp();

initPreloader(() => {
  initTypewriter();
  initMagnetic();
});
