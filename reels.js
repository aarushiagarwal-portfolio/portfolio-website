/* ══════════════════════════════════════
   REELS TAB
   Add or edit reels in the REELS list below. Each entry:
     kind:    'client' (client work) or 'mine' (your own content)
     client:  client name, shown on the tile badge for client work
     caption: short text shown on hover and in the viewer
     views:   optional, e.g. '1.2M'. Leave out if you don't want to show it
     color:   fallback background until a thumbnail is added
     thumb:   optional image path, e.g. 'assets/reels/mars-1.jpg' (square works best)
     video:   optional path to an .mp4 file in the project
     link:    optional URL to the reel (opens from the viewer)
══════════════════════════════════════ */
const REELS = [
  { kind: 'client', client: 'Client 1', caption: 'Placeholder caption', color: 'linear-gradient(160deg,#1a0808,#8B1A1A)' },
  { kind: 'client', client: 'Client 2', caption: 'Placeholder caption', color: 'linear-gradient(160deg,#080818,#1e40af)' },
  { kind: 'mine',                       caption: 'Placeholder caption', color: 'linear-gradient(160deg,#2a1505,#b45309)' },
  { kind: 'client', client: 'Client 3', caption: 'Placeholder caption', color: 'linear-gradient(160deg,#08180a,#166534)' },
  { kind: 'mine',                       caption: 'Placeholder caption', color: 'linear-gradient(160deg,#0c1a1a,#0f766e)' },
  { kind: 'client', client: 'Client 4', caption: 'Placeholder caption', color: 'linear-gradient(160deg,#180818,#7e22ce)' },
  { kind: 'client', client: 'Client 5', caption: 'Placeholder caption', color: 'linear-gradient(160deg,#180e04,#c2410c)' },
  { kind: 'mine',                       caption: 'Placeholder caption', color: 'linear-gradient(160deg,#1a0a14,#9d174d)' },
];

(function () {
  const grid = document.getElementById('reelsGrid');
  const overlay = document.getElementById('reelOverlay');
  if (!grid || !overlay) return;

  const media = document.getElementById('reelMedia');
  const meta = document.getElementById('reelMeta');
  const caption = document.getElementById('reelCaption');
  const link = document.getElementById('reelLink');
  const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  REELS.forEach(r => {
    const tile = document.createElement('button');
    tile.className = 'reel-tile';
    const badge = r.kind === 'mine' ? 'Mine' : r.client;
    tile.setAttribute('aria-label', (r.kind === 'mine' ? 'My reel' : 'Client reel: ' + r.client) + '. ' + r.caption);
    tile.innerHTML =
      (r.thumb
        ? '<img class="reel-thumb" src="' + r.thumb + '" alt="">'
        : '<div class="reel-thumb" style="background:' + r.color + '"></div>') +
      '<span class="reel-badge">' + badge + '</span>' +
      '<span class="reel-play">' + PLAY + '</span>' +
      '<span class="reel-info">' + (r.views ? '<span class="views">' + r.views + ' views</span>' : '') + r.caption + '</span>';
    tile.addEventListener('click', () => openReel(r));
    grid.appendChild(tile);
  });

  function openReel(r) {
    media.innerHTML = '';
    if (r.video) {
      const v = document.createElement('video');
      v.src = r.video;
      v.controls = true;
      v.playsInline = true;
      v.autoplay = true;
      media.appendChild(v);
    } else {
      const note = document.createElement('span');
      note.style.cssText = 'opacity:0.7;font-size:0.85rem;';
      note.textContent = 'Video goes here';
      media.appendChild(note);
    }
    meta.textContent = r.kind === 'mine' ? 'My reel' : 'Client work · ' + r.client;
    caption.textContent = r.caption;
    if (r.link) {
      link.href = r.link;
      link.hidden = false;
    } else {
      link.hidden = true;
    }
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closeReel() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    media.innerHTML = ''; // stops any playing video
  }

  overlay.querySelectorAll('[data-reel-close]').forEach(el => el.addEventListener('click', closeReel));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeReel();
  });
})();
