/* ══════════════════════════════════════
   WHAT'S NEW — the activity feed behind the heart icon.

   EVERYTHING YOU'D WANT TO EDIT IS IN WHATS_NEW BELOW.

   To add an update: copy one { ... } block inside the section it belongs
   to, paste it where it should appear (top = newest) and change:
     id      a short unique name, e.g. 'bath-guide'. The red dot on the
             heart shows on every new visit until the panel is opened.
     type    'work' | 'content' | 'review' | 'trend' | 'life'
             (decides which chip shows it; 'life' sits under Content)
     avatar  'me' for your photo, or initials like 'MA' for a reviewer
     text    the sentence. Wrap words in **two stars** to make them bold.
     thumb   the small square on the right, one of:
               'case:siemens'             that case study's logo
               'assets/whats-new/x.jpg'   a picture
               'play'                     black tile with a play triangle
     button  use instead of thumb to show a blue button, e.g. 'View'
     action  what a click does, one of:
               'case:siemens'   open that case study (the id from its file
                                in case-studies/)
               'review:5'       open the Reviews story on that review
                                (0 = the first review in script.js)
               'url:https://…'  open a link in a new tab
               'chat'           open Let's chat

   To move an update to another section, cut and paste its block.
   There are no dates: you decide what sits under each heading.
══════════════════════════════════════ */
const WHATS_NEW = {
  /* Optional pinned card above the sections. To bring it back, add:
     currently: { text: '…', sub: '…', button: 'Say hi', action: 'chat' }, */

  sections: [
    {
      title: 'This week',
      items: [
        {
          id: 'siemens-case', type: 'work', avatar: 'me',
          thumb: 'case:siemens', action: 'case:siemens',
          text: '**aarushiagarwal** shared a new case study: **Siemens**. **Pitched and won in 7 days** 🏆',
        },
        {
          id: 'dl-service', type: 'content', avatar: 'me',
          thumb: 'assets/whats-new/dl-service.jpg',
          action: 'url:https://www.tiktok.com/@aarushis.life/video/7706989627588005142',
          text: '**aarushiagarwal** posted a laptop-friendly café with **no time limit** ☕',
        },
      ],
    },
    {
      title: 'This month',
      items: [
        {
          id: 'rwe-case', type: 'work', avatar: 'me',
          thumb: 'case:rwe', action: 'case:rwe',
          text: '**aarushiagarwal** shared RWE: **37M+ impressions** across **15 countries** 🌍',
        },
        {
          id: 'review-mandy', type: 'review', avatar: 'MA',
          button: 'View', action: 'review:5',
          text: '**Mandy A.** left a review: “Bridges strategy and execution seamlessly.”',
        },
        {
          id: 'kinda-chic', type: 'trend', avatar: 'me',
          thumb: 'assets/whats-new/kinda-chic.jpg',
          action: 'url:https://www.tiktok.com/@aarushis.life/video/7680148054225227030',
          text: '**aarushiagarwal** hopped on the “**Kinda chic**” trend 💕',
        },
        {
          id: 'manchester', type: 'content', avatar: 'me',
          thumb: 'assets/whats-new/manchester.jpg',
          action: 'url:https://www.tiktok.com/@aarushis.life/video/7679504066296204547',
          text: '**aarushiagarwal** posted a day in Manchester, her most-watched video so far 🚉',
        },
      ],
    },
    {
      title: 'Earlier',
      items: [
        {
          id: 'adidas-case', type: 'work', avatar: 'me',
          thumb: 'case:adidas', action: 'case:adidas',
          text: '**aarushiagarwal** shared adidas: **63.4K applications** 🎯',
        },
        {
          id: 'review-natasha', type: 'review', avatar: 'NN',
          button: 'View', action: 'review:0',
          text: '**Natasha N.** left a review: “Always brings fresh ideas.”',
        },
        {
          id: 'tiktok-launch', type: 'life', avatar: 'me',
          thumb: 'play', action: 'url:https://www.tiktok.com/@aarushis.life',
          text: '**aarushiagarwal** launched **@aarushis.life** on TikTok 🎬',
        },
      ],
    },
  ],
};

/* ══════════════════════════════════════
   PANEL — same shell and behaviour as the Search panel (search.js)
══════════════════════════════════════ */
(function () {
  const CHIPS = [
    { key: 'all', label: 'All', types: null },
    { key: 'work', label: 'Work', types: ['work'] },
    { key: 'content', label: 'Content', types: ['content', 'life'] },
    { key: 'reviews', label: 'Reviews', types: ['review'] },
    { key: 'trends', label: 'Trends', types: ['trend'] },
  ];
  const SEEN_KEY = 'wn-seen';
  const ME_PHOTO = 'aarushi-cropped.jpg';
  const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';
  const BACK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const rich = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'); // **bold**
  const findCase = id => (window.CASE_STUDIES || []).find(c => c.id === id);

  const allItems = WHATS_NEW.sections.flatMap(s => s.items);
  const newestId = allItems.length ? allItems[0].id : '';

  /* ── actions ── */
  function run(action) {
    const [kind, ...rest] = String(action || '').split(':');
    const value = rest.join(':');
    if (kind === 'case') { const cs = findCase(value); if (cs) csOpen(cs); }
    else if (kind === 'review') openStory('reviews', +value || 0);
    else if (kind === 'url') window.open(value, '_blank', 'noopener');
    else if (kind === 'chat') NAV_ACTIONS.chat();
  }

  /* ── markup ── */
  function avatarHtml(a) {
    return a === 'me'
      ? `<span class="wn-av"><img src="${ME_PHOTO}" alt=""></span>`
      : `<span class="wn-av wn-av-initials" aria-hidden="true">${esc(a)}</span>`;
  }
  function thumbHtml(t) {
    if (t === 'play') return `<span class="wn-thumb wn-thumb-play">${PLAY}</span>`;
    if (t.startsWith('case:')) {
      const cs = findCase(t.slice(5));
      return cs ? `<span class="wn-thumb"><img src="${cs.logo}" alt="" loading="lazy"></span>` : '';
    }
    return `<span class="wn-thumb"><img src="${esc(t)}" alt="" loading="lazy"></span>`;
  }
  function rowHtml(it) {
    const text = `<span class="wn-text">${rich(it.text)}</span>`;
    if (it.button) {
      return `<div class="wn-row wn-row-btn" data-id="${it.id}" data-type="${it.type}">${avatarHtml(it.avatar)}${text}
        <button type="button" class="wn-btn">${esc(it.button)}</button></div>`;
    }
    return `<button type="button" class="wn-row" data-id="${it.id}" data-type="${it.type}">${avatarHtml(it.avatar)}${text}${it.thumb ? thumbHtml(it.thumb) : ''}</button>`;
  }

  const cur = WHATS_NEW.currently;
  const panel = document.createElement('aside');
  panel.className = 'wn-panel';
  panel.id = 'whatsNewPanel';
  panel.setAttribute('aria-label', "What's new");
  panel.inert = true;
  panel.innerHTML = `
    <div class="wn-head">
      <div class="wn-title-row">
        <button type="button" class="wn-back" aria-label="Close">${BACK}</button>
        <h2>What's new</h2>
      </div>
      <div class="wn-chips" role="group" aria-label="Filter updates">
        ${CHIPS.map(c => `<button type="button" class="sp-chip${c.key === 'all' ? ' on' : ''}" data-chip="${c.key}" aria-pressed="${c.key === 'all'}">${c.label}</button>`).join('')}
      </div>
    </div>
    <div class="wn-body">
      ${cur ? `<div class="wn-current">
        <p class="wn-current-text">${rich(cur.text)}</p>
        ${cur.sub ? `<p class="wn-current-sub">${rich(cur.sub)}</p>` : ''}
        ${cur.button ? `<button type="button" class="wn-btn" data-current>${esc(cur.button)}</button>` : ''}
      </div>` : ''}
      ${WHATS_NEW.sections.map(s => `<section class="wn-section">
        <h3>${esc(s.title)}</h3>
        ${s.items.map(rowHtml).join('')}
      </section>`).join('')}
    </div>`;
  document.body.appendChild(panel);
  const body = panel.querySelector('.wn-body');

  /* ── chips ── */
  function applyChip(key) {
    const chip = CHIPS.find(c => c.key === key) || CHIPS[0];
    panel.querySelectorAll('[data-chip]').forEach(b => {
      const on = b.dataset.chip === chip.key;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on);
    });
    panel.querySelectorAll('.wn-section').forEach(sec => {
      let visible = 0;
      sec.querySelectorAll('.wn-row').forEach(row => {
        const show = !chip.types || chip.types.includes(row.dataset.type);
        row.hidden = !show;
        if (show) visible++;
      });
      sec.hidden = !visible;
    });
    body.scrollTop = 0;
  }
  panel.querySelector('.wn-chips').addEventListener('click', e => {
    const chip = e.target.closest('[data-chip]');
    if (chip) applyChip(chip.dataset.chip);
  });

  /* ── rows ── */
  body.addEventListener('click', e => {
    if (e.target.closest('[data-current]')) { run(cur.action); return; }
    const row = e.target.closest('.wn-row');
    if (!row) return;
    const item = allItems.find(it => it.id === row.dataset.id);
    if (item) run(item.action);
  });

  /* ── red dot on the heart ──
     Shows on every new visit and clears once the panel is opened. It stays
     cleared for the rest of that visit (sessionStorage), then returns the
     next time someone comes to the site. ── */
  const hearts = document.querySelectorAll('[data-nav="whats-new"]');
  hearts.forEach(h => {
    const icon = h.querySelector('svg');
    if (!icon) return;
    const wrap = document.createElement('i'); // not a <span>: nav labels are spans and get hidden on tablet
    wrap.className = 'wn-ico';
    icon.replaceWith(wrap);
    wrap.appendChild(icon);
  });
  let seenThisVisit = false;
  function hasUnseen() {
    if (seenThisVisit || !newestId) return false;
    try { return sessionStorage.getItem(SEEN_KEY) !== newestId; } catch (_) { return true; }
  }
  function paintDot() {
    const unseen = hasUnseen();
    hearts.forEach(h => h.classList.toggle('wn-unseen', unseen));
  }
  function markSeen() {
    seenThisVisit = true;
    try { sessionStorage.setItem(SEEN_KEY, newestId); } catch (_) { /* storage blocked: dot stays off until the page reloads */ }
    paintDot();
  }
  paintDot();

  /* ── open / close ── */
  const isOpen = () => panel.classList.contains('open');
  const searchOpen = () => !!document.querySelector('.search-panel.open');

  function openPanel() {
    if (searchOpen()) NAV_ACTIONS.search(); // one panel at a time
    panel.inert = false;
    panel.classList.add('open');
    setActiveNav('whats-new');
    markSeen();
  }
  function closePanel() {
    if (!isOpen()) return;
    if (panel.contains(document.activeElement)) document.activeElement.blur();
    panel.classList.remove('open');
    panel.inert = true;
    /* hand the bold nav item back: to Search if it just opened, else to the current tab */
    const tab = document.querySelector('.tab-btn.active');
    setActiveNav(searchOpen() ? 'search' : (tab && TAB_TO_NAV[tab.dataset.tab]) || 'work');
  }

  NAV_ACTIONS['whats-new'] = () => (isOpen() ? closePanel() : openPanel());
  panel.querySelector('.wn-back').addEventListener('click', closePanel);

  /* Click anywhere else on the page closes the panel (viewers opened from it don't). */
  const KEEP_OPEN = '.wn-panel, [data-nav="whats-new"], .cs-overlay, .story-overlay, .reel-overlay, .post-overlay';
  document.addEventListener('click', e => {
    if (isOpen() && e.target.isConnected && !e.target.closest(KEEP_OPEN)) closePanel();
  });
  /* Escape closes the panel, unless a viewer is open on top of it. */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || !isOpen()) return;
    if (document.querySelector('.cs-overlay.open, .story-overlay.open, .reel-overlay.open, .post-overlay.open')) return;
    closePanel();
  }, true);
})();
