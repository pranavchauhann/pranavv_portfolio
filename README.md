# Pranav Chauhan — Portfolio

Personal portfolio site. Dark, gold-accented, single-page — built with vanilla HTML/CSS/JS, no build step, deploys straight to Netlify.

## Stack

- **Structure**: plain `index.html`
- **Styling**: `css/style.css`, design tokens as CSS custom properties (palette, type scale, easing)
- **Fonts**: Cormorant Garamond (headings) + Inter (body), via Google Fonts
- **Animation**: [GSAP](https://gsap.com/) + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering/) for smooth scroll
- **JS**: native ES modules under `js/modules/`, entry point `js/main.js` (`<script type="module">` — no bundler)

## Project structure

```
index.html            Page structure/content
css/
  style.css           All styles (design tokens, components, sections)
js/
  main.js             Entry point — imports and initializes all modules
  modules/
    state.js           Shared feature flags (prefers-reduced-motion, touch)
    lenis-setup.js      Smooth-scroll init + ScrollTrigger sync
    nav.js              Navbar glass-on-scroll + mobile menu
    grain.js             Film-grain overlay reduced-motion handling
    cursor.js            Custom cursor (dot + lerped ring)
    magnetic.js          Magnetic pull for nav links / buttons / icons
    hero-particles.js    Canvas particle field behind the hero name
    hero-typewriter.js   Typewriter role cycler
    preloader.js         Percentage counter + hero reveal sequence
images/                Photo assets (portrait, photography grid)
```

## Local development

No build step — just serve the folder statically:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

Static deploy to Netlify — point it at the repo root, no build command needed.

## Accessibility / motion

- Respects `prefers-reduced-motion`: preloader becomes a brief fade, cursor/magnetic/grain/particle animation disable, scroll reveals become simple fades.
- Custom cursor and magnetic/particle effects are disabled on touch devices (`pointer: coarse`).
- Fully readable and usable with JavaScript disabled (see the `<noscript>` fallback in `index.html`).
