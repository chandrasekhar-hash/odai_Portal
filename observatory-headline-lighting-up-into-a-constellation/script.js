/*
  "The observatory headline that lights up into a constellation of stars on scroll" from Animorio · https://animorio.com
  License: free on your own sites and your clients’ sites, paid work included.
  Not for resale, redistribution, templates or code collections · https://animorio.com/en/license/
*/
/* The observatory headline that lights up into a constellation
   The opening of a made-up observatory app, Kestrel. The night sky is photographed by us on a canvas: a few thousand
   stars with their real colours, sizes and a soft bloom, the Milky Way as a soft cloud with its dark dust lanes, the
   glow of the horizon, a veil of grain. Scrolling, the letters of "See the sky the way it was" light up one by one:
   a thin constellation line first travels from the nearest lit letter, and when it arrives the new letter flares
   like a star and settles. The whole sky turns slowly around Polaris, the brightest stars leave a faint trail like
   a long exposure, and at the end a glass card with tonight's sighting rises from the bottom. */

/* ---- valori da cambiare ---- */
const RIDE = 1;          /* how much scroll the whole sequence takes: 2 is twice as long */
const TURN = 26;         /* degrees the sky turns around Polaris over the whole scroll */
const DRIFT = 0.12;      /* degrees per second the sky turns on its own */
const STARS = 1;         /* how many stars there are */
const MILKY = 1;         /* how bright the Milky Way is */
const TRAILS = 0.6;      /* how visible the star trails are (0 = none) */
const TWINKLE = 1;       /* how much the bright stars twinkle */
const GLOW = 1;          /* how much a lit letter glows */
const LINE = 0.6;        /* how visible the constellation line is */
const CARD_AT = 0.7;     /* share of the scroll at which the card rises */
const POLE_X = 0.8;      /* where Polaris sits, as a share of the width */
const POLE_Y = 0.15;     /* where Polaris sits, as a share of the height */

(() => {
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
  const mix = (a, b, t) => a + (b - a) * t;

  const hero = $('[data-hero]');
  const stage = $('[data-stage]');
  const canvas = $('[data-sky]');
  const ctx = canvas.getContext('2d');
  const copy = $('[data-copy]');
  const title = $('[data-title]');
  const svg = $('[data-links]');
  const polaris = $('[data-polaris]');
  const hint = $('[data-hint]');
  const card = $('[data-card]');
  const timeEl = $('[data-time]');
  const NS = 'http://www.w3.org/2000/svg';

  hero.style.height = (100 + 280 * Math.max(0.3, RIDE)) + 'vh';

  /* a seeded random, so the sky is the same at every visit */
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const gauss = (r) => (r() + r() + r() - 1.5) / 1.5;

  /* ------------------------------------------------ the headline, split into letters */
  const letters = [];
  $$('.title__line', title).forEach((line) => {
    const text = line.textContent;
    line.textContent = '';
    line.setAttribute('aria-hidden', 'true');
    for (const c of text) {
      const s = document.createElement('span');
      if (c === ' ') { s.className = 'sp'; } else { s.className = 'ch'; s.textContent = c; letters.push(s); }
      line.appendChild(s);
    }
  });
  const N = letters.length;
  const lit = letters.map(() => ({ shown: 0, flash: 0, on: false, cache: '' }));

  /* ------------------------------------------------ star sprites: a sharp core and a soft photographic bloom */
  const COLORS = [
    [178, 200, 255], /* blue white */
    [228, 236, 255], /* white */
    [255, 244, 224], /* yellow white */
    [255, 216, 168], /* yellow orange */
    [255, 178, 132]  /* orange red */
  ];
  const sprites = COLORS.map(([r, g, b]) => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const x = c.getContext('2d');
    const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(0.07, `rgba(${Math.min(255, r + 30)},${Math.min(255, g + 20)},${b},0.95)`);
    gr.addColorStop(0.16, `rgba(${r},${g},${b},0.42)`);
    gr.addColorStop(0.36, `rgba(${r},${g},${b},0.09)`);
    gr.addColorStop(0.7, `rgba(${r},${g},${b},0.02)`);
    gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
    x.fillStyle = gr;
    x.fillRect(0, 0, 64, 64);
    return c;
  });
  function pickColor(r) {
    const v = r();
    return v < 0.17 ? 0 : v < 0.6 ? 1 : v < 0.85 ? 2 : v < 0.97 ? 3 : 4;
  }

  /* ------------------------------------------------ the measures */
  let W = 0, H = 0, dpr = 1, px = 0, py = 0, R = 0;
  let stars = [], milky = null, mScale = 0.25;
  let gSky = null, gHaze = null, gGlow = null, gAir = null;
  let nodes = [], parents = [], lineEls = [], nodeEls = [], haloEls = [];
  let lift = 0;

  function buildSky() {
    const r = rng(1912);
    stars = [];
    const area = Math.PI * R * R;
    const count = Math.min(9000, Math.round(area * 0.00072 * STARS));
    for (let i = 0; i < count; i++) {
      const b = Math.pow(r(), 5.2);
      stars.push({ r: R * Math.sqrt(r()), a: r() * Math.PI * 2, b, c: pickColor(r), ph: r() * 6.28, f: 1.3 + r() * 2.6, f2: 0.7 + r() * 1.9 });
    }

    /* the band of the Milky Way in the frame of the pole (as it is at the start) */
    const diag = Math.hypot(W, H);
    const ax = 0.18 * W - px, ay = 1.05 * H - py;
    const bx = 0.66 * W - px, by = -0.12 * H - py;
    let dx = bx - ax, dy = by - ay;
    const dl = Math.hypot(dx, dy); dx /= dl; dy /= dl;
    const nx = -dy, ny = dx;
    const cx = (ax + bx) / 2, cy = (ay + by) / 2;
    const w = diag * 0.13;
    const L = R * 1.15;
    const bend = (t) => Math.sin(t / L * 2.2 + 0.6) * w * 0.55;
    const lane = (t) => bend(t) + Math.sin(t / L * 7.1 + 1.3) * w * 0.14 - w * 0.08;

    /* extra faint stars crowd in the band */
    const extra = Math.round(count * 0.55);
    for (let i = 0; i < extra; i++) {
      const t = (r() * 2 - 1) * L;
      const o = bend(t) + gauss(r) * w * 0.9;
      const x = cx + dx * t + nx * o, y = cy + dy * t + ny * o;
      const b = Math.pow(r(), 7) * 0.7;
      stars.push({ r: Math.hypot(x, y), a: Math.atan2(y, x), b, c: pickColor(r), ph: r() * 6.28, f: 1.3 + r() * 2.6, f2: 0.7 + r() * 1.9 });
    }
    /* Polaris itself, on the pole */
    stars.push({ r: 0, a: 0, b: 0.78, c: 2, ph: 0, f: 1, f2: 1, pole: true });
    stars.sort((s1, s2) => s1.b - s2.b);

    /* the cloud, painted small and drawn big: the bilinear stretch is the softness of a long lens */
    mScale = Math.min(0.5, 1100 / (2 * R));
    const T = Math.ceil(2 * R * mScale);
    milky = document.createElement('canvas');
    milky.width = milky.height = T;
    const m = milky.getContext('2d');
    const P = (x, y) => [(x + R) * mScale, (y + R) * mScale];
    const blob = (x, y, rad, col, al) => {
      const [u, v] = P(x, y);
      const rr = Math.max(1, rad * mScale);
      const g = m.createRadialGradient(u, v, 0, u, v, rr);
      g.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${al})`);
      g.addColorStop(0.5, `rgba(${col[0]},${col[1]},${col[2]},${al * 0.4})`);
      g.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
      m.fillStyle = g;
      m.fillRect(u - rr, v - rr, rr * 2, rr * 2);
    };
    m.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 760; i++) {
      const t = (r() * 2 - 1) * L;
      const core = Math.exp(-Math.pow((t + 0.12 * L) / (0.42 * L), 2));
      const o = bend(t) + gauss(r) * w * (0.45 + 0.25 * core);
      const x = cx + dx * t + nx * o, y = cy + dy * t + ny * o;
      const warm = clamp(core * 1.2 - 0.1 + gauss(r) * 0.15);
      const col = [mix(170, 255, warm) | 0, mix(190, 222, warm) | 0, mix(235, 182, warm) | 0];
      blob(x, y, w * (0.22 + r() * 0.55), col, (0.022 + 0.03 * core) * (0.6 + r() * 0.8));
    }
    /* star clouds: smaller and brighter knots inside the band */
    for (let i = 0; i < 160; i++) {
      const t = (r() * 2 - 1) * L * 0.9;
      const o = bend(t) + gauss(r) * w * 0.4;
      const x = cx + dx * t + nx * o, y = cy + dy * t + ny * o;
      blob(x, y, w * (0.05 + r() * 0.12), [255, 236, 214], 0.05 + r() * 0.05);
    }
    /* a few faint red glows of hydrogen, as a long exposure catches them */
    for (let i = 0; i < 14; i++) {
      const t = (r() * 2 - 1) * L * 0.7;
      const o = bend(t) + gauss(r) * w * 0.6;
      blob(cx + dx * t + nx * o, cy + dy * t + ny * o, w * (0.08 + r() * 0.14), [255, 120, 140], 0.025 + r() * 0.02);
    }
    /* the dark dust lanes, cut out of the light: long filaments that wander, not round holes */
    m.globalCompositeOperation = 'destination-out';
    for (let k = 0; k < 3; k++) {
      const off = (k - 0.8) * w * 0.2 + gauss(r) * w * 0.08;
      const ph = r() * 6.28;
      const from = (r() * 0.6 - 1) * L, to = from + (0.5 + r() * 1.1) * L;
      for (let t = from; t < to; t += w * 0.022) {
        const o = lane(t) + off + Math.sin(t / w * 1.1 + ph) * w * 0.09 + Math.sin(t / w * 3.3 + ph * 2) * w * 0.035 + gauss(r) * w * 0.03;
        const x = cx + dx * t + nx * o, y = cy + dy * t + ny * o;
        const thick = 0.5 + 0.5 * Math.sin(t / L * 5 + ph * 2);
        blob(x, y, w * (0.025 + thick * 0.06 + r() * 0.03), [0, 0, 0], (0.11 + thick * 0.17) * (k ? 0.7 : 1));
      }
    }
    for (let i = 0; i < 90; i++) {
      const t = (r() * 2 - 1) * L;
      const o = lane(t) + gauss(r) * w * 0.3;
      blob(cx + dx * t + nx * o, cy + dy * t + ny * o, w * (0.03 + r() * 0.06), [0, 0, 0], 0.08 + r() * 0.1);
    }
    m.globalCompositeOperation = 'source-over';
  }

  function buildGradients() {
    gSky = ctx.createLinearGradient(0, 0, 0, H);
    gSky.addColorStop(0, '#02040a');
    gSky.addColorStop(0.55, '#050a16');
    gSky.addColorStop(0.85, '#0a1426');
    gSky.addColorStop(1, '#122036');
    gHaze = ctx.createLinearGradient(0, H * 0.55, 0, H);
    gHaze.addColorStop(0, 'rgba(10,18,32,0)');
    gHaze.addColorStop(1, 'rgba(14,24,40,0.62)');
    gGlow = ctx.createRadialGradient(W * 0.28, H * 1.18, 0, W * 0.28, H * 1.18, Math.max(W, H) * 0.75);
    gGlow.addColorStop(0, 'rgba(255,170,110,0.16)');
    gGlow.addColorStop(0.45, 'rgba(200,130,110,0.05)');
    gGlow.addColorStop(1, 'rgba(0,0,0,0)');
    gAir = ctx.createLinearGradient(0, H * 0.7, 0, H);
    gAir.addColorStop(0, 'rgba(80,140,130,0)');
    gAir.addColorStop(0.7, 'rgba(80,140,130,0.05)');
    gAir.addColorStop(1, 'rgba(80,140,130,0)');
  }

  function buildLinks() {
    const cr = copy.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${cr.width} ${cr.height}`);
    const r = rng(23);
    nodes = letters.map((el) => {
      const b = el.getBoundingClientRect();
      const sc = el._gsap ? (gsap.getProperty(el, 'scale') || 1) : 1;
      const w = b.width / sc, h = b.height / sc;
      const lx = b.left + b.width / 2 - cr.left, ty = b.top + b.height / 2 - cr.top;
      return { x: lx + (r() - 0.5) * w * 0.3, y: ty - h / 2 + h * (0.36 + r() * 0.34) };
    });
    /* each new letter joins the nearest letter already lit: the constellation draws itself as a tree */
    parents = nodes.map((n, j) => {
      if (!j) return -1;
      let best = 0, bd = Infinity;
      for (let i = 0; i < j; i++) {
        const d = Math.hypot(nodes[i].x - n.x, (nodes[i].y - n.y) * 0.9);
        if (d < bd) { bd = d; best = i; }
      }
      return best;
    });
    const fs = parseFloat(getComputedStyle(title).fontSize) || 60;
    const k = clamp(fs / 110, 0.45, 1.2);
    svg.innerHTML = '<defs><radialGradient id="kh"><stop offset="0" stop-color="#f3f6ff" stop-opacity=".55"/><stop offset=".35" stop-color="#c9d7ff" stop-opacity=".16"/><stop offset="1" stop-color="#c9d7ff" stop-opacity="0"/></radialGradient></defs>';
    lineEls = []; nodeEls = []; haloEls = [];
    nodes.forEach((n, j) => {
      if (j) {
        const l = document.createElementNS(NS, 'line');
        const p = nodes[parents[j]];
        l.setAttribute('x1', p.x); l.setAttribute('y1', p.y); l.setAttribute('x2', p.x); l.setAttribute('y2', p.y);
        l.style.opacity = 0;
        svg.appendChild(l);
        lineEls[j] = l;
      }
    });
    nodes.forEach((n) => {
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'node');
      g.setAttribute('transform', `translate(${n.x} ${n.y}) scale(0)`);
      const h = document.createElementNS(NS, 'circle');
      h.setAttribute('r', 14 * k);
      h.setAttribute('fill', 'url(#kh)');
      const s = document.createElementNS(NS, 'path');
      const a = 6.5 * k, t = 0.9 * k;
      s.setAttribute('d', `M0 ${-a} C${t} ${-t} ${t} ${-t} ${a} 0 C${t} ${t} ${t} ${t} 0 ${a} C${-t} ${t} ${-t} ${t} ${-a} 0 C${-t} ${-t} ${-t} ${-t} 0 ${-a}Z`);
      g.appendChild(h); g.appendChild(s);
      svg.appendChild(g);
      nodeEls.push(g); haloEls.push(h);
    });
  }

  function measureLift() {
    /* how far the headline has to rise so it never sits under the card */
    const prevY = gsap.getProperty(copy, 'y');
    const prevC = gsap.getProperty(card, 'y');
    gsap.set(copy, { y: 0 });
    gsap.set(card, { y: 0 });
    const t = title.getBoundingClientRect();
    const lede = $('[data-lede]');
    const ls = lede && getComputedStyle(lede).display !== 'none' ? lede.getBoundingClientRect().bottom : t.bottom;
    const c = card.getBoundingClientRect();
    const nav = $('[data-nav]').getBoundingClientRect();
    const top = $('[data-eyebrow]').getBoundingClientRect().top;
    const want = Math.max(0, Math.max(t.bottom, ls) + Math.max(12, H * 0.03) - c.top);
    lift = Math.min(want, Math.max(0, top - nav.bottom - 4));
    gsap.set(copy, { y: prevY });
    gsap.set(card, { y: prevC });
  }

  function measure() {
    const rect = stage.getBoundingClientRect();
    W = Math.max(1, rect.width); H = Math.max(1, rect.height);
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    px = W * POLE_X; py = H * POLE_Y;
    R = Math.max(Math.hypot(px, py), Math.hypot(W - px, py), Math.hypot(px, H - py), Math.hypot(W - px, H - py)) + 30;
    buildSky();
    buildGradients();
    buildLinks();
    measureLift();
    gsap.set(polaris, { x: px, y: py });
  }

  /* ------------------------------------------------ the sky, every frame */
  let theta = 0, trail = 0, time = 0, skyIn = 0;
  function drawSky() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.fillStyle = gSky;
    ctx.fillRect(0, 0, W, H);

    ctx.globalCompositeOperation = 'lighter';
    if (MILKY > 0) {
      ctx.save();
      ctx.globalAlpha = clamp(0.72 * MILKY, 0, 1);
      ctx.translate(px, py);
      ctx.rotate(theta);
      ctx.drawImage(milky, -R, -R, 2 * R, 2 * R);
      ctx.restore();
    }

    /* the trails of the brightest stars, fading towards where they were */
    const span = trail;
    if (TRAILS > 0 && Math.abs(span) > 0.002) {
      ctx.lineCap = 'round';
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        if (s.b < 0.28) break;
        if (s.pole) continue;
        const a = s.a + theta;
        const col = COLORS[s.c];
        ctx.lineWidth = 0.6 + s.b * 1.1;
        for (let k = 0; k < 4; k++) {
          ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${(0.2 * TRAILS * s.b * (4 - k) / 4).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, s.r, a + span * k / 4, a + span * (k + 1) / 4, span < 0);
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const a = s.a + theta;
      const x = px + s.r * Math.cos(a), y = py + s.r * Math.sin(a);
      if (x < -12 || y < -12 || x > W + 12 || y > H + 12) continue;
      const low = clamp((y / H - 0.6) / 0.4);
      let b = s.b * (1 - low * 0.55);
      if (s.b > 0.2 && TWINKLE > 0 && !REDUCED) b *= 1 + TWINKLE * (0.22 + low * 0.3) * Math.sin(time * s.f + s.ph) * Math.sin(time * s.f2 + s.ph * 1.7);
      if (b < 0.0004 && s.b < 0.0004) {
        ctx.globalAlpha = 0.22;
        ctx.fillStyle = '#c8d4f0';
        ctx.fillRect(x, y, 0.8, 0.8);
        continue;
      }
      const size = 1.6 + Math.pow(b, 0.6) * 15;
      ctx.globalAlpha = clamp(0.26 + Math.pow(b, 0.45) * 0.95);
      ctx.drawImage(sprites[s.c], x - size / 2, y - size / 2, size, size);
    }
    ctx.globalAlpha = 1;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = gHaze;
    ctx.fillRect(0, H * 0.55, W, H * 0.45);
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = gGlow;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = gAir;
    ctx.fillRect(0, H * 0.7, W, H * 0.3);
    ctx.globalCompositeOperation = 'source-over';
  }

  /* ------------------------------------------------ the letters and the lines, every frame */
  const pop = gsap.parseEase('back.out(2.4)');
  const ease = gsap.parseEase('power2.inOut');
  function letterTargets(p) {
    const q = clamp((p - 0.05) / 0.58) * (N + 0.45);
    return letters.map((_, j) => ({ l: clamp((q - j - 0.45) / 0.55), s: clamp((q - j) / 0.5) }));
  }

  function paintLetters(p, dt) {
    const tg = letterTargets(p);
    for (let j = 0; j < N; j++) {
      const st = lit[j];
      const target = tg[j].l;
      if (REDUCED) st.shown += (Math.round(target) - st.shown) * (1 - Math.exp(-dt * 5));
      else st.shown = target;
      const v = REDUCED ? st.shown : ease(st.shown);

      if (!st.on && target >= 0.999) {
        st.on = true;
        if (!REDUCED) gsap.fromTo(st, { flash: 1 }, { flash: 0, duration: 1.5, ease: 'power3.out', overwrite: true });
      } else if (st.on && target < 0.5) {
        st.on = false;
      }
      const f = st.flash;
      const cr = mix(196, 246, v) | 0, cg = mix(208, 241, v) | 0, cb = mix(236, 230, v) | 0;
      const ca = mix(0.17, 1, v);
      const g1 = (v * 0.32 + f * 0.5) * GLOW, g2 = (v * 0.16 + f * 0.4) * GLOW;
      const sc = 1 + f * 0.05;
      const key = `${cr},${cg},${cb},${ca.toFixed(3)},${g1.toFixed(3)},${sc.toFixed(3)}`;
      if (key !== st.cache) {
        st.cache = key;
        const el = letters[j];
        el.style.color = `rgba(${cr},${cg},${cb},${ca.toFixed(3)})`;
        el.style.textShadow = g1 > 0.002
          ? `0 0 ${(0.12 + f * 0.1).toFixed(3)}em rgba(205,220,255,${g1.toFixed(3)}), 0 0 ${(0.45 + f * 0.4).toFixed(3)}em rgba(255,236,206,${g2.toFixed(3)})`
          : 'none';
        gsap.set(el, { scale: sc });
      }

      /* the node: a small four-pointed star on the letter */
      const n = nodes[j];
      const ns = REDUCED ? (st.shown > 0.01 ? 1 : 0) : pop(clamp(v)) + f * 0.55;
      nodeEls[j].setAttribute('transform', `translate(${n.x.toFixed(1)} ${n.y.toFixed(1)}) scale(${ns.toFixed(3)})`);
      nodeEls[j].style.opacity = REDUCED ? st.shown.toFixed(3) : clamp(v * 0.9 + f * 0.1).toFixed(3);
      haloEls[j].style.opacity = (0.55 + f * 0.9).toFixed(3);

      /* the line from the nearest lit letter */
      if (j) {
        const le = lineEls[j];
        const a = nodes[parents[j]];
        let sp = tg[j].s;
        if (REDUCED) {
          le._v = (le._v || 0) + ((sp > 0.5 ? 1 : 0) - (le._v || 0)) * (1 - Math.exp(-dt * 5));
          le.setAttribute('x2', n.x); le.setAttribute('y2', n.y);
          le.style.opacity = (le._v * LINE).toFixed(3);
        } else {
          sp = ease(sp);
          le.setAttribute('x2', mix(a.x, n.x, sp).toFixed(1));
          le.setAttribute('y2', mix(a.y, n.y, sp).toFixed(1));
          le.style.opacity = (clamp(sp * 4) * LINE * (0.8 + f * 0.4)).toFixed(3);
        }
      }
    }
  }

  /* ------------------------------------------------ the card */
  const cardState = { v: 0 };
  const minutes = { m: 20 * 60 };
  const arc = $('[data-arc]');
  const arcLen = arc.getTotalLength();
  gsap.set(arc, { strokeDasharray: arcLen, strokeDashoffset: arcLen });
  const showTime = () => {
    const m = Math.round(minutes.m);
    timeEl.textContent = String(Math.floor(m / 60) % 24).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
  };
  const inBits = $$('[data-in]', card);
  const cardTl = gsap.timeline({ paused: true });
  if (REDUCED) {
    cardTl.fromTo(card, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: 'power1.out' })
      .set(arc, { strokeDashoffset: 0 }, 0)
      .fromTo(['[data-fill]', '[data-now]', '[data-mark]'], { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0);
    minutes.m = 23 * 60 + 40;
  } else {
    cardTl
      .to(cardState, { v: 1, duration: 1.05, ease: 'expo.out' }, 0)
      .fromTo(card, { autoAlpha: 0, y: () => card.offsetHeight + H * 0.08, scale: 0.97, rotationX: 10, transformPerspective: 900, transformOrigin: '50% 100%' },
        { autoAlpha: 1, y: 0, scale: 1, rotationX: 0, duration: 1.15, ease: 'back.out(1.15)' }, 0)
      .fromTo(inBits, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.06 }, 0.22)
      .fromTo('[data-sheen]', { xPercent: -120 }, { xPercent: 360, duration: 1.4, ease: 'power2.inOut' }, 0.3)
      .to(arc, { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut' }, 0.35)
      .fromTo('[data-fill]', { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power1.out' }, 0.75)
      .fromTo(minutes, { m: 20 * 60 }, { m: 23 * 60 + 40, duration: 1.1, ease: 'expo.out', onUpdate: showTime }, 0.35)
      .fromTo('[data-now]', { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.6, ease: 'expo.out' }, 1.05)
      .fromTo('[data-mark]', { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.7, ease: 'back.out(3)' }, 1.1);
  }
  showTime();
  let cardOpen = false;

  /* the light inside the glass follows the pointer */
  card.addEventListener('pointermove', (e) => {
    const b = card.getBoundingClientRect();
    gsap.to(card, { '--mx': ((e.clientX - b.left) / b.width * 100) + '%', '--my': ((e.clientY - b.top) / b.height * 100) + '%', duration: 0.6, ease: 'power3.out' });
  });
  card.addEventListener('pointerleave', () => gsap.to(card, { '--mx': '30%', '--my': '0%', duration: 1, ease: 'power3.inOut' }));

  /* ------------------------------------------------ the scroll */
  function progress() {
    const max = Math.max(1, hero.offsetHeight - innerHeight);
    return clamp((window.scrollY || 0) / max);
  }

  function start() {
    measure();
    if (!REDUCED && window.Lenis) {
      const lenis = new Lenis({ duration: 0.9, easing: (t) => (t === 1 ? 1 : 1.001 - Math.pow(2, -10 * t)) });
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    /* arrival: the sky develops like a photograph, the nav and the words come in by time */
    const intro = gsap.timeline();
    const sky = { v: 0 };
    intro.to(sky, { v: 1, duration: REDUCED ? 0.8 : 2.2, ease: 'power2.out', onUpdate: () => { canvas.style.opacity = sky.v; } }, 0);
    if (REDUCED) {
      intro.from(['[data-nav]', '[data-eyebrow]', '[data-lede]', hint, title], { autoAlpha: 0, duration: 0.8, ease: 'power1.out' }, 0.2)
        .to(polaris, { autoAlpha: 1, duration: 0.8 }, 0.6);
    } else {
      intro.from('[data-nav] > *', { autoAlpha: 0, y: -10, duration: 1, ease: 'expo.out', stagger: 0.07 }, 0.3)
        .from(letters, { autoAlpha: 0, y: 14, duration: 1.2, ease: 'expo.out', stagger: 0.025 }, 0.4)
        .from('[data-eyebrow]', { autoAlpha: 0, y: 8, duration: 1, ease: 'expo.out' }, 0.5)
        .from('[data-lede]', { autoAlpha: 0, y: 8, duration: 1, ease: 'expo.out' }, 0.9)
        .from(hint, { autoAlpha: 0, duration: 0.8 }, 1.3)
        .fromTo(polaris, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 1.4, ease: 'expo.out' }, 1.1)
        .fromTo('[data-arrow]', { y: 0 }, { y: 3, duration: 0.9, ease: 'sine.inOut', repeat: -1, yoyo: true }, 1.6);
    }
    if (REDUCED) gsap.set(copy, { y: -lift });

    let p = progress();
    let last = 0;
    gsap.ticker.add((t) => {
      const dt = last ? Math.min(0.05, t - last) : 0.016;
      last = t;
      time = t;
      const goal = progress();
      p += (goal - p) * (1 - Math.exp(-dt * 9));
      if (Math.abs(goal - p) < 0.0004) p = goal;

      const turn = REDUCED ? 0 : -(TURN * p + DRIFT * t) * Math.PI / 180;
      theta = turn;
      trail = REDUCED ? 0 : (TURN * p * Math.PI / 180) * 0.9 + Math.min(0.06, DRIFT * t * Math.PI / 180);
      drawSky();
      paintLetters(p, dt);

      if (!cardOpen && p >= CARD_AT) { cardOpen = true; cardTl.timeScale(1).play(); }
      else if (cardOpen && p < CARD_AT - 0.05) { cardOpen = false; cardTl.timeScale(1.8).reverse(); }
      if (!REDUCED) gsap.set(copy, { y: -lift * cardState.v });
      hint.style.setProperty('--fade', clamp(1 - goal * 14).toFixed(3));
    });

    let rz = 0;
    addEventListener('resize', () => {
      if (rz) return;
      rz = requestAnimationFrame(() => { rz = 0; measure(); lit.forEach((s) => { s.cache = ''; }); if (REDUCED) gsap.set(copy, { y: -lift }); });
    });
  }

  if (document.readyState === 'complete') start();
  else addEventListener('load', start, { once: true });
})();
