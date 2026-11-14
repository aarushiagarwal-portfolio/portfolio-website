/* ══════════════════════════════════════
   SEARCH PANEL
   Opens from the Search button in the sidebar (and the mobile bottom bar).
   Everything it shows is read from data that already exists on the site,
   so there is nothing to keep in sync by hand:

     Projects  ← case-studies/*.js   (tags, proof lines and all the slide text)
     Reels     ← REELS in reels.js
     Skills    ← the Skills story in script.js
     Reviews   ← the Reviews story in script.js

   TO ADD OR CHANGE A TAG: edit the `tags` list in that project's file in
   case-studies/. Chips are built from those lists, so a new tag name
   creates a new chip automatically.

   TO TEACH SEARCH A NEW WORD: add it to ALIASES below
   ('what people type': ['what it should find']).

   Links: ?tag=paid-social and ?q=sprinklr open the site with that search
   already showing, so a search can be shared in an application.
══════════════════════════════════════ */
(function () {
  /* Words visitors might type → the words the site actually uses. */
  const ALIASES = {
    'ads': ['paid social'],
    'advertising': ['paid social'],
    'paid ads': ['paid social'],
    'paid media': ['paid social'],
    'ppc': ['paid social'],
    'performance marketing': ['paid social'],
    'meta': ['facebook', 'instagram'],
    'ig': ['instagram'],
    'insta': ['instagram'],
    'fb': ['facebook'],
    'analytics': ['reporting'],
    'data': ['reporting'],
    'community management': ['community'],
    'organic social': ['organic'],
    'always on': ['organic'],
    'employer branding': ['employer brand'],
    'recruitment marketing': ['employer brand'],
    'video production': ['video'],
    'short form': ['video'],
    'reels': ['video'],
    'new business': ['pitches'],
    'pitching': ['pitches'],
  };

  /* Tags listed here are platforms: their chips come after the others. */
  const PLATFORMS = ['instagram', 'facebook', 'linkedin', 'tiktok', 'reddit', 'snapchat', 'pinterest', 'youtube'];
  const CHIPS_SHOWN = 8; // the rest sit behind a "More" chip

  const ICONS = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/></svg>',
    clear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M7 7l10 10M17 7 7 17"/></svg>',
    skill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12z"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/></svg>',
  };

  /* ── text helpers ── */
  const norm = s => String(s).toLowerCase().replace(/&/g, ' and ')
    .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const wordsOf = s => norm(s).split(' ').filter(Boolean);
  const plain = html => String(html).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const slug = s => norm(s).replace(/ /g, '-');
  const hashtag = s => '#' + norm(s).replace(/ /g, '');
  const countLabel = n => n + (n === 1 ? ' case study' : ' case studies');

  /* Bold the start of every word the visitor typed. */
  function highlight(text, tokens) {
    if (!tokens || !tokens.length) return esc(text);
    const alt = tokens.slice().sort((a, b) => b.length - a.length).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const re = new RegExp('(^|[^A-Za-z0-9])(' + alt + ')', 'gi');
    let out = '', last = 0, m;
    while ((m = re.exec(text))) {
      const start = m.index + m[1].length;
      out += esc(text.slice(last, start)) + '<b>' + esc(m[2]) + '</b>';
      last = start + m[2].length;
      re.lastIndex = last;
    }
    return out + esc(text.slice(last));
  }

  /* ══════════════════════════════════════
     INDEX — one entry per thing a search can land on
  ══════════════════════════════════════ */
  const items = [];
  function addItem(item) {
    item.lines = item.lines.filter(l => l.text).map(l => ({ ...l, words: wordsOf(l.text) }));
    item.titleWords = wordsOf(item.title);
    item.allWords = item.titleWords.concat(...item.lines.map(l => l.words));
    items.push(item);
  }

  /* Projects */
  (window.CASE_STUDIES || []).forEach(cs => {
    const tags = (cs.tags || []).map(t => (typeof t === 'string' ? { tag: t } : t));
    const lines = [];
    tags.forEach(t => lines.push({ text: t.proof || cs.tileBrief, slide: t.slide, tag: t.tag, tagWords: wordsOf(t.tag) }));
    lines.push({ text: cs.eyebrow }, { text: cs.tileBrief });
    /* slide numbers only line up when the designed pages mirror the data slides */
    const mirrored = !cs.slidePages || cs.slidePages.length === (cs.slides || []).length;
    (cs.slides || []).forEach((sl, i) => {
      const slide = mirrored ? i + 1 : undefined;
      (sl.blocks || []).forEach(b => {
        const push = text => lines.push({ text: plain(text), slide });
        if (b.html) push(b.html);
        if (b.type === 'skillTiles' || b.type === 'roleList') b.items.forEach(push);
        if (b.type === 'specGrid') b.items.forEach(it => push(it.k + ': ' + (it.v || it.icons.map(n => n[0].toUpperCase() + n.slice(1)).join(', '))));
        if (b.type === 'dashboardGroup') b.dashboards.forEach(d => d.items.forEach(it => push(it.num + ' ' + it.label.toLowerCase())));
        if (b.type === 'statTiles') b.items.forEach(it => push(it.num + ' ' + it.label.toLowerCase()));
        if (b.type === 'outcomeList') b.items.forEach(it => push(it.text));
        if (b.type === 'creativesGrid') b.items.forEach(it => push(it.caption));
        if (b.type === 'trophy') push(b.label + ' ' + b.sub);
      });
    });
    if (cs.post && cs.post.caption) cs.post.caption.split(/\n+|(?<=[.!?])\s+/).forEach(text => lines.push({ text: text.trim() }));

    const stat = cs.headline || (cs.tileResults && cs.tileResults[0] ? cs.tileResults[0].num + ' ' + cs.tileResults[0].label.toLowerCase() : '');
    addItem({
      kind: 'project', id: cs.id, title: cs.name, img: cs.logo,
      sub: [cs.eyebrow, stat].filter(Boolean).join(' · '),
      tags, lines,
      open: slide => csOpen(cs, (slide || 1) - 1),
    });
  });

  /* Reels (the viewer shows the first six) */
  if (typeof REELS !== 'undefined' && window.openReel) {
    REELS.slice(0, 6).forEach((r, i) => addItem({
      kind: 'reel', title: r.client, img: r.thumb, sub: r.caption,
      lines: [{ text: r.caption }, { text: (r.tags || []).join(' ') }, { text: r.credits }, { text: 'reel video', hidden: true }],
      open: () => window.openReel(i),
    }));
  }

  /* Skills, tools and certificates: read from the Skills story */
  if (typeof STORIES !== 'undefined') {
    const openStoryAt = (key, i) => { openStory(key); if (i) showStorySlide(i); };
    const addSkill = (title, sub, i) => addItem({
      kind: 'skill', title, sub, lines: [{ text: sub }], open: () => openStoryAt('skills', i),
    });
    (STORIES.skills || []).forEach((d, i) => {
      if (d.type === 'competencies') {
        addSkill(d.a, d.aItems.join(' · '), i);
        addSkill(d.b, d.bItems.join(' · '), i);
        return;
      }
      const el = buildSlide(d);
      el.querySelectorAll('.tool-card-s').forEach(c => addSkill(c.querySelector('strong').textContent, 'Tool · ' + c.querySelector('span').textContent, i));
      el.querySelectorAll('.cert-card-s strong').forEach(c => addSkill(c.textContent, 'Certification', i));
      el.querySelectorAll('.sbar-row > span:first-child').forEach(c => addSkill(c.textContent, 'Platform', i));
    });
    (STORIES.reviews || []).forEach((d, i) => addItem({
      kind: 'review', title: d.name + ' · ' + d.role, initials: d.av, sub: d.quote.replace(/^"|"$/g, ''),
      lines: [{ text: d.quote }, { text: 'review recommendation testimonial', hidden: true }],
      open: () => openStoryAt('reviews', i),
    }));
  }

  /* Chips: every tag used by a project, most used first, platforms last */
  const tagCounts = {};
  items.filter(it => it.kind === 'project').forEach(it => it.tags.forEach(t => {
    const key = slug(t.tag);
    tagCounts[key] = tagCounts[key] || { key, label: t.tag, count: 0 };
    tagCounts[key].count++;
  }));
  const isPlatform = c => PLATFORMS.includes(norm(c.label));
  const chips = Object.values(tagCounts).sort((a, b) => (isPlatform(a) - isPlatform(b)) || (b.count - a.count));

  /* ══════════════════════════════════════
     MATCHING
  ══════════════════════════════════════ */
  /* The typed query plus any alias readings of it, each as a list of words. */
  function readings(q) {
    const n = norm(q);
    const out = [n];
    Object.keys(ALIASES).forEach(k => {
      if (n === k || (n.length >= 2 && k.startsWith(n))) ALIASES[k].forEach(v => out.push(v));
      else if ((' ' + n + ' ').includes(' ' + k + ' ')) ALIASES[k].forEach(v => out.push((' ' + n + ' ').replace(' ' + k + ' ', ' ' + v + ' ').trim()));
    });
    return [...new Set(out)].map(r => r.split(' ').filter(Boolean)).filter(r => r.length);
  }
  const hits = (words, tokens) => tokens.filter(t => words.some(w => w.startsWith(t))).length;

  /* Best match of one item against one reading: score, the line to show, the slide to open. */
  function matchItem(item, tokens) {
    if (hits(item.allWords, tokens) < tokens.length) return null;
    const tagLine = item.lines.find(l => l.tagWords && hits(l.tagWords, tokens) === tokens.length);
    if (tagLine) return { score: 3, strong: true, line: tagLine, slide: tagLine.slide, tokens };
    const inTitle = hits(item.titleWords, tokens) === tokens.length;
    let best = null, bestHits = 0;
    let bestRank = 0;
    item.lines.forEach(l => {
      const h = hits(l.words, tokens);
      /* same number of matched words: prefer a full sentence over a one-word label */
      const rank = h * 2 + (l.text.length >= 25 && l.text.length <= 120 ? 1 : 0);
      if (h && rank > bestRank) { best = l; bestHits = h; bestRank = rank; }
    });
    if (inTitle) return { score: 2, strong: true, line: null, slide: undefined, tokens };
    return { score: 1, strong: bestHits === tokens.length, line: best, slide: best && best.slide, tokens };
  }

  function search(q) {
    const rs = readings(q);
    const found = [];
    items.forEach(item => {
      /* the words as typed win when they appear together; aliases are the fallback */
      let best = null;
      for (const tokens of rs) {
        const m = matchItem(item, tokens);
        if (!m) continue;
        if (m.strong) { best = m; break; }
        if (!best) best = m;
      }
      if (best) found.push({ item, ...best });
    });
    return found.sort((a, b) => b.score - a.score);
  }

  function byTag(key) {
    const out = [];
    items.forEach(item => {
      if (item.kind !== 'project') return;
      const line = item.lines.find(l => l.tag && slug(l.tag) === key);
      if (line) out.push({ item, line, slide: line.slide, tokens: [] });
    });
    return out;
  }

  /* ══════════════════════════════════════
     PANEL
  ══════════════════════════════════════ */
  const panel = document.createElement('aside');
  panel.className = 'search-panel';
  panel.id = 'searchPanel';
  panel.setAttribute('aria-label', 'Search');
  panel.inert = true;
  panel.innerHTML = `
    <div class="sp-head">
      <h2>Search</h2>
      <div class="sp-field-row">
        <label class="sp-field">
          ${ICONS.search}
          <input id="spInput" type="text" inputmode="search" enterkeyhint="search" placeholder="Search projects, brands, skills" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Search projects, brands, skills">
          <button class="sp-clear" type="button" aria-label="Clear search" hidden>${ICONS.clear}</button>
        </label>
        <button class="sp-cancel" type="button">Cancel</button>
      </div>
      <div class="sp-chips" role="group" aria-label="Filter by tag"></div>
    </div>
    <div class="sp-body" aria-live="polite"></div>`;
  document.body.appendChild(panel);

  const input = panel.querySelector('#spInput');
  const clearBtn = panel.querySelector('.sp-clear');
  const chipsEl = panel.querySelector('.sp-chips');
  const body = panel.querySelector('.sp-body');

  const state = { q: '', tag: null, chipsOpen: false };
  let shown = [];       // result rows currently on screen, in order
  let gridFilter = null; // { ids, label } while the Work grid is narrowed

  function renderChips() {
    const selectedHidden = chips.findIndex(c => c.key === state.tag) >= CHIPS_SHOWN;
    /* phones show every chip in one sideways-scrolling row, so no "More" there */
    const all = state.chipsOpen || selectedHidden || isMobile() || chips.length <= CHIPS_SHOWN + 1;
    const list = all ? chips : chips.slice(0, CHIPS_SHOWN);
    chipsEl.innerHTML = list.map(c =>
      `<button type="button" class="sp-chip${c.key === state.tag ? ' on' : ''}" data-tag="${c.key}" aria-pressed="${c.key === state.tag}">${esc(c.label)}</button>`).join('') +
      (all ? '' : '<button type="button" class="sp-chip sp-chip-more" data-more>More</button>');
  }

  const GROUPS = [
    ['project', 'Projects'], ['skill', 'Skills and tools'], ['reel', 'Reels'], ['review', 'Reviews'],
  ];

  function rowHtml(r, i) {
    const it = r.item;
    const avatar = it.img
      ? `<span class="sp-av sp-av-${it.kind}"><img src="${it.img}" alt="" loading="lazy"></span>`
      : `<span class="sp-av sp-av-${it.kind}">${it.initials ? esc(it.initials) : ICONS.skill}</span>`;
    let sub = r.line && !r.line.hidden ? highlight(r.line.text, r.tokens) : highlight(it.sub, r.tokens);
    /* matched through a tag whose proof line doesn't contain the typed word: name the tag */
    if (r.line && r.line.tag && r.tokens.length && !sub.includes('<b>')) sub = '<b>' + esc(r.line.tag) + '</b> · ' + sub;
    return `<button type="button" class="sp-row" data-i="${i}">${avatar}
      <span class="sp-text"><span class="sp-title">${highlight(it.title, r.tokens)}</span><span class="sp-sub">${sub}</span></span></button>`;
  }

  function render() {
    renderChips();
    clearBtn.hidden = !state.q;
    const active = state.q.trim() || state.tag;
    let results;
    if (state.tag) {
      const label = tagCounts[state.tag] ? tagCounts[state.tag].label : state.tag;
      results = byTag(state.tag).concat(search(label).filter(r => r.item.kind !== 'project'));
    } else if (state.q.trim()) {
      results = search(state.q);
    } else {
      results = items.filter(it => it.kind === 'project').map(item => ({ item, tokens: [] }));
    }

    shown = [];
    let html = '';
    GROUPS.forEach(([kind, heading]) => {
      const rows = results.filter(r => r.item.kind === kind);
      if (!rows.length) return;
      const action = kind !== 'project' ? ''
        : active ? '<button type="button" class="sp-link" data-act="grid">View in grid</button>'
                 : '<button type="button" class="sp-link" data-act="all">See all</button>';
      html += `<div class="sp-group-head"><h3>${heading}</h3>${action}</div>`;
      rows.forEach(r => { html += rowHtml(r, shown.length); shown.push(r); });
    });

    if (!shown.length) {
      html = `<div class="sp-empty"><p class="sp-empty-title">No results for “${esc(state.q.trim())}”</p>
        <p>That one isn't on here yet. Ask me about it.</p>
        <button type="button" class="ig-btn" data-act="ask">Ask me about it</button></div>`;
    } else if (active) {
      html += `<button type="button" class="sp-copy" data-act="copy">${ICONS.link}<span>Copy link to this search</span></button>`;
    }
    body.innerHTML = html;
    body.scrollTop = 0;
    syncUrl();
  }

  /* ── open / close ── */
  const isOpen = () => panel.classList.contains('open');
  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

  function openPanel(focus) {
    panel.inert = false;
    panel.classList.add('open');
    document.body.classList.add('search-open');
    setActiveNav('search');
    render();
    if (focus !== false && !isMobile()) setTimeout(() => input.focus(), 60);
  }
  function closePanel() {
    if (!isOpen()) return;
    if (panel.contains(document.activeElement)) document.activeElement.blur();
    panel.classList.remove('open');
    panel.inert = true;
    document.body.classList.remove('search-open');
    const tab = document.querySelector('.tab-btn.active');
    setActiveNav((tab && TAB_TO_NAV[tab.dataset.tab]) || 'work');
    syncUrl();
  }

  NAV_ACTIONS.search = () => (isOpen() ? closePanel() : openPanel());
  const goToWork = NAV_ACTIONS.work;
  NAV_ACTIONS.work = () => { clearGrid(); goToWork(); };

  /* ── the Work grid, narrowed to a search ("View in grid") ── */
  const grid = document.querySelector('.posts-grid');
  const gridBar = document.createElement('div');
  gridBar.className = 'grid-filter';
  gridBar.hidden = true;
  if (grid) grid.before(gridBar);

  function paintGrid() {
    if (!grid) return;
    gridBar.hidden = !gridFilter;
    Array.from(grid.children).forEach(tile => {
      tile.classList.toggle('grid-filtered-out', !!gridFilter && !gridFilter.ids.includes(tile.dataset.cs));
    });
    if (gridFilter) {
      gridBar.innerHTML = `<div><strong>${esc(gridFilter.label)}</strong><span>${countLabel(gridFilter.ids.length)}</span></div>
        <button type="button" class="ig-btn">Clear</button>`;
      gridBar.querySelector('button').addEventListener('click', () => { clearGrid(); syncUrl(); });
    }
  }
  function clearGrid() { gridFilter = null; paintGrid(); }
  function viewInGrid() {
    const ids = shown.filter(r => r.item.kind === 'project').map(r => r.item.id);
    const label = state.tag ? hashtag(tagCounts[state.tag].label) : '“' + state.q.trim() + '”';
    gridFilter = { ids, label, tag: state.tag, q: state.q.trim() };
    paintGrid();
    closePanel();
    showTab('grid');
  }

  /* ── shareable links ── */
  function currentSearch() {
    if (isOpen()) return state.tag ? { tag: state.tag } : state.q.trim() ? { q: state.q.trim() } : {};
    if (gridFilter) return gridFilter.tag ? { tag: gridFilter.tag, view: 'grid' } : { q: gridFilter.q, view: 'grid' };
    return {};
  }
  function searchUrl() {
    const url = new URL(location.href);
    ['tag', 'q', 'view'].forEach(k => url.searchParams.delete(k));
    Object.entries(currentSearch()).forEach(([k, v]) => url.searchParams.set(k, v));
    return url;
  }
  function syncUrl() {
    try { history.replaceState(null, '', searchUrl()); } catch (_) { /* file:// preview */ }
  }
  function copyLink() {
    const url = searchUrl().toString();
    const done = () => showToast('Link copied');
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, () => showToast('Copy the address from your browser'));
    else showToast('Copy the address from your browser');
  }

  /* ── analytics: what do visitors look for? (skipped while previewing locally) ── */
  function track(name, params) {
    if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:') return;
    if (typeof gtag === 'function') gtag('event', name, params);
  }
  let trackTimer;
  function trackTyping() {
    clearTimeout(trackTimer);
    const term = state.q.trim();
    if (term.length < 2) return;
    trackTimer = setTimeout(() => track('search', { search_term: term, results: shown.length }), 1200);
  }

  /* ── events ── */
  input.addEventListener('input', () => {
    state.q = input.value;
    state.tag = null;
    render();
    trackTyping();
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && shown.length) { e.preventDefault(); body.querySelector('.sp-row').click(); }
    if (e.key === 'ArrowDown') { const first = body.querySelector('.sp-row'); if (first) { e.preventDefault(); first.focus(); } }
  });
  body.addEventListener('keydown', e => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const rows = Array.from(body.querySelectorAll('.sp-row'));
    const i = rows.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const next = e.key === 'ArrowDown' ? rows[i + 1] : (rows[i - 1] || input);
    if (next) next.focus();
  });
  clearBtn.addEventListener('click', e => {
    e.preventDefault();
    state.q = input.value = '';
    render();
    input.focus();
  });
  panel.querySelector('.sp-cancel').addEventListener('click', closePanel);

  chipsEl.addEventListener('click', e => {
    const chip = e.target.closest('.sp-chip');
    if (!chip) return;
    if (chip.hasAttribute('data-more')) { state.chipsOpen = true; renderChips(); return; }
    state.tag = state.tag === chip.dataset.tag ? null : chip.dataset.tag;
    state.q = input.value = '';
    render();
    if (state.tag) track('search_tag', { tag: state.tag });
  });

  body.addEventListener('click', e => {
    const row = e.target.closest('.sp-row');
    if (row) {
      const r = shown[+row.dataset.i];
      track('select_content', { content_type: r.item.kind, item_id: r.item.title, search_term: state.tag || state.q.trim() });
      r.item.open(r.slide);
      return;
    }
    const act = e.target.closest('[data-act]');
    if (!act) return;
    if (act.dataset.act === 'grid') viewInGrid();
    if (act.dataset.act === 'all') { closePanel(); NAV_ACTIONS.work(); showTab('grid'); }
    if (act.dataset.act === 'copy') copyLink();
    if (act.dataset.act === 'ask') { track('search_no_results', { search_term: state.q.trim() }); openStory('contact'); }
  });

  /* Click anywhere else on the page closes the panel (viewers opened from it don't). */
  const KEEP_OPEN = '.search-panel, [data-nav="search"], .cs-overlay, .story-overlay, .reel-overlay, .post-overlay';
  document.addEventListener('click', e => {
    if (isOpen() && e.target.isConnected && !e.target.closest(KEEP_OPEN)) closePanel();
  });
  /* Escape closes the panel, unless a viewer is open on top of it. */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || !isOpen()) return;
    if (document.querySelector('.cs-overlay.open, .story-overlay.open, .reel-overlay.open, .post-overlay.open')) return;
    closePanel();
  }, true);

  /* ── arriving on a shared link ── */
  const params = new URLSearchParams(location.search);
  const startTag = params.get('tag') && tagCounts[slug(params.get('tag'))] ? slug(params.get('tag')) : null;
  const startQ = startTag ? '' : (params.get('q') || '').slice(0, 80);
  if (startTag || startQ) {
    state.tag = startTag;
    state.q = input.value = startQ;
    if (params.get('view') === 'grid') {
      document.addEventListener('DOMContentLoaded', () => {
        render();
        viewInGrid();
        syncUrl();
      });
    } else {
      openPanel(false);
    }
  }
})();
