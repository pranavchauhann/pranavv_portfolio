function openModal(modal) {
  modal.classList.add('is-open');
  document.body.classList.add('modal-open');
  if (window.__lenis) window.__lenis.stop();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => modal.querySelector('.modal-close')?.focus());
  });
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  if (window.__lenis) window.__lenis.start();
}

export function initProjectModals() {
  const modals = document.querySelectorAll('.project-modal');

  document.querySelectorAll('[data-modal-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.modalTarget);
      if (modal) openModal(modal);
    });
  });

  modals.forEach((modal) => {
    modal.querySelector('.modal-close')?.addEventListener('click', () => closeModal(modal));
    modal.querySelector('.project-modal-backdrop')?.addEventListener('click', () => closeModal(modal));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    modals.forEach((modal) => {
      if (modal.classList.contains('is-open')) closeModal(modal);
    });
  });
}
