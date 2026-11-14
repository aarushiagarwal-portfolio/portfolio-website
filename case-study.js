/* ══════════════════════════════════════
   CASE STUDY COMPONENT
   Renders a grid tile + swipeable carousel modal
   from a plain data object. Design ported 1:1 from
   the rwe_carousel.html prototype.

   TO ADD A NEW CLIENT:
   1. Copy case-studies/rwe.js as a template.
   2. Save its logo + creative images under assets/case-studies/<client>/.
   3. Edit the data object (see rwe.js for the full shape).
   4. Add <script src="case-studies/<client>.js"></script> in index.html,
      right above the <script src="case-study.js"></script> line.
   That's it — this file renders whatever lands in window.CASE_STUDIES.

   The carousel is built from `data.slides`, an ordered array of
   { eyebrow, blocks: [...] }. Any number of slides, any order. Each
   block is one of:
     { type: 'logo', src, alt }
     { type: 'heading1', html }                      — big cover title
     { type: 'heading2', html, style? }               — section heading
     { type: 'paragraph', html, style? }
     { type: 'skillTiles', items: [string] }
     { type: 'specGrid', items: [{k, v} | {k, icons: [platform]}], style? }
       — platform icons available: instagram, facebook, linkedin, tiktok, reddit
     { type: 'roleList', items: [string] }
     { type: 'dashboardGroup', dashboards: [{ title, items: [{icon, label, num}] }] }
       — pass 1 dashboard or several (e.g. paid vs. organic side-by-side stacked),
         each dashboard can have any number of stat rows
     { type: 'creativesGrid', items: [{ img, tag, caption, href, isVideo? }] }
       — tag is freeform text (e.g. "REEL" or "POST"); isVideo defaults to
         true (shows the play triangle) — set false for static posts. Column
         count follows item count automatically: 1-3 items lay out in a
         single row, 4+ wrap into a 2-column grid.
     { type: 'trophy', icon, label, sub }              — for a pitch/award win
     { type: 'statTiles', items: [{icon, num, label}] } — 2-4 small stat cards
     { type: 'outcomeList', items: [{icon, text}] }     — takeaway rows

   specGrid's {k, v} labels are entirely freeform per client (e.g.
   Duration/Budget/Markets/Channels for a campaign, or Timeline/Platform/
   Markets/Audience for a pitch) — there's nothing to configure, just pass
   whatever labels fit the brief.
══════════════════════════════════════ */

const CS_PLATFORM_ICONS = {
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="6"/><circle cx="12" cy="12" r="5"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M13.8 9.2h1.6V6.6h-2c-2.1 0-3 1.2-3 2.9V11H8.7v2.6h1.7V18h2.6v-4.4h2l.3-2.6h-2.3V9.9c0-.5.2-.7.8-.7z" fill="currentColor" stroke="none"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="7.3" cy="7.3" r="1.15" fill="currentColor" stroke="none"/><rect x="6.15" y="10" width="2.3" height="8" fill="currentColor" stroke="none"/><path d="M11 10h2.2v1.15c.5-.75 1.35-1.35 2.5-1.35 1.9 0 3 1.25 3 3.55V18h-2.3v-4.05c0-1.05-.4-1.7-1.35-1.7-.75 0-1.2.5-1.4.95-.1.2-.1.5-.1.75V18H11V10z" fill="currentColor" stroke="none"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3v11.7a3.6 3.6 0 1 1-2.6-3.46"/><path d="M14 3c.35 2.3 1.9 4 4 4.4"/></svg>`,
  reddit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8c-1.5 0-2.5.7-3.2 1.8L7 9l1.5 4.5L12 12l-2-1c.3-.8 1-1.3 2-1.3 1.8 0 3 1.3 3 3s-1.2 3-3 3c-1.3 0-2.3-.7-2.8-1.7L7.5 15c.8 1.7 2.5 2.8 4.5 2.8 2.8 0 5-2.1 5-4.8S14.8 8 12 8z"/></svg>`,
};

/* ── Slide content blocks ──
   Each carousel slide is { eyebrow, blocks: [...] }. Blocks are rendered
   in order, so any client can compose slides freely (extra slides, extra
   dashboards, mixed creative types) without touching this file. ── */
function csRenderBlock(block) {
  switch (block.type) {
    case 'logo':
      return `<img class="cs-logo-img" src="${block.src}" alt="${block.alt || ''}">`;

    case 'heading1':
      return `<h1>${block.html}</h1>`;

    case 'heading2':
      return `<h2${block.style ? ` style="${block.style}"` : ''}>${block.html}</h2>`;

    case 'paragraph':
      return `<p class="cs-sub"${block.style ? ` style="${block.style}"` : ''}>${block.html}</p>`;

    case 'skillTiles':
      return `<div class="cs-skill-tiles">${block.items.map(s => `<div class="cs-skill-tile"><span class="cs-tape"></span>${s}</div>`).join('')}</div>`;

    case 'specGrid':
      return `<div class="cs-spec-grid"${block.style ? ` style="${block.style}"` : ''}>${block.items.map(csRenderSpecCard).join('')}</div>`;

    case 'roleList':
      return `<div class="cs-role-list">${block.items.map((t, i) => `<div class="cs-role-item"><span class="cs-role-num">${String(i + 1).padStart(2, '0')}</span><span class="cs-role-text">${t}</span></div>`).join('')}</div>`;

    case 'dashboardGroup':
      return block.dashboards.map((d, i) => csRenderDashboard(d, i > 0)).join('');

    case 'creativesGrid': {
      const cols = block.items.length <= 3 ? block.items.length : 2;
      return `<div class="cs-grid2x2" style="grid-template-columns: repeat(${cols}, 1fr);">${block.items.map(csRenderCreative).join('')}</div>`;
    }

    case 'trophy':
      return `
        <div class="cs-trophy-block">
          <span class="cs-tape"></span>
          <div class="cs-trophy-icon">${block.icon}</div>
          <div class="cs-trophy-label">${block.label}</div>
          <div class="cs-trophy-sub">${block.sub}</div>
        </div>`;

    case 'statTiles':
      return `<div class="cs-stat-tiles">${block.items.map(it => `<div class="cs-stat-tile"><div class="cs-s-icon">${it.icon}</div><div class="cs-s-num">${it.num}</div><div class="cs-s-label">${it.label}</div></div>`).join('')}</div>`;

    case 'outcomeList':
      return `<div class="cs-outcome-block">${block.items.map(it => `<div class="cs-outcome-row"><span class="cs-outcome-icon">${it.icon}</span><span class="cs-outcome-text">${it.text}</span></div>`).join('')}</div>`;

    default:
      return '';
  }
}

function csRenderSpecCard(item) {
  const valueHtml = item.icons
    ? `<div class="cs-platform-icons">${item.icons.map(name => CS_PLATFORM_ICONS[name] || '').join('')}</div>`
    : `<div class="cs-v">${item.v}</div>`;
  return `<div class="cs-spec-card"><span class="cs-tape"></span><div class="cs-k">${item.k}</div>${valueHtml}</div>`;
}

function csRenderDashboard(d, spaced) {
  return `
    <div class="cs-dashboard-box"${spaced ? ' style="margin-top:12px;"' : ''}>
      <span class="cs-tape"></span>
      <div class="cs-dashboard-title">${d.title}</div>
      <div class="cs-dash-cards">
        ${d.items.map(it => `<div class="cs-dash-card"><span class="cs-label"><span class="cs-icon">${it.icon}</span>${it.label}</span><span class="cs-num">${it.num}</span></div>`).join('')}
      </div>
    </div>`;
}

function csRenderCreative(c) {
  return `
    <a class="cs-frame" href="${c.href}" target="_blank" rel="noopener">
      <img src="${c.img}" alt="${c.caption}">
      <div class="cs-shade"></div>
      <span class="cs-reel-tag">${c.tag}</span>
      ${c.isVideo !== false ? '<span class="cs-play"></span>' : ''}
      <span class="cs-caption">${c.caption}</span>
    </a>`;
}

function csRenderSlide(slide, index, total) {
  const folio = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  return `
    <div class="cs-slide">
      <div class="cs-rule"></div><div class="cs-corner tl"></div><div class="cs-corner tr"></div>
      <div class="cs-eyebrow">${slide.eyebrow}</div>
      <div class="cs-slide-body">
        ${slide.blocks.map(csRenderBlock).join('')}
      </div>
      <div class="cs-folio">${folio}</div>
    </div>`;
}

/* ── Designed slide pages ──
   A case study can instead set `slidePages: ['path/slide-1.html', ...]`:
   finished 432×540 slide pages (e.g. case-studies/RWE/carousel/). Slide 1
   becomes the grid tile and every page becomes a carousel slide, scaled to
   fit. Pages with links stay clickable; the rest pass clicks/swipes through. */
const CS_PAGE_W = 432;
const csPageObserver = new ResizeObserver(entries => {
  entries.forEach(e => {
    const frame = e.target.querySelector('iframe');
    if (frame) frame.style.transform = `scale(${e.contentRect.width / CS_PAGE_W})`;
  });
});
function csPageHtml(src, title, interactive) {
  return `<div class="cs-page"><iframe src="${src}" title="${title}" scrolling="no" loading="lazy"${interactive ? '' : ' tabindex="-1" aria-hidden="true"'}></iframe></div>`;
}
function csFitPages(root) {
  root.querySelectorAll('.cs-page').forEach(p => {
    csPageObserver.observe(p);
    const frame = p.querySelector('iframe');
    frame.addEventListener('load', () => {
      try { if (frame.contentDocument.querySelector('a[href]')) p.classList.add('cs-page-live'); } catch (_) {}
    }, { once: true });
  });
}

function csBuildTile(data) {
  const btn = document.createElement('button');
  btn.className = 'cs-tile';
  btn.setAttribute('aria-label', `Open ${data.name} case study`);
  btn.dataset.cs = data.id; // lets Search narrow the grid to matching projects
  if (data.slidePages) {
    btn.classList.add('cs-tile-page');
    btn.innerHTML = csPageHtml(data.slidePages[0], `${data.name} case study cover`, false);
    csFitPages(btn);
    btn.addEventListener('click', () => csOpen(data));
    return btn;
  }
  btn.innerHTML = `
    <div class="cs-rule"></div><div class="cs-corner tl"></div><div class="cs-corner tr"></div>
    <div class="cs-tile-eyebrow">${data.eyebrow}</div>
    <div class="cs-tile-body">
      <img class="cs-logo-img" src="${data.logo}" alt="${data.name}" />
      <div class="cs-tile-brief">${data.tileBrief}</div>
      <div class="cs-tile-result">
        ${data.tileResults.map(r => `<div><div class="cs-r-label">${r.label}</div><div class="cs-r-num">${r.num}</div></div>`).join('')}
      </div>
    </div>
    <div class="cs-tile-open">View case study</div>
  `;
  btn.addEventListener('click', () => csOpen(data));
  return btn;
}

function csBuildSlidesHtml(data) {
  if (data.slidePages) {
    return data.slidePages.map((src, i) =>
      `<div class="cs-slide cs-slide-page">${csPageHtml(src, `${data.name} slide ${i + 1}`, true)}</div>`).join('');
  }
  return data.slides.map((slide, i) => csRenderSlide(slide, i, data.slides.length)).join('');
}

/* ── Modal (singleton) ── */
let csOverlayEl, csIndex = 0, csSlideCount = 0;

function csEnsureOverlay() {
  if (csOverlayEl) return csOverlayEl;
  csOverlayEl = document.createElement('div');
  csOverlayEl.className = 'cs-overlay';
  csOverlayEl.id = 'csOverlay';
  csOverlayEl.innerHTML = `
    <div class="cs-backdrop"></div>
    <div class="cs-modal">
      <button class="cs-close" aria-label="Close">✕</button>
      <div class="cs-viewport">
        <div class="cs-track"></div>
        <button class="cs-ov-nav cs-ov-prev" aria-label="Previous slide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="cs-ov-nav cs-ov-next" aria-label="Next slide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="cs-ov-dots"></div>
      </div>
      <div class="cs-info-side">
        <div class="cs-info-header">
          <div class="cs-info-avatar"><img src="aarushi-cropped.jpg" alt="Aarushi Agarwal"></div>
          <span class="cs-info-username"></span>
          <span class="cs-info-menu">&#8942;</span>
        </div>
        <div class="cs-info-body">
          <div class="cs-info-caption">
            <div class="cs-info-avatar"><img src="aarushi-cropped.jpg" alt="Aarushi Agarwal"></div>
            <p></p>
          </div>
        </div>
        <div class="cs-info-footer">
          <div class="cs-icon-row">
            <button class="cs-icon-btn cs-like-btn" aria-label="Like">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <button class="cs-icon-btn" aria-label="Comment">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </button>
            <button class="cs-icon-btn" aria-label="Share">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
            <span class="cs-icon-spacer"></span>
            <button class="cs-icon-btn" aria-label="Save">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(csOverlayEl);

  const closeBtn = csOverlayEl.querySelector('.cs-close');
  const backdrop = csOverlayEl.querySelector('.cs-backdrop');
  const prevBtn = csOverlayEl.querySelector('.cs-ov-prev');
  const nextBtn = csOverlayEl.querySelector('.cs-ov-next');
  const likeBtn = csOverlayEl.querySelector('.cs-like-btn');
  const track = csOverlayEl.querySelector('.cs-track');

  closeBtn.addEventListener('click', csClose);
  backdrop.addEventListener('click', csClose);
  prevBtn.addEventListener('click', () => csGoTo(csIndex - 1));
  nextBtn.addEventListener('click', () => csGoTo(csIndex + 1));
  likeBtn.addEventListener('click', () => likeBtn.classList.toggle('cs-liked'));

  /* swipe (touch) + drag (mouse) */
  track.addEventListener('dragstart', e => e.preventDefault());
  let dragStartX = null;
  const onDragEnd = clientX => {
    if (dragStartX === null) return;
    const dx = clientX - dragStartX;
    dragStartX = null;
    if (dx > 50) csGoTo(csIndex - 1);
    else if (dx < -50) csGoTo(csIndex + 1);
  };
  track.addEventListener('touchstart', e => { dragStartX = e.touches[0].clientX; });
  track.addEventListener('touchend', e => onDragEnd(e.changedTouches[0].clientX));
  track.addEventListener('mousedown', e => { dragStartX = e.clientX; e.preventDefault(); });
  document.addEventListener('mouseup', e => onDragEnd(e.clientX));

  document.addEventListener('keydown', e => {
    if (!csOverlayEl.classList.contains('open')) return;
    if (e.key === 'Escape') csClose();
    if (e.key === 'ArrowRight') csGoTo(csIndex + 1);
    if (e.key === 'ArrowLeft') csGoTo(csIndex - 1);
  });

  return csOverlayEl;
}

function csGoTo(i) {
  csIndex = Math.max(0, Math.min(csSlideCount - 1, i));
  const track = csOverlayEl.querySelector('.cs-track');
  track.style.transform = `translateX(-${csIndex * 100}%)`;
  csOverlayEl.querySelectorAll('.cs-ov-dot').forEach((d, i2) => d.classList.toggle('active', i2 === csIndex));
  csOverlayEl.querySelector('.cs-ov-prev').disabled = csIndex === 0;
  csOverlayEl.querySelector('.cs-ov-next').disabled = csIndex === csSlideCount - 1;
}

/* startIndex: slide to open on (0 = cover). Search uses it to land on the proof. */
function csOpen(data, startIndex = 0) {
  const overlay = csEnsureOverlay();
  const track = overlay.querySelector('.cs-track');
  const dotsWrap = overlay.querySelector('.cs-ov-dots');

  track.innerHTML = csBuildSlidesHtml(data);
  csFitPages(track);
  csSlideCount = track.querySelectorAll('.cs-slide').length;
  dotsWrap.innerHTML = '';
  for (let i = 0; i < csSlideCount; i++) {
    const dot = document.createElement('button');
    dot.className = 'cs-ov-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => csGoTo(i));
    dotsWrap.appendChild(dot);
  }

  overlay.querySelector('.cs-info-username').textContent = data.post.username;
  overlay.querySelector('.cs-info-caption p').innerHTML =
    `<strong>${data.post.username}</strong>${data.post.caption}`;
  overlay.querySelector('.cs-like-btn').classList.remove('cs-liked');

  track.style.transition = 'none'; // jump straight to the starting slide, no slide-through
  overlay.classList.add('open');
  csGoTo(startIndex);
  void track.offsetWidth;
  track.style.transition = '';
}

function csClose() {
  if (csOverlayEl) csOverlayEl.classList.remove('open');
}

/* ── Render all registered case studies into the grid, first ── */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.posts-grid');
  if (!grid || !window.CASE_STUDIES || !window.CASE_STUDIES.length) return;
  window.CASE_STUDIES.slice().reverse().forEach(data => {
    grid.prepend(csBuildTile(data));
  });
});
