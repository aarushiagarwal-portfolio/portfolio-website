/* ══════════════════════════════════════
   ABOUT ME — a page of "folders", like Instagram's Saved collections.
   It opens from the About me item in the sidebar, the phone bottom bar and
   the footer, and lives at #about (a folder is #about/<slug>).

   EVERYTHING YOU'D WANT TO EDIT IS IN THE ABOUT LIST BELOW.

   Text in [square brackets] is a placeholder waiting for your real details:
   search this file for "[" to find every one.

   HOW TO…
   • Change the intro: edit `intro`. Use \n for a line break.
   • Edit an item: change its `title`, `caption` or `image`. Captions can use
     \n for a line break.
   • Add an item: copy one { … } line inside a folder's `items` and edit it.
   • Remove an item: delete its { … } line.
   • Reorder items: move the lines up or down. The first four make the
     folder's cover on the About me page.
   • Swap an image: save your photo over the placeholder with the same file
     name (for example assets/about/my-story-1.jpg). Any shape works, it is
     cropped to a square in the grid. Or point `image` at a different file.
   • Link a reel: add `reel: '<TikTok video ID>'` to an item, using the number
     at the end of that reel's link in reels.js. The item then gets a play
     badge and a "Watch the reel" button. Delete the `reel` part to unlink it.
   • Add a folder: copy a whole folder block { name: … items: [ … ] } inside
     `folders` and edit it. Give it a new `slug` (lower-case words joined by
     hyphens: it becomes the web address). It appears everywhere by itself,
     Search included.
     `count` is the word used under the folder name ("6 places"): give the
     singular and the plural. Leave it out for "photo / photos".
     `keywords` are extra words Search should find the folder by.
══════════════════════════════════════ */
const ABOUT = {
  name: 'Aarushi Agarwal',
  tagline: 'London · Social Media Specialist & Content Creator',
  photo: 'aarushi-avatar.jpg',

  intro: "Hi, I'm Aarushi. I work in social media by day and make TikToks about London cafés and spots the rest of the time (@aarushis.life).\nI got into this because [what pulled you into social media]. These days I'm happiest when [what you love most about the work].\nHave a look around. This is the less polished, more me side of things.",

  folders: [
    {
      name: 'My story',
      slug: 'my-story',
      description: 'How I got here, in five short chapters.',
      count: ['chapter', 'chapters'],
      keywords: 'background journey career history story bio',
      items: [
        { title: 'Where it started', image: 'assets/about/my-story-1.jpg',
          caption: 'I grew up in [city] and fell into social media when [moment].\n[One line about what hooked you.]' },
        { title: 'First job in social', image: 'assets/about/my-story-2.jpg',
          caption: 'My first role was [role] at [company]. It taught me [the biggest lesson].' },
        { title: 'Moving to London', image: 'assets/about/my-story-3.jpg',
          caption: 'I moved to London in [year] for [reason].\n[How it felt, in a sentence.]' },
        { title: 'What I do now', image: 'assets/about/my-story-4.jpg',
          caption: 'Right now I [what you do day to day]. The part I love most is [favourite part].' },
        { title: "What's next", image: 'assets/about/my-story-5.jpg',
          caption: "Next, I'd love to [goal]. If that sounds like your team, say hi." },
      ],
    },
    {
      name: 'Off the clock',
      slug: 'off-the-clock',
      description: 'What I get up to when the laptop is shut.',
      count: ['photo', 'photos'],
      keywords: 'hobbies interests free time weekend fun personal',
      items: [
        { title: 'Café hunting', image: 'assets/about/off-the-clock-1.jpg',
          caption: "I'm always looking for the next good café to work from. My order is [your usual order]." },
        { title: 'Making content', image: 'assets/about/off-the-clock-2.jpg',
          caption: 'I film and edit my own TikToks for @aarushis.life.\n[What you enjoy most about making them.]' },
        { title: 'Photography', image: 'assets/about/off-the-clock-3.jpg',
          caption: '[What you like to shoot, and what you shoot it on.]' },
        { title: 'Travel', image: 'assets/about/off-the-clock-4.jpg',
          caption: '[Favourite trip so far, and where you want to go next.]' },
        { title: '[Hobby]', image: 'assets/about/off-the-clock-5.jpg',
          caption: '[A sentence or two about this hobby.]' },
        { title: '[Hobby]', image: 'assets/about/off-the-clock-6.jpg',
          caption: '[A sentence or two about this hobby.]' },
      ],
    },
    {
      name: 'My London',
      slug: 'my-london',
      description: 'Favourite places, most of them tried and filmed.',
      count: ['place', 'places'],
      keywords: 'london places cafes cafés coffee spots favourites recommendations',
      items: [
        { title: 'Frequency', image: 'assets/reels/frequency.jpg', reel: '7708116464749841686',
          caption: 'A laptop-friendly café in Angel.\n[Why I love it]' },
        { title: 'DL/Service', image: 'assets/reels/dl-service.jpg', reel: '7706989627588005142',
          caption: 'A calm café in Marylebone.\n[Why I love it]' },
        { title: 'WatchHouse', image: 'assets/reels/watchhouse.jpg', reel: '7696943096956751136',
          caption: 'Coffee on Hanover Square in Mayfair.\n[Why I love it]' },
        { title: 'Roxy Ballroom', image: 'assets/reels/roxy-ballroom.jpg', reel: '7689897141002685728',
          caption: 'A games bar in Holborn.\n[Why I love it]' },
        { title: 'Frothee', image: 'assets/reels/frothee.jpg', reel: '7687279952747580704',
          caption: "A coffee stop in King's Cross.\n[Why I love it]" },
        { title: 'Manchester', image: 'assets/reels/manchester.jpg', reel: '7679504066296204547',
          caption: 'Not London, but a day trip I loved.\n[Why I love it]' },
        { title: '[Place]', image: 'assets/about/my-london-extra-1.jpg',
          caption: '[Where it is, and why I love it]' },
        { title: '[Place]', image: 'assets/about/my-london-extra-2.jpg',
          caption: '[Where it is, and why I love it]' },
      ],
    },
  ],
};

/* ══════════════════════════════════════
   PAGE — you shouldn't need to edit below this line
══════════════════════════════════════ */
/* Set to false to keep the page off the site (About me then opens the About
   story, and Search leaves the folders out) until the placeholders are filled. */
const ABOUT_LIVE = true;

(function () {
  const main = document.querySelector('.ig-page');
  if (!ABOUT_LIVE || !main || !ABOUT.folders.length) return;

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const folders = ABOUT.folders;
  const countText = f => {
    const [one, many] = f.count || ['photo', 'photos'];
    return f.items.length + ' ' + (f.items.length === 1 ? one : many);
  };
  const ICON = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
    reel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><path d="M2.5 8h19M9 2.5 11.5 8M14.5 2.5 17 8"/><path d="m10 11.5 4.5 2.75L10 17z" fill="currentColor"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  };

  /* Which of my reels (if any) an item links to: its place in the Reels viewer, or -1. */
  function reelIndex(id) {
    if (!id || typeof REELS === 'undefined' || !window.openReel) return -1;
    if (typeof COMING_SOON_TABS !== 'undefined' && COMING_SOON_TABS.includes('reels')) return -1;
    return REELS.slice(0, 6).findIndex(r => r.link.endsWith('/' + id));
  }

  /* A folder cover: the first four images as a 2x2 mosaic */
  function coverHtml(f) {
    let cells = '';
    for (let i = 0; i < 4; i++) {
      const it = f.items[i];
      cells += it ? '<img src="' + esc(it.image) + '" alt="" loading="lazy" decoding="async" width="200" height="200">' : '<i></i>';
    }
    return cells;
  }

  /* ── the two pages ── */
  function rootHtml() {
    return '<header class="ab-head">' +
        '<img class="ab-photo" src="' + esc(ABOUT.photo) + '" alt="" width="77" height="77" decoding="async">' +
        '<div><h1 class="ab-name">' + esc(ABOUT.name) + '</h1><p class="ab-tagline">' + esc(ABOUT.tagline) + '</p></div>' +
      '</header>' +
      '<p class="ab-intro">' + esc(ABOUT.intro) + '</p>' +
      '<nav class="ab-folders" aria-label="Folders">' +
        folders.map(f =>
          '<a class="ab-folder" href="#about/' + esc(f.slug) + '">' +
            '<span class="ab-cover">' + coverHtml(f) + '</span>' +
            '<span class="ab-folder-name">' + esc(f.name) + '</span>' +
            '<span class="ab-folder-count">' + esc(countText(f)) + '</span>' +
          '</a>').join('') +
      '</nav>';
  }

  function folderHtml(f) {
    const next = folders[(folders.indexOf(f) + 1) % folders.length];
    return '<div class="ab-bar">' +
        '<a class="icon-btn ab-back" href="#about" aria-label="Back to About me">' + ICON.back + '</a>' +
        '<div class="ab-bar-text"><h1>' + esc(f.name) + '</h1><span>' + esc(countText(f)) + '</span></div>' +
      '</div>' +
      '<p class="ab-desc">' + esc(f.description || '') + '</p>' +
      '<nav class="ab-pills" aria-label="Folders">' +
        folders.map(o =>
          '<a class="sp-chip' + (o === f ? ' on' : '') + '" href="#about/' + esc(o.slug) + '"' + (o === f ? ' aria-current="page"' : '') + '>' + esc(o.name) + '</a>').join('') +
      '</nav>' +
      '<div class="ab-grid">' +
        f.items.map((it, i) =>
          '<button type="button" class="ab-tile" data-i="' + i + '" aria-label="' + esc(it.title) + (reelIndex(it.reel) >= 0 ? ', has a reel' : '') + '. Open">' +
            '<img src="' + esc(it.image) + '" alt="" loading="lazy" decoding="async" width="400" height="400">' +
            (reelIndex(it.reel) >= 0 ? '<span class="ab-badge">' + ICON.reel + '</span>' : '') +
          '</button>').join('') +
      '</div>' +
      '<div class="ab-end">' +
        '<a class="ab-all" href="#about">Back to all folders</a>' +
        (folders.length > 1
          ? '<a class="ab-next" href="#about/' + esc(next.slug) + '">' +
              '<span class="ab-cover ab-cover-mini">' + coverHtml(next) + '</span>' +
              '<span class="ab-next-text"><span>Next</span><strong>' + esc(next.name) + '</strong></span>' + ICON.next +
            '</a>'
          : '') +
      '</div>';
  }

  /* ── the page container (sits in the main area, in place of the profile) ── */
  const view = document.createElement('div');
  view.className = 'about-view';
  view.id = 'aboutView';
  view.hidden = true;
  main.insertBefore(view, main.querySelector('.site-footer'));

  /* ── item viewer (same shell as the reel viewer; "open" class = shared scroll lock + focus) ── */
  const viewer = document.createElement('div');
  viewer.className = 'about-viewer';
  viewer.id = 'aboutViewer';
  viewer.setAttribute('aria-hidden', 'true');
  viewer.inert = true;
  viewer.innerHTML =
    '<div class="av-backdrop" data-av-close></div>' +
    '<button type="button" class="reel-close" data-av-close aria-label="Close">' + ICON.close + '</button>' +
    '<button type="button" class="reel-nav reel-prev" id="avPrev" aria-label="Previous">' + ICON.left + '</button>' +
    '<button type="button" class="reel-nav reel-next" id="avNext" aria-label="Next">' + ICON.right + '</button>' +
    '<div class="av-modal" role="dialog" aria-modal="true" aria-labelledby="avTitle" tabindex="-1">' +
      '<div class="av-media"><img id="avImg" alt="" decoding="async"></div>' +
      '<div class="av-side">' +
        '<div class="av-head">' +
          '<img src="' + esc(ABOUT.photo) + '" alt="" width="32" height="32" loading="lazy" decoding="async">' +
          '<div><strong>' + esc(ABOUT.name) + '</strong><span id="avWhere"></span></div>' +
        '</div>' +
        '<div class="av-body"><h2 id="avTitle"></h2><p class="av-caption" id="avCaption"></p></div>' +
        '<div class="av-foot" id="avFoot" hidden><button type="button" class="ab-btn" id="avReel">' + ICON.play + 'Watch the reel</button></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(viewer);

  const avImg = viewer.querySelector('#avImg');
  const avPrev = viewer.querySelector('#avPrev');
  const avNext = viewer.querySelector('#avNext');
  const avMedia = viewer.querySelector('.av-media');
  let folder = null;   // folder on screen (null on the About me page and on the profile)
  let itemIdx = 0;

  const viewerOpen = () => viewer.classList.contains('open');

  function showItem() {
    const it = folder.items[itemIdx];
    avImg.src = it.image;
    viewer.querySelector('#avTitle').textContent = it.title;
    viewer.querySelector('#avCaption').textContent = it.caption || '';
    viewer.querySelector('#avWhere').textContent = folder.name + ' · ' + (itemIdx + 1) + ' of ' + folder.items.length;
    viewer.querySelector('#avFoot').hidden = reelIndex(it.reel) < 0;
    viewer.querySelector('.av-body').scrollTop = 0;
    avPrev.hidden = itemIdx === 0;
    avNext.hidden = itemIdx === folder.items.length - 1;
  }
  function openItem(i) {
    if (!folder || !folder.items[i]) return;
    itemIdx = i;
    showItem();
    viewer.inert = false;
    viewer.setAttribute('aria-hidden', 'false');
    viewer.classList.add('open');
  }
  function closeItem() {
    if (!viewerOpen()) return;
    viewer.classList.remove('open');
    viewer.setAttribute('aria-hidden', 'true');
    viewer.inert = true;
  }
  function stepItem(d) {
    const n = itemIdx + d;
    if (!folder || n < 0 || n >= folder.items.length) return;
    itemIdx = n;
    showItem();
    const modal = viewer.querySelector('.av-modal');
    if (document.activeElement && document.activeElement.hidden) modal.focus({ preventScroll: true });
  }

  viewer.querySelectorAll('[data-av-close]').forEach(el => el.addEventListener('click', closeItem));
  avPrev.addEventListener('click', () => stepItem(-1));
  avNext.addEventListener('click', () => stepItem(1));
  viewer.querySelector('#avReel').addEventListener('click', () => {
    const i = reelIndex(folder.items[itemIdx].reel);
    if (i >= 0) window.openReel(i);
  });
  view.addEventListener('click', e => {
    const tile = e.target.closest('.ab-tile');
    if (tile) openItem(+tile.dataset.i);
  });

  /* touch: swipe left / right on the picture */
  let touch = null;
  avMedia.addEventListener('touchstart', e => {
    touch = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
  }, { passive: true });
  avMedia.addEventListener('touchend', e => {
    if (!touch) return;
    const dx = e.changedTouches[0].clientX - touch.x, dy = e.changedTouches[0].clientY - touch.y;
    touch = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    stepItem(dx < 0 ? 1 : -1);
  }, { passive: true });

  /* ── routing: #about and #about/<slug> ── */
  let aboutOn = false;
  let profileY = 0;    // where the profile was scrolled to, to put it back afterwards

  function readHash() {
    let h = location.hash.slice(1);
    try { h = decodeURIComponent(h); } catch (_) { /* keep as typed */ }
    if (h === 'about' || h === 'about/') return { on: true, folder: null };
    if (h.startsWith('about/')) {
      const f = folders.find(o => o.slug === h.slice(6).replace(/\/$/, ''));
      return { on: true, folder: f || null, unknown: !f };
    }
    return { on: false, folder: null };
  }

  function route() {
    const r = readHash();
    if (r.unknown) { history.replaceState(null, '', '#about'); }
    closeItem();
    const wasOn = aboutOn;
    if (r.on && !wasOn) profileY = window.scrollY;
    aboutOn = r.on;
    folder = r.folder;
    document.body.classList.toggle('about-on', aboutOn);
    view.hidden = !aboutOn;
    view.classList.toggle('about-folder', !!folder);
    view.innerHTML = aboutOn ? (folder ? folderHtml(folder) : rootHtml()) : '';
    if (aboutOn) {
      setActiveNav('about');
      jumpTo(0);
    } else if (wasOn) {
      const tab = document.querySelector('.tab-btn.active');
      setActiveNav((tab && TAB_TO_NAV[tab.dataset.tab]) || 'work');
      jumpTo(profileY);
    }
  }

  /* Leave the About page for the profile (Home, Reels, "View in grid" and so on). */
  function leaveAbout() {
    if (!aboutOn) return;
    history.pushState(null, '', location.pathname + location.search);
    profileY = 0;
    route();
  }
  window.openAbout = slug => { location.hash = slug ? 'about/' + slug : 'about'; };

  window.addEventListener('hashchange', route);

  /* While the About page is showing, "About me" stays the bold item in the sidebar. */
  const baseActiveNav = setActiveNav;
  window.setActiveNav = key => baseActiveNav(aboutOn && (key === 'work' || key === 'reels') ? 'about' : key);

  /* Esc and the arrow keys. Capture phase, so a reel opened on top of the item viewer closes first. */
  document.addEventListener('keydown', e => {
    if (!aboutOn) return;
    if (viewerOpen()) {
      if (document.querySelector('.reel-overlay.open')) return;
      if (e.key === 'Escape') closeItem();
      else if (e.key === 'ArrowRight') stepItem(1);
      else if (e.key === 'ArrowLeft') stepItem(-1);
      return;
    }
    if (e.key === 'Escape' && folder && !document.querySelector(OPEN_LAYERS)) location.hash = 'about';
  }, true);

  document.addEventListener('DOMContentLoaded', () => {
    /* Home, Reels and anything that shows a tab bring the profile back first.
       (Done here because search.js replaces NAV_ACTIONS.work while it loads.) */
    ['work', 'reels'].forEach(k => {
      const go = NAV_ACTIONS[k];
      NAV_ACTIONS[k] = () => { leaveAbout(); go(); };
    });
    const baseShowTab = showTab;
    window.showTab = name => { leaveAbout(); baseShowTab(name); };
    route();   // a page opened directly on #about or #about/<slug>
  });
})();
