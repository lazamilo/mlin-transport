# MLIN Transport redesign

Pitch redesign of mlin-transport.com by AKEO. Static site, six pages in Slovenian.

- `node build.mjs` regenerates the HTML pages from the templates in `build.mjs`
- `node serve.mjs` serves the site at http://localhost:4740
- `assets/` holds fonts (Maison Neue), images, the hero video, CSS and JS (GSAP, ScrollTrigger, Lenis)
- `assets/europe.svg.part` and `assets/cities.json` feed the route map at build time
