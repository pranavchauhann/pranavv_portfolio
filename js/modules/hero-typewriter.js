import { prefersReduced } from './state.js';

const WORDS = ['Software Developer', 'Data Scientist', 'Photographer'];
const TYPE_MS = 80;
const HOLD_MS = 1800;
const DELETE_MS = 40;
const PAUSE_BETWEEN_MS = 300;

export function initTypewriter() {
  const el = document.getElementById('heroTypewriter');
  if (!el) return;

  if (prefersReduced) {
    el.textContent = WORDS[0];
    return;
  }

  let wordIndex = 0;
  let charIndex = 0;

  function type() {
    const word = WORDS[wordIndex];
    if (charIndex < word.length) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      setTimeout(type, TYPE_MS);
    } else {
      setTimeout(erase, HOLD_MS);
    }
  }

  function erase() {
    const word = WORDS[wordIndex];
    if (charIndex > 0) {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      setTimeout(erase, DELETE_MS);
    } else {
      wordIndex = (wordIndex + 1) % WORDS.length;
      setTimeout(type, PAUSE_BETWEEN_MS);
    }
  }

  type();
}
