(() => {
  const root = document.documentElement;
  root.classList.remove('no-js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) root.classList.add('reduced');

  /* mobile menu */
  const burger = document.querySelector('.hdr__burger');
  burger && burger.addEventListener('click', () => {
    const open = root.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open);
  });

  /* forms (pitch demo: no backend) */
  document.querySelectorAll('form.form').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    if (!f.reportValidity()) return;
    f.classList.add('sent');
    f.querySelector('button[type=submit]').disabled = true;
  }));

  /* lightbox */
  const lb = document.querySelector('.lb');
  if (lb) {
    const lbImg = lb.querySelector('img');
    document.querySelectorAll('.masonry figure').forEach(fig => fig.addEventListener('click', () => {
      lbImg.src = fig.querySelector('img').src; lb.classList.add('on');
    }));
    lb.addEventListener('click', () => lb.classList.remove('on'));
    addEventListener('keydown', e => e.key === 'Escape' && lb.classList.remove('on'));
  }

  /* hero video: make sure it plays (Chrome/Firefox) */
  document.querySelectorAll('video[autoplay]').forEach(v => { v.muted = true; v.play().catch(() => {}); });

  /* statement: split into words */
  document.querySelectorAll('[data-words]').forEach(el => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
  });

  const loader = document.querySelector('.loader');
  if (reduced || !window.gsap) {
    loader && loader.remove();
    document.querySelectorAll('.w').forEach(w => w.classList.add('on'));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis({ lerp: 0.09 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -60 }); }
  }));

  /* header hides on scroll down */
  const hdr = document.querySelector('.hdr');
  let last = 0;
  lenis.on('scroll', ({ scroll }) => {
    if (root.classList.contains('menu-open')) return;
    hdr.classList.toggle('is-hidden', scroll > 300 && scroll > last);
    last = scroll;
  });

  /* loader + hero intro */
  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  if (loader) {
    intro.from('.loader img', { y: 24, opacity: 0, duration: .6 })
      .to('.loader__bar i', { scaleX: 1, duration: .7, ease: 'power2.inOut' }, '-=.2')
      .to(loader, { yPercent: -100, duration: .8, ease: 'power4.inOut' })
      .set(loader, { display: 'none' });
  }
  if (document.querySelector('.hero')) {
    intro.from('.hero__media', { scale: 1.12, duration: 1.8, ease: 'power2.out' }, loader ? '-=.7' : 0)
      .from('.hero h1 .l span', { yPercent: 110, duration: 1.1, stagger: .1 }, '<.15')
      .from('.hero__side > *', { y: 30, opacity: 0, duration: .9, stagger: .1 }, '<.4');
    gsap.to('.hero__media', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }
  if (document.querySelector('.phero')) {
    intro.from('.phero h1, .phero .lead', { y: 50, opacity: 0, duration: 1, stagger: .12 }, loader ? '-=.5' : 0);
  }

  /* reveals */
  gsap.utils.toArray('.rv').forEach(el => gsap.to(el, {
    y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%' }
  }));

  /* parallax inside frames */
  gsap.utils.toArray('.px img').forEach(img => gsap.fromTo(img, { yPercent: -7 }, {
    yPercent: 7, ease: 'none',
    scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
  }));

  /* statement words */
  document.querySelectorAll('[data-words]').forEach(el => {
    const ws = el.querySelectorAll('.w');
    ScrollTrigger.create({
      trigger: el, start: 'top 75%', end: 'bottom 45%', scrub: true,
      onUpdate: s => { const n = Math.round(s.progress * ws.length); ws.forEach((w, i) => w.classList.toggle('on', i < n)); }
    });
  });

  /* map routes */
  const map = document.querySelector('.map__svg');
  if (map) {
    const rts = map.querySelectorAll('.rt');
    rts.forEach(p => { const l = p.getTotalLength(); p.style.strokeDasharray = l; p.style.strokeDashoffset = l; });
    const tl = gsap.timeline({ scrollTrigger: { trigger: map, start: 'top 70%', end: 'bottom 60%', scrub: 1 } });
    tl.from(map.querySelectorAll('.c.eu, .c.non'), { fill: '#E7E5E0', duration: .4, stagger: .02 })
      .to(rts, { strokeDashoffset: 0, duration: 1, stagger: .05, ease: 'none' }, 0)
      .from(map.querySelectorAll('.dot, .lbl'), { opacity: 0, duration: .2, stagger: .03 }, .3);
  }

  /* counters */
  gsap.utils.toArray('[data-count]').forEach(el => {
    const end = +el.dataset.count, o = { v: 0 };
    gsap.to(o, { v: end, duration: 1.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => el.textContent = Math.round(o.v) });
  });

  /* trailer line drawing */
  const tr = document.querySelector('.trailer svg');
  if (tr) {
    const els = tr.querySelectorAll('path, line, rect, circle, polyline');
    els.forEach(p => { const l = p.getTotalLength ? p.getTotalLength() : 600; p.style.strokeDasharray = l; p.style.strokeDashoffset = l; });
    gsap.to(els, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut', stagger: .015,
      scrollTrigger: { trigger: tr, start: 'top 80%' } });
    gsap.from('.trailer .lift', { y: 26, duration: 1.2, ease: 'power3.inOut', repeat: -1, yoyo: true, repeatDelay: 1.2, delay: 2.6 });
  }

  /* horizontal gallery */
  const track = document.querySelector('.hs__track');
  if (track && matchMedia('(min-width: 981px)').matches) {
    const dist = () => track.scrollWidth - innerWidth;
    gsap.to(track, { x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: '.hs', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true } });
  }

  /* bento cards stagger */
  gsap.utils.toArray('.bento').forEach(b => gsap.from(b.children, {
    y: 60, opacity: 0, duration: 1, ease: 'power3.out', stagger: .08, scrollTrigger: { trigger: b, start: 'top 80%' }
  }));

  addEventListener('load', () => ScrollTrigger.refresh());
})();
