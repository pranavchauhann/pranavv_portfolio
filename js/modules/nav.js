export function initNav() {
  const navbar = document.getElementById('navbar');

  function updateNav() {
    navbar.classList.toggle('is-scrolled', window.scrollY > 50);
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    const open = navToggle.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileMenu.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', closeMobileMenu);
  });
}
