/* ══════════════════════════════════════
   PAGE SCROLL LOCK
   While a story, case study, reel or panel is open, the page behind must not
   scroll. This watches for anything gaining or losing the "open" class, pins
   the page in place, and puts it back exactly where it was on close.
══════════════════════════════════════ */
const OPEN_LAYERS = '.story-overlay.open, .post-overlay.open, .cs-overlay.open, .reel-overlay.open, .about-viewer.open, .search-panel.open, .wn-panel.open, .chat-panel.open';
let pageLocked = false, pageLockY = 0, afterUnlock = null;

function jumpTo(y) { // instant, even though the page normally scrolls smoothly
  const root = document.documentElement;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(0, y);
  root.style.scrollBehavior = '';
}
function syncScrollLock() {
  const shouldLock = !!document.querySelector(OPEN_LAYERS);
  if (shouldLock === pageLocked) return;
  pageLocked = shouldLock;
  if (shouldLock) {
    pageLockY = window.scrollY;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.top = -pageLockY + 'px';
    if (scrollbar > 0) document.body.style.paddingRight = scrollbar + 'px'; // no sideways jump when the scrollbar goes
    document.body.classList.add('scroll-locked');
  } else {
    document.body.classList.remove('scroll-locked');
    document.body.style.top = '';
    document.body.style.paddingRight = '';
    jumpTo(pageLockY);
    if (afterUnlock) { const run = afterUnlock; afterUnlock = null; run(); }
  }
}
/* Scroll the page now, or as soon as whatever is open has closed. */
function whenScrollable(fn) {
  syncScrollLock();
  if (pageLocked) afterUnlock = fn; else fn();
}
/* People who ask their device for less motion get instant jumps, not glides */
const SCROLL_STYLE = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

/* ══════════════════════════════════════
   KEYBOARD FOCUS
   When a story, case study, reel or panel opens, focus moves into it; when it
   closes, focus goes back to whatever opened it. While a full-screen viewer is
   open the page behind can't be reached with Tab.
══════════════════════════════════════ */
const FOCUS_LAYERS = '.story-overlay, .post-overlay, .cs-overlay, .reel-overlay, .about-viewer, .search-panel, .wn-panel, .chat-panel';
const VIEWERS_OPEN = '.story-overlay.open, .post-overlay.open, .cs-overlay.open, .reel-overlay.open, .about-viewer.open';
const CAN_FOCUS = 'button:not([disabled]), a[href], input, [tabindex]:not([tabindex="-1"])';
const focusTrail = [];                 // recently focused or pressed controls, newest last
const layerOpener = new Map();         // open layer -> the control that opened it
let openLayers = new Set();

function noteFocus(el) {
  if (!el || el === document.body) return;
  focusTrail.push(el);
  if (focusTrail.length > 8) focusTrail.shift();
}
document.addEventListener('focusin', e => noteFocus(e.target));
const notePress = e => noteFocus(e.target.closest && e.target.closest(CAN_FOCUS));
document.addEventListener('pointerdown', notePress, true);
document.addEventListener('click', notePress, true);   // also covers Enter / Space on a button

function syncFocus() {
  const now = new Set(document.querySelectorAll(FOCUS_LAYERS));
  now.forEach(el => { if (!el.classList.contains('open')) now.delete(el); });
  const opened = [...now].filter(el => !openLayers.has(el));
  const closed = [...openLayers].filter(el => !now.has(el));
  openLayers = now;
  if (!opened.length && !closed.length) return;

  /* the page behind a full-screen viewer is out of reach of Tab and screen readers */
  const viewerOpen = !!document.querySelector(VIEWERS_OPEN);
  document.querySelectorAll('.sidebar, .mobile-top, .mobile-bottom, .ig-page').forEach(el => { el.inert = viewerOpen; });

  opened.forEach(el => {
    const active = document.activeElement;
    const opener = active && active !== document.body && !el.contains(active)
      ? active
      : focusTrail.slice().reverse().find(f => f.isConnected && !el.contains(f));
    layerOpener.set(el, opener || null);
    if (el.contains(document.activeElement)) return;   // it already took focus itself
    const target = el.querySelector('[role="dialog"]') || el;
    if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
    target.focus({ preventScroll: true });
  });

  if (!opened.length) closed.forEach(el => {
    const opener = layerOpener.get(el);
    layerOpener.delete(el);
    const active = document.activeElement;
    const lost = !active || active === document.body || el.contains(active);
    if (lost && opener && opener.isConnected && !opener.closest('[inert]')) opener.focus({ preventScroll: true });
  });
  else closed.forEach(el => layerOpener.delete(el));
}

/* Tab stays inside an open story or case study (the reel viewer does its own) */
document.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  if (document.querySelector('.reel-overlay.open')) return;   // it is on top and keeps Tab to itself
  const layer = document.querySelector('.cs-overlay.open') || document.querySelector('.story-overlay.open') || document.querySelector('.post-overlay.open') || document.querySelector('.about-viewer.open');
  if (!layer) return;
  const items = [...layer.querySelectorAll(CAN_FOCUS)].filter(el => el.getClientRects().length && !el.closest('[inert]'));
  if (!items.length) return;
  const first = items[0], last = items[items.length - 1], active = document.activeElement;
  const inside = items.includes(active);
  if (e.shiftKey && (!inside || active === first)) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && (!inside || active === last)) { e.preventDefault(); first.focus(); }
});

new MutationObserver(() => { syncScrollLock(); syncFocus(); })
  .observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });

/* ── TABS ────────────────────────────── */
/* Tabs listed here aren't ready yet: clicking shows a "coming soon" toast instead */
const COMING_SOON_TABS = [];

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (COMING_SOON_TABS.includes(btn.dataset.tab)) { showToast('Coming soon'); return; }
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

/* ══════════════════════════════════════
   STORY SYSTEM
══════════════════════════════════════ */

/* Each highlight is a list of designed story pages in stories/ (360×640,
   exported from the design canvas). Per slide:
     src       the page
     duration  how long it shows, in ms (default SLIDE_DURATION)
     link      a tappable area on the page: { href, x, y, w, h } in 360×640 px
     search    what the Search panel lists for this slide (Skills)
   Reviews also keep name/role/av/quote for Search and the Tagged tab. */
const STORY_W = 360, STORY_H = 640;
const LINKEDIN_URL = 'https://www.linkedin.com/in/aarushi-agarwal126/';
const STORIES = {
  about: [
    { src: 'stories/me-1.html' },
    { src: 'stories/me-2.html', duration: 8000 },
    { src: 'stories/me-3.html', duration: 6000,
      link: { href: LINKEDIN_URL, label: 'See my full experience on LinkedIn', x: 56, y: 474, w: 248, h: 46 } },
  ],
  skills: [
    { src: 'stories/skills-1.html', duration: 6000,
      search: ['Meta', 'TikTok', 'LinkedIn', 'Snapchat', 'Pinterest', 'Reddit'].map(t => ({ title: t, sub: 'Platform' })) },
    { src: 'stories/skills-2.html', duration: 7000,
      search: [
        ...['Sprout Social', 'Sprinklr', 'Hootsuite', 'Brandwatch', 'Monday.com', 'Ziflow', 'Canva', 'CapCut', 'ChatGPT', 'Claude'].map(t => ({ title: t, sub: 'Tool' })),
        ...['LinkedIn Marketing Strategy', 'Google Analytics', 'Hootsuite Social Marketing'].map(t => ({ title: t, sub: 'Certification' })),
      ] },
  ],
  reviews: [
    { src: 'stories/review-1.html', av:'NN', name:'Natasha N.', role:'Client',   quote:'"Extensive knowledge of social media. Always brings fresh ideas and executes them flawlessly. A genuine expert who elevates any team."' },
    { src: 'stories/review-2.html', av:'GS', name:'Grace S.',   role:'Client',   quote:'"Works efficiently, accurately, and on time. Every single time. She sets the standard for reliability and quality in everything she delivers."' },
    { src: 'stories/review-3.html', av:'KO', name:'Kat O.',     role:'Manager',  quote:'"Her growth within our team is truly inspiring. She stepped up at every opportunity and delivered results that consistently exceeded expectations."' },
    { src: 'stories/review-4.html', av:'SA', name:'Sheeza A.',  role:'Manager',  quote:'"Has her finger on the pulse when it comes to trends. She spots what\'s coming before anyone else and knows exactly how to capitalise on the moment."' },
    { src: 'stories/review-5.html', av:'SB', name:'Samuel B.',  role:'Manager',  quote:'"Fantastic in client-facing situations. Calm, articulate, and always makes the client feel heard and valued. An incredible asset in any meeting."' },
    { src: 'stories/review-6.html', av:'MA', name:'Mandy A.',   role:'Director', quote:'"A natural ability for translating client objectives into actionable outcomes. Aarushi bridges strategy and execution seamlessly — a rare and valuable skill."' },
  ],
};

/* A story slide: the designed page in an iframe, scaled to cover the story frame.
   The page loads (and its animations play) only when the slide is shown. */
const storyFitObserver = new ResizeObserver(entries => entries.forEach(e => fitStoryPage(e.target)));
/* Fill the frame, but never crop more than 8px off each side (the text sits
   22px in); on tall phones the page's own colour fills above and below. */
const storyScale = (w, h) => Math.min(Math.max(w / STORY_W, h / STORY_H), (w + 16) / STORY_W);
function fitStoryPage(slide) {
  const w = slide.clientWidth, h = slide.clientHeight;
  if (!w || !h) return;
  const k = storyScale(w, h);
  const stage = slide.querySelector('.story-page');
  stage.style.transform = `translate(${(w - STORY_W * k) / 2}px, ${(h - STORY_H * k) / 2}px) scale(${k})`;
}
function buildSlide(data) {
  const div = document.createElement('div');
  div.className = 'story-slide story-slide-page';
  const title = data.name ? `Review from ${data.name}, ${data.role}` : 'Story';
  div.innerHTML = `<div class="story-page"><iframe data-src="${data.src}" title="${title}" scrolling="no" tabindex="-1"></iframe></div>`;
  storyFitObserver.observe(div);
  return div;
}
/* A slide's link sits in the story frame above the tap zones, over the
   sticker drawn on the page (the page itself doesn't take clicks). */
const storyLinkEl = document.createElement('a');
storyLinkEl.className = 'story-link'; storyLinkEl.target = '_blank'; storyLinkEl.rel = 'noopener';
function placeStoryLink(idx) {
  const link = storySlides[idx] && storySlides[idx].link;
  const slide = storySlideArea.querySelectorAll('.story-slide')[idx];
  if (!link || !slide) { storyLinkEl.remove(); return; }
  const w = slide.clientWidth, h = slide.clientHeight, k = storyScale(w, h);
  const ox = (w - STORY_W * k) / 2 + slide.offsetLeft + storySlideArea.offsetLeft;
  const oy = (h - STORY_H * k) / 2 + slide.offsetTop + storySlideArea.offsetTop;
  storyLinkEl.href = link.href;
  storyLinkEl.setAttribute('aria-label', link.label || 'Open link');
  Object.assign(storyLinkEl.style, { left: ox + link.x * k + 'px', top: oy + link.y * k + 'px', width: link.w * k + 'px', height: link.h * k + 'px' });
  if (!storyLinkEl.isConnected) storyShell.appendChild(storyLinkEl);
}
function playStoryPage(slide) {
  const frame = slide && slide.querySelector('iframe[data-src]');
  if (!frame) return;
  frame.onload = () => { // match the space around the page to the page's own background
    try {
      const st = frame.contentDocument.querySelector('.st');
      const bg = st && getComputedStyle(st).backgroundColor;
      slide.style.background = bg && bg !== 'rgba(0, 0, 0, 0)' ? bg : '#3A1420';
    } catch (_) {}
  };
  frame.src = frame.dataset.src; // (re)load so the page's animations start from the top
}

/* Story state */
let storySlides = [], storyIdx = 0, storyTimer = null;
const SLIDE_DURATION = 5000;
const slideDuration = i => (storySlides[i] && storySlides[i].duration) || SLIDE_DURATION;

const storyOverlay  = document.getElementById('storyOverlay');
const storyBackdrop = document.getElementById('storyBackdrop');
const storyBars     = document.getElementById('storyBars');
const storySlideArea= document.getElementById('storySlideArea');
const storyClose    = document.getElementById('storyClose');
const storyTapLeft  = document.getElementById('storyTapLeft');
const storyTapRight = document.getElementById('storyTapRight');
const storyShell    = document.getElementById('storyShell');

/* On short screens (a phone held sideways) the story card keeps its designed
   size and is scaled down to fit, so nothing is cut off. See style.css. */
const STORY_FIT_H = 640;
function fitStory() {
  storyShell.style.setProperty('--story-fit', Math.min(1, (window.innerHeight * 0.9) / STORY_FIT_H).toFixed(3));
}
fitStory();
window.addEventListener('resize', fitStory);

/* startIdx: slide to open on (0 = first). What's new uses it to open a specific review. */
function openStory(key, startIdx = 0) {
  const data = STORIES[key];
  if (!data) return;
  storySlides = data;
  storyIdx = startIdx;

  // Build progress bars
  storyBars.innerHTML = data.map(() => `<div class="story-bar"><div class="story-bar-fill"></div></div>`).join('');

  // Build slides
  storySlideArea.innerHTML = '';
  data.forEach(d => storySlideArea.appendChild(buildSlide(d)));

  storyOverlay.classList.add('open');
  showStorySlide(startIdx);
}

function showStorySlide(idx) {
  clearInterval(storyTimer);
  storyIdx = idx;
  const slides = storySlideArea.querySelectorAll('.story-slide');
  const bars   = storyBars.querySelectorAll('.story-bar');

  slides.forEach((s, i) => s.classList.toggle('active', i === idx));

  bars.forEach((b, i) => {
    const fill = b.querySelector('.story-bar-fill');
    fill.style.transition = 'none';
    fill.style.width = i < idx ? '100%' : '0%';
    b.classList.remove('done', 'active');
    if (i < idx) b.classList.add('done');
  });

  // Animate active bar
  const activeBar = bars[idx];
  if (activeBar) {
    const fill = activeBar.querySelector('.story-bar-fill');
    requestAnimationFrame(() => {
      fill.style.transition = `width ${slideDuration(idx)}ms linear`;
      fill.style.width = '100%';
    });
    activeBar.classList.add('active');
  }

  playStoryPage(slides[idx]);
  if (slides[idx]) fitStoryPage(slides[idx]);
  placeStoryLink(idx);

  storyTimer = setTimeout(() => {
    if (idx + 1 < storySlides.length) showStorySlide(idx + 1);
    else closeStory();
  }, slideDuration(idx));
}

function closeStory() {
  clearInterval(storyTimer);
  storyOverlay.classList.remove('open');
  storySlideArea.querySelectorAll('iframe').forEach(f => f.removeAttribute('src'));
  storyLinkEl.remove();
}

storyClose.addEventListener('click', closeStory);
storyBackdrop.addEventListener('click', closeStory);
storyTapLeft.addEventListener('click',  () => { if (storyIdx > 0) showStorySlide(storyIdx - 1); });
storyTapRight.addEventListener('click', () => { if (storyIdx + 1 < storySlides.length) showStorySlide(storyIdx + 1); else closeStory(); });

/* Touch: swipe left / right moves between slides (taps still work as before) */
let storyTouch = null;
storyShell.addEventListener('touchstart', e => {
  storyTouch = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
}, { passive: true });
storyShell.addEventListener('touchend', e => {
  if (!storyTouch) return;
  const dx = e.changedTouches[0].clientX - storyTouch.x, dy = e.changedTouches[0].clientY - storyTouch.y;
  storyTouch = null;
  if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return; // too short, or mostly vertical
  if (dx > 0) { if (storyIdx > 0) showStorySlide(storyIdx - 1); }
  else if (storyIdx + 1 < storySlides.length) showStorySlide(storyIdx + 1);
  else closeStory();
}, { passive: true });

document.querySelectorAll('.highlight-item').forEach(item => {
  item.addEventListener('click', () => openStory(item.dataset.story));
});
document.getElementById('hireBtn').addEventListener('click', () => openChat());

/* ══════════════════════════════════════
   SIDEBAR + MOBILE NAV
   Every nav control carries data-nav="<action>". Actions without a
   handler yet (more) show a "coming soon" toast until
   their panels are built. Search is added by search.js and What's new
   by whats-new.js.
══════════════════════════════════════ */

function showTab(name) {
  document.querySelector(`.tab-btn[data-tab="${name}"]`).click();
  whenScrollable(() => document.querySelector('.tab-bar').scrollIntoView({ behavior: SCROLL_STYLE, block: 'start' }));
}

/* Posts tab = Work page, Reels tab = Reels page: keep the sidebar in step */
const TAB_TO_NAV = { grid: 'work', reels: 'reels' };
function setActiveNav(key) {
  document.querySelectorAll('.sidebar .nav-item').forEach(n => n.classList.toggle('active', n.dataset.nav === key));
}
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (TAB_TO_NAV[btn.dataset.tab]) setActiveNav(TAB_TO_NAV[btn.dataset.tab]);
  });
});

const NAV_ACTIONS = {
  work: () => {
    document.querySelector('.tab-btn[data-tab="grid"]').click();
    whenScrollable(() => window.scrollTo({ top: 0, behavior: SCROLL_STYLE }));
  },
  reels: () => showTab('reels'),
  chat: () => openStory('contact'), // replaced by the Let's chat panel in chat.js
  // the About me page (about.js) when it's switched on, otherwise the About story; the About highlight always opens the story
  about: () => { if (window.openAbout) location.hash = 'about'; else openStory('about'); },
};

const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
}

document.querySelectorAll('[data-nav]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const action = NAV_ACTIONS[el.dataset.nav];
    if (action) action();
    else showToast('Coming soon');
  });
});

/* ══════════════════════════════════════
   POST CAROUSEL MODAL
══════════════════════════════════════ */

const BRANDS = {};

let carIdx = 0, carSlides = [];
const postOverlay  = document.getElementById('postOverlay');
const postBackdrop = document.getElementById('postBackdrop');
const postModal    = document.getElementById('postModal');
const carouselTrack= document.getElementById('carouselTrack');
const carDots      = document.getElementById('carDots');
const carPrev      = document.getElementById('carPrev');
const carNext      = document.getElementById('carNext');
const postInfoSide = document.getElementById('postInfoSide');
const postClose    = document.getElementById('postClose');

carPrev.addEventListener('click', () => { if (carIdx > 0) { carIdx--; updateCar(); } });
carNext.addEventListener('click', () => { if (carIdx < carSlides.length - 1) { carIdx++; updateCar(); } });
document.querySelectorAll('.post-thumb[data-brand]').forEach(btn => {
  btn.addEventListener('click', () => openPost(btn.dataset.brand));
});
postClose.addEventListener('click', closePost);
postBackdrop.addEventListener('click', closePost);

function buildCarSlide(s) {
  const div = document.createElement('div');
  div.className = 'carousel-slide';

  if (s.img) {
    div.innerHTML = `<img src="${s.img}" alt="" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;" />`;
  } else {
    div.style.background = s.bg || '#111';
    let inner = `<div class="car-slide-overlay">`;
    if (s.label) inner += `<div class="car-slide-label">${s.label}</div>`;
    if (s.title) inner += `<div class="car-slide-title">${s.title}</div>`;
    if (s.sub)   inner += `<div class="car-slide-sub">${s.sub}</div>`;
    if (s.chips) inner += `<div class="car-chips">${s.chips.map(c=>`<span class="car-chip">${c}</span>`).join('')}</div>`;
    if (s.stats) inner += `<div class="car-stat-row">${s.stats.map(st=>`<div class="car-stat"><strong>${st.n}</strong><span>${st.l}</span></div>`).join('')}</div>`;
    inner += `</div>`;
    div.innerHTML = inner;
  }
  return div;
}

function updateCar() {
  carouselTrack.style.transform = `translateX(-${carIdx * 100}%)`;
  carPrev.disabled = carIdx === 0;
  carNext.disabled = carIdx === carSlides.length - 1;
  carDots.querySelectorAll('.car-dot').forEach((d,i) => d.classList.toggle('active', i === carIdx));
}

function openPost(key) {
  const b = BRANDS[key];
  if (!b) return;
  carSlides = b.slides;
  carIdx = 0;

  carouselTrack.innerHTML = '';
  carDots.innerHTML = '';
  b.slides.forEach((s, i) => {
    carouselTrack.appendChild(buildCarSlide(s));
    const dot = document.createElement('div');
    dot.className = 'car-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => { carIdx = i; updateCar(); });
    carDots.appendChild(dot);
  });

  postInfoSide.innerHTML = `
    <div class="pi-account">
      <div class="pi-avatar"><img src="aarushi-avatar.jpg" alt="Aarushi" width="38" height="38" loading="lazy" decoding="async" /></div>
      <div><strong>aarushiagarwal</strong><span>Social Media Manager</span></div>
      <button class="pi-hire" id="piHire">Get In Touch</button>
    </div>
    <div class="pi-brand-name">${b.name}</div>
    <p class="pi-desc">${b.desc}</p>
    <div class="pi-tags">${b.tags.map(t=>`<span class="pi-tag">${t}</span>`).join('')}</div>
    <div class="pi-stats">${b.stats.map(s=>`<div class="pi-stat"><strong>${s.n}</strong><span>${s.l}</span></div>`).join('')}</div>`;

  document.getElementById('piHire').addEventListener('click', () => { closePost(); openChat(); });
  updateCar();
  postOverlay.classList.add('open');
}

function closePost() { postOverlay.classList.remove('open'); }

document.addEventListener('keydown', e => {
  if (e.key === 'Escape')       { closeStory(); closePost(); }
  if (storyOverlay.classList.contains('open')) {   // keyboard version of tapping the sides of a story
    if (e.key === 'ArrowRight') storyTapRight.click();
    if (e.key === 'ArrowLeft')  storyTapLeft.click();
  }
  if (e.key === 'ArrowRight' && postOverlay.classList.contains('open')) { if (carIdx < carSlides.length - 1) { carIdx++; updateCar(); } }
  if (e.key === 'ArrowLeft'  && postOverlay.classList.contains('open')) { if (carIdx > 0) { carIdx--; updateCar(); } }
});
