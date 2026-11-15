/* ══════════════════════════════════════
   LET'S CHAT — the contact panel behind the chat icon.
   Design: option E "The note" from the design canvas. A note bubble sits
   above your photo (like Instagram Notes) with two links underneath.

   EVERYTHING YOU'D WANT TO EDIT IS IN CHAT BELOW.
══════════════════════════════════════ */
const CHAT = {
  note:     "Always up for a chat about social strategy, campaigns, or what's next.",
  name:     'Aarushi Agarwal',
  role:     'Social Media and Content Specialist',
  photo:    'aarushi-avatar.jpg',
  email:    'aarushiag126@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aarushi-agarwal126/',
  footer:   'Usually replies within a day',
};

/* ══════════════════════════════════════
   PANEL — same shell and behaviour as What's new (whats-new.js)
══════════════════════════════════════ */
(function () {
  const ic = (path, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${path}</svg>`;
  const MAIL = ic('<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6.5L21 7"/>');
  const COPY = ic('<rect x="8.5" y="8.5" width="12" height="12" rx="2.5"/><path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5"/>');
  const ARROW = ic('<path d="M7 17 17 7M9 7h8v8"/>');
  const LIN = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>';
  const BACK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const panel = document.createElement('aside');
  panel.className = 'chat-panel';
  panel.id = 'chatPanel';
  panel.setAttribute('aria-label', "Let's chat");
  panel.inert = true;
  panel.innerHTML = `
    <div class="chat-head">
      <button type="button" class="chat-back" aria-label="Close">${BACK}</button>
      <h2>Let's chat</h2>
    </div>
    <div class="chat-body">
      <div class="chat-me">
        <p class="chat-note">${esc(CHAT.note)}</p>
        <span class="chat-ring"><img src="${esc(CHAT.photo)}" alt="" width="134" height="134" loading="lazy" decoding="async"></span>
        <p class="chat-name">${esc(CHAT.name)}</p>
        <p class="chat-role">${esc(CHAT.role)}</p>
      </div>
      <div class="chat-links">
        <div class="chat-row">
          <a class="chat-link" href="mailto:${esc(CHAT.email)}">
            <span class="chat-ico">${MAIL}</span><span class="chat-val">${esc(CHAT.email)}</span>
          </a>
          <button type="button" class="chat-end chat-copy" aria-label="Copy email address">${COPY}</button>
        </div>
        <div class="chat-row">
          <a class="chat-link" href="${esc(CHAT.linkedin)}" target="_blank" rel="noopener">
            <span class="chat-ico chat-ico-li">${LIN}</span><span class="chat-val">LinkedIn</span>
            <span class="chat-end" aria-hidden="true">${ARROW}</span>
          </a>
        </div>
      </div>
      <p class="chat-foot">${esc(CHAT.footer)}</p>
    </div>`;
  document.body.appendChild(panel);

  panel.querySelector('.chat-copy').addEventListener('click', () => {
    const done = () => showToast('Email copied');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(CHAT.email).then(done, () => showToast(CHAT.email));
    } else {
      showToast(CHAT.email);
    }
  });

  /* ── open / close ── */
  const isOpen = () => panel.classList.contains('open');
  const otherOpen = sel => !!document.querySelector(sel);

  function openPanel() {
    /* one panel at a time */
    if (otherOpen('.search-panel.open')) NAV_ACTIONS.search();
    if (otherOpen('.wn-panel.open')) NAV_ACTIONS['whats-new']();
    panel.inert = false;
    panel.classList.add('open');
    setActiveNav('chat');
  }
  function closePanel() {
    if (!isOpen()) return;
    if (panel.contains(document.activeElement)) document.activeElement.blur();
    panel.classList.remove('open');
    panel.inert = true;
    /* hand the bold nav item back: to a panel that just opened, else to the current tab */
    const tab = document.querySelector('.tab-btn.active');
    setActiveNav(otherOpen('.search-panel.open') ? 'search'
      : otherOpen('.wn-panel.open') ? 'whats-new'
      : (tab && TAB_TO_NAV[tab.dataset.tab]) || 'work');
  }

  NAV_ACTIONS.chat = () => (isOpen() ? closePanel() : openPanel());
  window.openChat = openPanel;
  panel.querySelector('.chat-back').addEventListener('click', closePanel);

  /* Click anywhere else on the page closes the panel. */
  const KEEP_OPEN = '.chat-panel, [data-nav="chat"], #hireBtn, #piHire, .wn-panel, .cs-overlay, .story-overlay, .reel-overlay, .post-overlay';
  document.addEventListener('click', e => {
    if (isOpen() && e.target.isConnected && !e.target.closest(KEEP_OPEN)) closePanel();
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || !isOpen()) return;
    if (document.querySelector('.cs-overlay.open, .story-overlay.open, .reel-overlay.open, .post-overlay.open')) return;
    closePanel();
  }, true);
})();
