/* ══════════════════════════════════════
   REELS TAB
   A 3-column grid of 9:16 tiles that opens an Instagram-style reel viewer.
   Add or edit reels in the REELS list below (the grid shows the first 6). Each entry:
     client:   brand name, shown in the viewer header and on hover
     caption:  caption text shown in the viewer
     tags:     hashtags shown under the caption (without the #)
     thumb:    cover image path (9:16 works best)
     link:     URL of the reel on Instagram (the play button opens it)
     video:    optional path to an .mp4 in the project; plays inline instead of linking out
     views:    optional, e.g. '1.2M'; shown on the tile and in the viewer
     credits:  optional, what you did on it, e.g. 'Concept · Script · Edit'
══════════════════════════════════════ */
const REELS = [
  { client: 'RWE', caption: 'Friendship Day at RWE, told by the people who work there.', tags: ['AlwaysOnSocial', 'RWE', 'FriendshipDay'],
    thumb: 'assets/case-studies/rwe/creative-1.jpeg', link: 'https://www.instagram.com/rwe.global/reel/DMvAqnPKb-A/' },
  { client: 'RWE', caption: '"This is us": RWE\'s team on the trend.', tags: ['AlwaysOnSocial', 'RWE', 'ThisIsUs'],
    thumb: 'assets/case-studies/rwe/creative-2.jpeg', link: 'https://www.instagram.com/rwe.global/p/DXJ86kejLG3/' },
  { client: 'RWE', caption: 'A day in the life at RWE.', tags: ['AlwaysOnSocial', 'RWE', 'DayInTheLife'],
    thumb: 'assets/case-studies/rwe/creative-3.jpeg', link: 'https://www.instagram.com/rwe.global/reel/DNBCRzHMPvr/' },
  { client: 'RWE', caption: 'Career mobility: growing your career inside RWE.', tags: ['AlwaysOnSocial', 'RWE', 'Careers'],
    thumb: 'assets/case-studies/rwe/creative-4.jpeg', link: 'https://www.instagram.com/rwe.global/p/DMFz0SYOWvt/' },
  { client: 'Mars', caption: 'Trailer for the Mars Careers Podcast: real career journeys in 8 episodes.', tags: ['MarsCareers', 'CareersPodcast'],
    thumb: 'assets/case-studies/mars/creative-1.jpeg', link: 'https://www.instagram.com/p/Cz86n6rNtiX/' },
  { client: 'Mars', caption: 'Mars Careers Podcast: a social cut from the series.', tags: ['MarsCareers', 'CareersPodcast'],
    thumb: 'assets/case-studies/mars/creative-2.jpeg', link: 'https://www.instagram.com/p/CzY3Wqct2ir/' },
];

(function () {
  const grid = document.getElementById('reelsGrid');
  const overlay = document.getElementById('reelOverlay');
  if (!grid || !overlay) return;

  const media = document.getElementById('reelMedia');
  const header = document.getElementById('reelHeader');
  const captionEl = document.getElementById('reelCaption');
  const statsEl = document.getElementById('reelStats');
  const prevBtn = document.getElementById('reelPrev');
  const nextBtn = document.getElementById('reelNext');
  const reels = REELS.slice(0, 6);
  let current = 0;

  const ICON = {
    reel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><path d="M2.5 8h19M9 2.5 11.5 8M14.5 2.5 17 8"/><path d="m10 11.5 4.5 2.75L10 17z" fill="currentColor"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    verified: '<svg class="verified" viewBox="0 0 24 24" aria-label="Verified"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" fill="#0095F6"/><path d="m8.5 12 2.5 2.5 4.5-5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  reels.forEach((r, i) => {
    const tile = document.createElement('button');
    tile.className = 'reel-tile';
    tile.setAttribute('aria-label', r.client + ' reel: ' + r.caption);
    tile.innerHTML =
      '<img class="reel-thumb" src="' + r.thumb + '" alt="">' +
      '<span class="reel-hover"><strong>' + r.client + '</strong></span>' +
      '<span class="reel-count">' + ICON.reel + (r.views || r.client) + '</span>';
    tile.addEventListener('click', () => openReel(i));
    grid.appendChild(tile);
  });

  function renderReel() {
    const r = reels[current];

    if (r.video) {
      media.innerHTML = '<video src="' + r.video + '" poster="' + r.thumb + '" autoplay muted loop playsinline></video>' +
        '<button class="reel-sound" aria-label="Unmute"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6M16 9l6 6"/></svg></button>';
      const v = media.querySelector('video');
      media.querySelector('.reel-sound').addEventListener('click', () => { v.muted = !v.muted; });
    } else {
      media.innerHTML = '<img src="' + r.thumb + '" alt="">' +
        '<a class="reel-play-big" href="' + r.link + '" target="_blank" rel="noopener" aria-label="Watch on Instagram">' + ICON.play + '</a>';
    }

    header.innerHTML =
      '<img class="reel-av" src="aarushi-cropped.jpg" alt="">' +
      '<div class="reel-head-text"><div class="reel-handle">aarushiagarwal ' + ICON.verified + '<span class="reel-dot">·</span><span class="reel-client">' + r.client + '</span></div>' +
      '<div class="reel-sub">' + (r.credits || 'Original audio') + '</div></div>' +
      '<a class="reel-more" href="' + r.link + '" target="_blank" rel="noopener" aria-label="Open on Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg></a>';

    captionEl.innerHTML =
      '<img class="reel-av" src="aarushi-cropped.jpg" alt="">' +
      '<div><p><strong>aarushiagarwal</strong> ' + ICON.verified + ' ' + r.caption + '</p>' +
      (r.tags && r.tags.length ? '<p class="reel-tags">' + r.tags.map(t => '#' + t).join(' ') + '</p>' : '') +
      '<a class="reel-ig-link" href="' + r.link + '" target="_blank" rel="noopener">View on Instagram</a></div>';

    statsEl.innerHTML =
      '<strong>' + (r.views ? r.views + ' views' : 'Client work for ' + r.client) + '</strong>';

    prevBtn.hidden = current === 0;
    nextBtn.hidden = current === reels.length - 1;
  }

  function openReel(i) {
    current = i;
    renderReel();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
  }

  window.openReel = openReel; // used by Search

  function step(d) {
    const n = current + d;
    if (n < 0 || n >= reels.length) return;
    current = n;
    renderReel();
  }

  function closeReel() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    media.innerHTML = ''; // stops any playing video
  }

  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  overlay.querySelectorAll('[data-reel-close]').forEach(el => el.addEventListener('click', closeReel));
  overlay.querySelector('.reel-like').addEventListener('click', e => e.currentTarget.classList.toggle('liked'));
  overlay.querySelectorAll('.reel-ask').forEach(el => el.addEventListener('click', () => { closeReel(); openStory('contact'); }));
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeReel();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
})();
