// Generates the static pages from shared partials: node build.mjs
import fs from 'fs';
const dir = new URL('.', import.meta.url).pathname;
const A = 'assets';
const arrow = `<svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true"><path d="M0 7h16M10 1l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;

const nav = [
  ['index.html', 'Domov'],
  ['o-podjetju.html', 'O podjetju'],
  ['storitve.html', 'Storitve'],
  ['vozni-park.html', 'Vozni park'],
  ['galerija.html', 'Galerija'],
  ['kontakt.html', 'Kontakt'],
];

const head = (title, desc) => `<!doctype html>
<html lang="sl" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="noindex">
<link rel="icon" href="${A}/img/favicon.png">
<link rel="preload" href="${A}/fonts/MaisonNeue-Medium.otf" as="font" type="font/otf" crossorigin>
<link rel="stylesheet" href="${A}/css/site.css">
</head>
<body>`;

const header = (cur) => `
<div class="loader" aria-hidden="true"><div class="loader__in"><img src="${A}/img/logo.png" alt=""><div class="loader__bar"><i></i></div></div></div>
<header class="hdr">
  <a class="hdr__logo" href="index.html" aria-label="MLIN Transport, domov"><img src="${A}/img/logo.png" alt="MLIN Transport" width="230" height="60"></a>
  <nav class="hdr__nav" aria-label="Glavna navigacija">
    ${nav.slice(1).map(([h, l]) => `<a href="${h}"${h === cur ? ' aria-current="page"' : ''}>${l}</a>`).join('\n    ')}
  </nav>
  <a class="hdr__tel" href="tel:+38645306280">04 530 62 80</a>
  <a class="hdr__cta" href="kontakt.html#povprasevanje">Povpraševanje ${arrow}</a>
  <button class="hdr__burger" aria-label="Meni" aria-expanded="false"><span></span><span></span></button>
</header>
<nav class="mmenu" aria-label="Mobilna navigacija">
  ${nav.map(([h, l]) => `<a href="${h}"${h === cur ? ' aria-current="page"' : ''}>${l}</a>`).join('\n  ')}
  <div class="mmenu__foot"><a href="tel:+38645306280">04 530 62 80</a><a href="mailto:mlin@siol.net">mlin@siol.net</a><span>Podbrezje 3, 4202 Naklo</span></div>
</nav>
<main>`;

const footer = `</main>
<footer class="ftr">
  <div class="ftr__top">
    <div>
      <a class="ftr__logo" href="index.html"><img src="${A}/img/logo.png" alt="MLIN Transport" width="230" height="60"></a>
      <p style="max-width:440px;margin-top:24px;color:#B9B8B4">Družinsko podjetje za mednarodni in domači cestni prevoz blaga iz Podbrezja pri Naklem.</p>
    </div>
    <div>
      <h4>Kontakt</h4>
      <a href="tel:+38645306280">Telefon 04 530 62 80</a>
      <p>Faks 04 530 62 81</p>
      <a href="mailto:mlin@siol.net">mlin@siol.net</a>
      <p>Podbrezje 3, 4202 Naklo</p>
    </div>
    <div>
      <h4>Strani</h4>
      ${nav.slice(1).map(([h, l]) => `<a href="${h}">${l}</a>`).join('\n      ')}
    </div>
  </div>
  <a class="ftr__big" href="tel:+38645306280">04 530 62 80</a>
  <div class="ftr__bot"><p>© ${new Date().getFullYear()} MLIN d.o.o., Naklo. Podjetje za transport.</p><a href="https://www.mlin-transport.com">mlin-transport.com</a></div>
</footer>
<div class="lb" aria-hidden="true"><img alt=""></div>
<script src="${A}/js/gsap.min.js"></script>
<script src="${A}/js/ScrollTrigger.min.js"></script>
<script src="${A}/js/lenis.min.js"></script>
<script src="${A}/js/site.js"></script>
</body>
</html>`;

const page = (file, title, desc, body) =>
  fs.writeFileSync(dir + file, head(title, desc) + header(file) + body + footer);

/* ---------- shared blocks ---------- */

const form = (id = 'povprasevanje') => `
<form class="form" id="${id}" novalidate>
  <div class="seg" role="radiogroup" aria-label="Vrsta pošiljke">
    <input type="radio" name="vrsta" id="v1" value="Delna pošiljka" checked><label for="v1">Delna pošiljka</label>
    <input type="radio" name="vrsta" id="v2" value="Kompletna prikolica"><label for="v2">Kompletna prikolica</label>
    <input type="radio" name="vrsta" id="v3" value="Manjša pošiljka"><label for="v3">Manjša pošiljka</label>
    <input type="radio" name="vrsta" id="v4" value="Izredni prevoz"><label for="v4">Izredni prevoz</label>
    <input type="radio" name="vrsta" id="v5" value="Skladiščenje"><label for="v5">Skladiščenje</label>
  </div>
  <div class="fld"><label for="f-od">Nakladanje</label><input id="f-od" name="od" placeholder="Kraj, država" required></div>
  <div class="fld"><label for="f-do">Razkladanje</label><input id="f-do" name="do" placeholder="Kraj, država" required></div>
  <div class="fld"><label for="f-ime">Ime in priimek</label><input id="f-ime" name="ime" autocomplete="name" required></div>
  <div class="fld"><label for="f-mail">E-pošta</label><input id="f-mail" type="email" name="email" autocomplete="email" required></div>
  <div class="fld fld--full"><label for="f-msg">Opis blaga, teža, datum</label><textarea id="f-msg" name="sporocilo"></textarea></div>
  <button class="btn" type="submit">Pošljite povpraševanje ${arrow}</button>
  <p class="form__ok">Hvala. Povpraševanje smo prejeli in vam odgovorimo v najkrajšem možnem času.</p>
</form>`;

const contactInfo = `
<div class="cta__info">
  <div><h4>Telefon</h4><a href="tel:+38645306280">04 530 62 80</a></div>
  <div><h4>E-pošta</h4><a href="mailto:mlin@siol.net">mlin@siol.net</a></div>
  <div><h4>Naslov</h4><p>Podbrezje 3<br>4202 Naklo, Slovenija</p></div>
  <div><h4>Faks</h4><p>04 530 62 81</p></div>
</div>`;

/* map with routes */
const cities = JSON.parse(fs.readFileSync(dir + A + '/cities.json'));
const countries = fs.readFileSync(dir + A + '/europe.svg.part', 'utf8');
const eu = ['London', 'Birmingham', 'Bruselj', 'Amsterdam', 'Luksemburg', 'Lille', 'Pariz', 'Frankfurt', 'Hamburg', 'München', 'Milano', 'Torino'];
const non = ['Zagreb', 'Sarajevo', 'Beograd', 'Podgorica', 'Skopje', 'Priština'];
const [hx, hy] = cities.Naklo;
const curve = (x, y) => {
  const mx = (hx + x) / 2, my = (hy + y) / 2, dx = x - hx, dy = y - hy;
  const k = 0.18; // bow
  return `M${hx} ${hy}Q${(mx - dy * k).toFixed(1)} ${(my + dx * k).toFixed(1)} ${x} ${y}`;
};
const lblPos = { London: [-12, -10, 'end'], Birmingham: [-12, 4, 'end'], Amsterdam: [10, -8, 'start'], Bruselj: [10, 14, 'start'], Lille: [-10, 14, 'end'], Pariz: [-12, 4, 'end'], Luksemburg: [10, 14, 'start'], Hamburg: [10, -6, 'start'], Frankfurt: [10, -6, 'start'], 'München': [8, -10, 'start'], Milano: [10, 16, 'start'], Torino: [-12, 4, 'end'], Zagreb: [10, -10, 'start'], Sarajevo: [-10, 16, 'end'], Beograd: [10, -6, 'start'], Podgorica: [-10, 14, 'end'], Skopje: [10, 16, 'start'], 'Priština': [10, -6, 'start'] };
const mapSvg = `
<svg class="map__svg" viewBox="150 160 720 500" role="img" aria-label="Zemljevid prevozov iz Naklega po Evropi">
  <g>${countries}</g>
  <g>${[...eu, ...non].map(c => `<path class="rt${non.includes(c) ? ' non' : ''}" d="${curve(...cities[c])}"/>`).join('')}</g>
  <g>${[...eu, ...non].map(c => { const [x, y] = cities[c]; const [ox, oy, a] = lblPos[c] || [8, -8, 'start']; return `<circle class="dot${non.includes(c) ? ' non' : ''}" cx="${x}" cy="${y}" r="4"/><text class="lbl" x="${x + ox}" y="${y + oy}" text-anchor="${a}">${c}</text>`; }).join('')}</g>
  <circle class="pulse" cx="${hx}" cy="${hy}" r="7"/>
  <circle class="hub" cx="${hx}" cy="${hy}" r="7"/>
  <text class="lbl hub-lbl" x="${hx - 6}" y="${hy + 28}" text-anchor="end">Naklo</text>
</svg>`;

const mapSection = `
<section class="sec wrap" id="kje-vozimo">
  <div class="map">
    <div class="map__copy">
      <h2 class="d3 rv">Od Naklega do Londona in naprej.</h2>
      <p class="lead rv">Naša vozila so na cestah vseh držav EU, največ v Veliki Britaniji, Beneluksu, severni Franciji, Nemčiji in severni Italiji. Organiziramo tudi prevoze v države izven EU.</p>
      <div class="map__lists rv">
        <div><h3><i style="background:#0D0D0E"></i>Države EU</h3><ul><li>Velika Britanija</li><li>Belgija, Nizozemska, Luksemburg</li><li>Severna Francija</li><li>Nemčija</li><li>Severna Italija</li></ul></div>
        <div><h3><i style="background:var(--red)"></i>Izven EU</h3><ul><li>Hrvaška</li><li>Bosna in Hercegovina</li><li>Srbija</li><li>Črna gora</li><li>Makedonija</li><li>Kosovo</li></ul></div>
      </div>
    </div>
    <div>${mapSvg}</div>
  </div>
</section>`;

const trailerSvg = `
<svg viewBox="0 0 1200 360" aria-hidden="true">
  <line class="thin" x1="20" y1="318" x2="1180" y2="318"/>
  <!-- lifting roof -->
  <g class="lift"><rect class="acc" x="70" y="58" width="790" height="14"/></g>
  <!-- trailer body -->
  <rect x="70" y="72" width="790" height="184"/>
  ${Array.from({ length: 19 }, (_, i) => `<line class="thin" x1="${110 + i * 40}" y1="80" x2="${110 + i * 40}" y2="248"/>`).join('')}
  <line x1="70" y1="236" x2="860" y2="236"/>
  <!-- rear chevrons -->
  <line class="acc" x1="74" y1="92" x2="88" y2="78"/><line class="acc" x1="74" y1="122" x2="88" y2="108"/><line class="acc" x1="74" y1="152" x2="88" y2="138"/><line class="acc" x1="74" y1="182" x2="88" y2="168"/><line class="acc" x1="74" y1="212" x2="88" y2="198"/>
  <!-- chassis -->
  <path d="M70 256H860V272H70Z"/>
  <path d="M300 272V300M290 300H310"/>
  <circle cx="600" cy="290" r="27"/><circle cx="600" cy="290" r="11"/>
  <circle cx="664" cy="290" r="27"/><circle cx="664" cy="290" r="11"/>
  <circle cx="728" cy="290" r="27"/><circle cx="728" cy="290" r="11"/>
  <path d="M560 262c0-20 210-20 210 0"/>
  <!-- tractor -->
  <path d="M880 272V96c0-14 10-22 24-22h132c20 0 34 6 44 24l38 74c6 12 10 24 10 38v62H880Z"/>
  <path d="M1008 92h46c10 0 16 4 20 12l30 60c2 6 0 10-6 10h-90Z"/>
  <path d="M900 112h88v52h-88Z"/>
  <line x1="880" y1="232" x2="1128" y2="232"/>
  <path d="M1110 196h18M1110 212h18"/>
  <path d="M860 262H880"/>
  <circle cx="944" cy="290" r="27"/><circle cx="944" cy="290" r="11"/>
  <circle cx="1080" cy="290" r="27"/><circle cx="1080" cy="290" r="11"/>
  <!-- satellite -->
  <path class="acc" d="M1000 60c8-10 22-10 30 0M992 50c14-18 38-18 52 0M984 40c20-26 54-26 68 0"/>
  <!-- dimensions -->
  <path class="thin" d="M70 340H860M70 332v16M860 332v16"/>
  <path class="thin" d="M30 58V256M22 58h16M22 256h16"/>
</svg>`;

const fleetSection = (full = false) => `
<section class="sec wrap paper" id="vozni-park">
  <div class="fleet">
    <h2 class="d2 fleet__head rv">Osem vlačilcev, deset polprikolic in dve manjši vozili za vse ostalo.</h2>
    <p class="lead fleet__intro rv">Vozila so ekološka, redno vzdrževana in satelitsko nadzorovana, zato poznamo pozicijo vsakega v vsakem trenutku dneva.</p>
    <div class="fleet__img px rv"><img src="${A}/media/fleet.jpg" alt="Vrsta belih vlačilcev na parkirišču ob mraku" loading="lazy"></div>
    <div class="stats">
      <div class="stat rv"><b data-count="8">8</b><span>vlečnih vozil</span></div>
      <div class="stat rv"><b data-count="10">10</b><span>polprikolic, tautliner in coil-mulda</span></div>
      <div class="stat rv"><b><span data-count="26">26</span><small>t</small></b><span>nosilnosti na prikolico</span></div>
      <div class="stat rv"><b><span data-count="24">24</span><small>h</small></b><span>satelitski pregled vožnje in pozicije</span></div>
    </div>
    <div class="trailer">
      <div class="trailer__notes">
        <div class="rv"><em>01</em><h4>Tautliner in coil-mulda</h4><p>Polno opremljene prikolice za paletno blago in kolute pločevine.</p></div>
        <div class="rv"><em>02</em><h4>Dvižni strop</h4><p>Vse prikolice imajo dvižni strop, ki olajša nakladanje višjega blaga.</p></div>
        <div class="rv"><em>03</em><h4>Do 26 ton blaga</h4><p>Od ene palete do polne prikolice v enem prevozu.</p></div>
        ${full ? `<div class="rv"><em>04</em><h4>Kombi in vozilo z dvižno rampo</h4><p>Za manjše pošiljke in stranke, ki nimajo viličarja.</p></div>` : ''}
      </div>
      ${trailerSvg}
    </div>
  </div>
</section>`;

const services = [
  ['b1 card--img', 'dock.jpg', 'Delne pošiljke', 'Specializirani smo za prevoze delnih pošiljk v in iz držav članic EU ter nečlanic. Sledimo željam strank in iščemo ugodne rešitve pri prevzemu in dostavi.'],
  ['b2 card--img', 'night.jpg', 'Kompletni kamionski prevozi', 'Polne prikolice do 26 ton v mednarodnem in domačem cestnem prometu.'],
  ['b3 card--red', 'lift', 'Kombi in dvižna rampa', 'Manjše pošiljke pripeljemo tudi v težje dostopne kraje in k strankam brez viličarja.'],
  ['b4 card--img', '../gallery/Mlin-13.jpg', 'Izredni prevozi', 'Prevoze izrednih dimenzij izpeljemo v skladu z dogovorom.'],
  ['b5', 'store', 'Skladiščenje', 'Manjše skladišče omogoča hrambo vašega blaga za krajše časovno obdobje.'],
  ['b6 card--ink', 'globe', 'Izven EU', 'Hrvaška, Bosna in Hercegovina, Srbija, Črna gora, Makedonija in Kosovo.'],
];
const ill = {
  lift: `<svg class="ill" viewBox="0 0 300 160" preserveAspectRatio="xMinYMin meet"><path d="M10 20h170v100H10Z"/><path d="M180 50h60l30 34v36h-90Z"/><circle cx="50" cy="128" r="14"/><circle cx="230" cy="128" r="14"/><path d="M10 120v18h-36" transform="translate(30 0)"/><path d="M-30 138h60" transform="translate(30 0)"/><path d="M14 96h22v24H14Z"/></svg>`,
  store: `<svg class="ill" viewBox="0 0 300 160" preserveAspectRatio="xMinYMin meet"><path d="M10 60 150 10l140 50v100H10Z"/><path d="M60 160V90h180v70"/><path d="M60 110h180M60 130h180"/><path d="M90 160v-16h40v16M170 160v-16h40v16"/></svg>`,
  globe: `<svg class="ill" viewBox="0 0 300 160" preserveAspectRatio="xMinYMin meet"><circle cx="80" cy="80" r="70"/><path d="M10 80h140M80 10c-30 40-30 100 0 140M80 10c30 40 30 100 0 140"/><path d="M150 80c40 0 60-30 130-30" stroke-dasharray="4 8"/><circle cx="280" cy="50" r="6"/></svg>`,
};
const servicesSection = `
<section class="sec wrap" id="storitve">
  <div class="svc__head">
    <h2 class="d2 rv">Od ene palete do polne prikolice.</h2>
    <p class="lead rv">Prevažamo vse vrste blaga, od najmanjših pošiljk do kompletnih kamionskih prevozov v mednarodnem in domačem cestnem prometu.</p>
  </div>
  <div class="bento">
    ${services.map(([c, m, h, p]) => `<article class="card ${c}">${ill[m] || `<div class="px"><img src="${A}/media/${m}" alt="" loading="lazy"></div>`}<h3>${h}</h3><p>${p}</p></article>`).join('\n    ')}
  </div>
</section>`;

const trackSection = `
<section class="track wrap">
  <div class="px"><img src="${A}/media/aerial.jpg" alt="Tovornjak na avtocesti iz zraka" loading="lazy"></div>
  <div class="track__body">
    <h2 class="d2 rv">Vsako vozilo vidimo v vsakem trenutku dneva.</h2>
    <p class="lead rv">Satelitski nadzor nam omogoča 24-urni pregled vožnje in pozicije. Ko pokličete, vam povemo, kje je vaše blago.</p>
  </div>
  <div class="live rv" aria-label="Prikaz satelitskega nadzora">
    <div class="live__top">Pregled voznega parka <span>v živo</span></div>
    <ul>
      <li><i></i><b>Vlačilec 03</b><span class="mono">A2, Karavanke</span></li>
      <li><i></i><b>Vlačilec 06</b><span class="mono">A1 Calais → Dover</span></li>
      <li><i></i><b>Vlačilec 01</b><span class="mono">E35, Milano</span></li>
      <li><i></i><b>Kombi</b><span class="mono">Kranj</span></li>
    </ul>
    <small>Ponazoritev za predstavitev.</small>
  </div>
</section>`;

const gallery = [1, 9, 13, 5, 2, 16, 3, 6, 7, 11, 12, 15];
const gallerySection = `
<section class="hs sec--tight paper">
  <div class="hs__inner">
    <div class="hs__head wrap"><h2 class="d3 rv">Na terenu.</h2><a class="tlink rv" href="galerija.html">Vsa galerija ${arrow}</a></div>
    <div class="hs__track">
      ${gallery.map(n => `<figure${n === 13 ? ' class="tall"' : ''}><img src="${A}/gallery/Mlin-${n}.jpg" alt="MLIN Transport na terenu"></figure>`).join('\n      ')}
    </div>
  </div>
</section>`;

const ctaSection = `
<section class="sec wrap ink" id="kontakt">
  <div class="cta">
    <div class="cta__head">
      <h2 class="d2 rv">Kam peljemo vaše blago?</h2>
      <p class="lead rv">Pišite nam, kaj, od kod in kam. Odgovorimo v najkrajšem možnem času s ponudbo in terminom.</p>
      <div class="rv">${contactInfo}</div>
    </div>
    <div class="cta__form rv">${form()}</div>
  </div>
</section>`;

/* ---------- pages ---------- */

page('index.html', 'MLIN Transport · Mednarodni cestni prevoz blaga', 'Družinsko podjetje iz Naklega za prevoz delnih in kompletnih pošiljk po Evropi.', `
<section class="hero">
  <div class="hero__media">
    <video autoplay muted loop playsinline preload="auto" poster="${A}/media/hero.jpg"><source src="${A}/media/hero.mp4" type="video/mp4"></video>
  </div>
  <div class="hero__body">
    <h1 class="d1"><span class="l"><span>Zanesljiv prevoz</span></span><span class="l"><span class="dim">blaga po Evropi.</span></span></h1>
    <div class="hero__side">
      <p>Delne in kompletne pošiljke iz Naklega v Veliko Britanijo, Beneluks, Francijo, Nemčijo, Italijo in na Balkan.</p>
      <div class="hero__acts"><a class="btn" href="kontakt.html#povprasevanje">Pošljite povpraševanje ${arrow}</a><a class="btn btn--ghost" href="tel:+38645306280">04 530 62 80</a></div>
    </div>
  </div>
</section>

<section class="sec wrap">
  <div class="stmt">
    <p class="d3 stmt__txt" data-words>Smo družinsko podjetje, ki vozi blago po evropskih cestah. Želimo biti sinonim za kvalitetno, natančno in zanesljivo izpeljane prevoze vseh vrst blaga.</p>
    <div class="stmt__img px"><img src="${A}/media/curtain.jpg" alt="Detajl ponjave in zateznih trakov na prikolici" loading="lazy"></div>
    <div class="stmt__foot">
      <p class="lead rv">V letih dela smo si pridobili dragocene izkušnje in znanje, zato lahko strankam ponudimo kakovost in zanesljivost.</p>
      <p class="lead rv">Pri prevzemu in dostavi smo fleksibilni. Kjer ni viličarja, pridemo z vozilom z dvižno rampo. <a class="tlink" href="o-podjetju.html">O podjetju ${arrow}</a></p>
    </div>
  </div>
</section>
${mapSection}
${fleetSection()}
${servicesSection}
${trackSection}
${gallerySection}
${ctaSection}`);

page('o-podjetju.html', 'O podjetju · MLIN Transport', 'Poslanstvo in dejavnost podjetja MLIN d.o.o., Naklo.', `
<section class="phero wrap"><div class="phero__grid">
  <h1 class="d1">Družinsko podjetje na evropskih cestah.</h1>
  <p class="lead">MLIN d.o.o. iz Podbrezja pri Naklem se ukvarja s prevozom blaga v mednarodnem in domačem cestnem prometu.</p>
</div></section>
<div class="pimg px"><img src="${A}/media/hero.jpg" alt="Bel tovornjak na avtocesti pod Karavankami"></div>
<section class="sec wrap"><div class="cols">
  <h2 class="d3 cols__l rv">Poslanstvo</h2>
  <div class="cols__r rv">
    <p>Naše podjetje želi postati trden člen na področju transporta. S kakovostnimi rešitvami želimo doseči predvsem zadovoljstvo naših strank ter utrditi položaj na trgu doma in v tujini.</p>
    <p>Želimo biti sinonim za kvalitetno, natančno ter zanesljivo izpeljane prevoze vseh vrst blaga.</p>
  </div>
</div></section>
<section class="sec wrap paper"><div class="cols">
  <h2 class="d3 cols__l rv">Dejavnost</h2>
  <div class="cols__r rv">
    <p>Specializirani smo za prevoze delnih pošiljk v in iz držav članic ter nečlanic EU. Sledimo predvsem željam naših strank in jim nudimo ugodne in kakovostne rešitve pri prevzemu in dostavi blaga.</p>
    <p>Imamo tudi manjše skladišče, ki nam omogoča, da stranki nudimo skladiščenje za krajše časovno obdobje.</p>
    <p>Pri dostavi in prevzemu smo fleksibilni, saj imamo kombi in malo tovorno vozilo z dvižno rampo, tako da pridemo tudi do strank v manjših in težje dostopnih krajih. Nudimo tudi prevoze izrednih dimenzij v skladu z dogovorom.</p>
    <a class="tlink" href="storitve.html">Storitve ${arrow}</a>
  </div>
</div></section>
${mapSection}
${ctaSection}`);

page('storitve.html', 'Storitve · MLIN Transport', 'Delne pošiljke, kompletni prevozi, skladiščenje in izredni prevozi.', `
<section class="phero wrap"><div class="phero__grid">
  <h1 class="d1">Storitve</h1>
  <p class="lead">Od najmanjših do kompletnih kamionskih prevozov, v mednarodnem in domačem cestnem prometu.</p>
</div></section>
${servicesSection.replace('<section class="sec wrap" id="storitve">', '<section class="sec--tight wrap" id="storitve" style="padding-top:0">')}
${trackSection}
${mapSection}
${ctaSection}`);

page('vozni-park.html', 'Vozni park · MLIN Transport', 'Vlečna vozila, polprikolice tautliner in coil-mulda, kombi in vozilo z dvižno rampo.', `
<section class="phero wrap"><div class="phero__grid">
  <h1 class="d1">Vozni park</h1>
  <p class="lead">Naše prikolice so polno opremljene in omogočajo prevoze do 26 ton blaga. Vse imajo dvižni strop.</p>
</div></section>
${fleetSection(true)}
${trackSection}
${gallerySection}
${ctaSection}`);

page('galerija.html', 'Galerija · MLIN Transport', 'Fotografije voznega parka in prevozov.', `
<section class="phero wrap"><div class="phero__grid">
  <h1 class="d1">Galerija</h1>
  <p class="lead">Naša vozila in prevozi na terenu.</p>
</div></section>
<section class="wrap" style="padding-bottom:clamp(96px,12vw,220px)">
  <div class="masonry">
    ${gallery.map(n => `<figure class="rv"><img src="${A}/gallery/Mlin-${n}.jpg" alt="MLIN Transport, fotografija ${n}" loading="lazy"></figure>`).join('\n    ')}
  </div>
</section>
${ctaSection}`);

page('kontakt.html', 'Kontakt · MLIN Transport', 'Povpraševanje za prevoz, kontakt in lokacija MLIN d.o.o., Podbrezje 3, Naklo.', `
<section class="phero wrap"><div class="phero__grid">
  <h1 class="d1">Kam peljemo vaše blago?</h1>
  <p class="lead">Pišite nam in odgovorili vam bomo v najkrajšem možnem času.</p>
</div></section>
<section class="wrap" style="padding-bottom:clamp(96px,10vw,180px)">
  <div class="cta">
    <div class="cta__head">${contactInfo}</div>
    <div class="cta__form">${form()}</div>
  </div>
</section>
<section class="paper sec--tight wrap">
  <h2 class="d3 rv" style="margin-bottom:48px">Kako nas najdete</h2>
  <iframe class="mapframe rv" title="Zemljevid, Podbrezje 3, Naklo" loading="lazy" src="https://maps.google.com/maps?q=Podbrezje%203%2C%204202%20Naklo&z=13&output=embed"></iframe>
</section>`);

console.log('built', nav.map(n => n[0]).join(', '));
