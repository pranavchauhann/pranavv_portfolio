import { prefersReduced } from './state.js';

export function initGrain() {
  if (!prefersReduced) return;
  const grain = document.querySelector('.grain-overlay');
  if (grain) grain.style.animation = 'none';
}
