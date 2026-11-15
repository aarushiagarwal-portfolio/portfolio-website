/* ══════════════════════════════════════
   REELS TAB
   A 3-column grid of 9:16 tiles (my TikToks) that opens an Instagram-style
   viewer playing the full video, hosted on this site.

   HOW TO ADD OR UPDATE A REEL
   Edit the REELS list below. Newest goes first; the grid shows the first 6.
   To update the numbers on a reel, just change views / likes / saves.
   Each entry:
     label:    short name, shown on hover, in the viewer header and in Search
     link:     the video's TikTok URL (https://www.tiktok.com/@aarushis.life/video/<id>)
     caption:  the TikTok caption, without the hashtags
     tags:     hashtags shown under the caption (without the #)
     posted:   date posted, written like '14 November 2026'
     views:    as text, e.g. '1.2K'
     likes, saves: numbers
     clip:     3-second silent clip that loops on the grid tile (720x1280 .mp4)
     poster:   first frame as a .jpg (1080x1920), shown while the videos load
     video:    the full video (1080x1920 .mp4)
   The three files for each reel live in assets/reels/ and share a name:
   <name>-clip.mp4, <name>.jpg and <name>.mp4.
══════════════════════════════════════ */
const REEL_ACCOUNT = { handle: 'aarushis.life', url: 'https://www.tiktok.com/@aarushis.life' };

const REELS = [
  { label: 'Frequency, Angel',
    link: 'https://www.tiktok.com/@aarushis.life/video/7708116464749841686',
    caption: 'Laptop-friendly café in Angel with no time limit ☕️💻 📍 Frequency, 3 mins from Angel station ⏰ No time limit and good wifi, so you can settle in properly ✨ Honestly the vibe is so good for a focused work day 🔌 Very few sockets, so come fully charged ☕️ I had a vanilla latte: good, but a little bitter for me Save this for your next work-from-café day 🤍 What café in London should I work from next for #3?',
    tags: ['londoncafe', 'laptopfriendly', 'cafeaesthetic', 'kingscross'],
    posted: '14 November 2026', views: '1.2K', likes: 85, saves: 38,
    clip: 'assets/reels/frequency-clip.mp4', poster: 'assets/reels/frequency.jpg', video: 'assets/reels/frequency.mp4' },

  { label: 'DL/Service, Marylebone',
    link: 'https://www.tiktok.com/@aarushis.life/video/7706989627588005142',
    caption: 'Laptop-friendly café in Marylebone with no time limit ☕️💻 📍 DL/Service, 23 Baker St, London W1U 6RL, halfway between Baker Street and Bond Street ⏰ No time limit, so you can actually settle in for the day 📶 Great wifi, and it stayed calm even on a busy Thursday morning ☕️ The coffee was genuinely amazing Save this for your next work-from-café day 🤍 What\'s your go-to café to work from in London?',
    tags: ['londoncafe', 'laptopfriendly', 'coffeshops', 'marylebone', 'workfrom'],
    posted: '11 November 2026', views: '873', likes: 40, saves: 19,
    clip: 'assets/reels/dl-service-clip.mp4', poster: 'assets/reels/dl-service.jpg', video: 'assets/reels/dl-service.mp4' },

  { label: 'WatchHouse, Mayfair',
    link: 'https://www.tiktok.com/@aarushis.life/video/7696943096956751136',
    caption: 'Found the café that makes work feel a little less like work ☕️ If you\'re looking for a laptop friendly café in London to work from, WatchHouse in Hanover Square is a good one. It\'s right in the heart of Mayfair, just a few minutes from Bond Street Station. It\'s a smaller café so it does get a bit busy, but the vibes were so good. There are plenty of charging sockets, comfy seats and loads of outdoor seating if you can\'t find a table inside. Perfect for a work from café day in central London. Save this for when you need a cosy coffee shop to work from 🤍 @WatchHouse',
    tags: ['laptopfriendly', 'cafeaesthetic', 'mayfair', 'londoncafe'],
    posted: '15 October 2026', views: '1.9K', likes: 96, saves: 36,
    clip: 'assets/reels/watchhouse-clip.mp4', poster: 'assets/reels/watchhouse.jpg', video: 'assets/reels/watchhouse.mp4' },

  { label: 'Roxy Ballroom, Holborn',
    link: 'https://www.tiktok.com/@aarushis.life/video/7689897141002685728',
    caption: 'Fun things to do in London! Head to @Roxy Ball Room & Roxy Lanes, if you are looking for a games bar with crazy pool, tech darts, karaoke, beer pong and so many more games. Save this for your next plan, and send it to your bestie! 📍: Roxy Ball Room, Holborn',
    tags: ['thingstodoinlondon', 'londonightout', 'londonbars', 'londonactivities', 'datenight'],
    posted: '26 September 2026', views: '2.3K', likes: 35, saves: 8,
    clip: 'assets/reels/roxy-ballroom-clip.mp4', poster: 'assets/reels/roxy-ballroom.jpg', video: 'assets/reels/roxy-ballroom.mp4' },

  { label: 'Frothee, King\'s Cross',
    link: 'https://www.tiktok.com/@aarushis.life/video/7687279952747580704',
    caption: 'I tried their Shaken Brown Sugar Latte, and it was quite nice. Just the right amount of sweet! Give it a try if you are in Kings Cross or Covent Garden. @frotheecafe',
    tags: ['londoncafe', 'londonhotspots', 'coffeeshops', 'kingscross', 'london'],
    posted: '19 September 2026', views: '2.6K', likes: 114, saves: 25,
    clip: 'assets/reels/frothee-clip.mp4', poster: 'assets/reels/frothee.jpg', video: 'assets/reels/frothee.mp4' },

  { label: 'Perfect day in Manchester',
    link: 'https://www.tiktok.com/@aarushis.life/video/7679504066296204547',
    caption: 'How to spend the perfect day in Manchester. Coffee, culture, football history, and food, all in one day 🚉☕️ Full breakdown + what I spent is in the video, save this for your next trip✨ @Tabitha\'s Coffee @Honest Burgers @Secret Manchester',
    tags: ['manchester', 'oldtrafford', 'thingstodo', 'traveltok', 'traveldiaries'],
    posted: '29 August 2026', views: '2.6K', likes: 54, saves: 37,
    clip: 'assets/reels/manchester-clip.mp4', poster: 'assets/reels/manchester.jpg', video: 'assets/reels/manchester.mp4' },
];

(function () {
  const grid = document.getElementById('reelsGrid');
  const overlay = document.getElementById('reelOverlay');
  if (!grid || !overlay) return;

  const modal = overlay.querySelector('.reel-modal');
  const media = document.getElementById('reelMedia');
  const header = document.getElementById('reelHeader');
  const captionEl = document.getElementById('reelCaption');
  const likesEl = document.getElementById('reelLikes');
  const savesEl = document.getElementById('reelSaves');
  const statsEl = document.getElementById('reelStats');
  const openLink = document.getElementById('reelOpen');
  const shareBtn = document.getElementById('reelShare');
  const prevBtn = document.getElementById('reelPrev');
  const nextBtn = document.getElementById('reelNext');
  const reels = REELS.slice(0, 6);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let muted = true;        // remembered while moving between reels
  let returnFocus = null;  // where focus goes back to on close

  const ICON = {
    reel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><path d="M2.5 8h19M9 2.5 11.5 8M14.5 2.5 17 8"/><path d="m10 11.5 4.5 2.75L10 17z" fill="currentColor"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.5s-8.5-5-8.5-11A4.75 4.75 0 0 1 12 6.8a4.75 4.75 0 0 1 8.5 2.7c0 6-8.5 11-8.5 11z"/></svg>',
    save: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 21 12 16l-7 5V4h14z"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>',
    soundOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6M16 9l6 6"/></svg>',
    soundOn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
  };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ── grid tiles ── */
  const clipWatcher = !reduceMotion && 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => entries.forEach(en => {
        const v = en.target;
        if (en.isIntersecting && !overlay.classList.contains('open')) {
          const p = v.play();
          if (p) p.catch(() => {});
        } else v.pause();
      }), { threshold: 0.25 })
    : null;

  reels.forEach((r, i) => {
    const tile = document.createElement('button');
    tile.className = 'reel-tile';
    tile.type = 'button';
    tile.setAttribute('aria-label', r.label + '. ' + r.views + ' views. Open reel');
    tile.innerHTML =
      (clipWatcher
        ? '<video class="reel-thumb" src="' + r.clip + '" poster="' + r.poster + '" muted loop playsinline preload="none" tabindex="-1" aria-hidden="true"></video>'
        : '<img class="reel-thumb" src="' + r.poster + '" alt="">') +
      '<span class="reel-hover" aria-hidden="true">' +
        '<span class="reel-hover-stats">' +
          '<span>' + ICON.play + r.views + '</span>' +
          '<span>' + ICON.heart + r.likes + '</span>' +
          '<span>' + ICON.save + r.saves + '</span>' +
        '</span>' +
        '<span class="reel-hover-label">' + esc(r.label) + '</span>' +
      '</span>' +
      '<span class="reel-count" aria-hidden="true">' + ICON.reel + r.views + '</span>';
    tile.addEventListener('click', () => openReel(i));
    grid.appendChild(tile);
    if (clipWatcher) {
      const v = tile.querySelector('video');
      v.muted = true;
      clipWatcher.observe(v);
    }
  });

  const tileClips = () => grid.querySelectorAll('video');

  /* ── viewer ── */
  function unloadVideo() {
    const v = media.querySelector('video');
    if (v) { v.pause(); v.removeAttribute('src'); v.load(); }
    media.innerHTML = '';
  }

  function paintSound(v, btn) {
    btn.innerHTML = v.muted ? ICON.soundOff : ICON.soundOn;
    btn.setAttribute('aria-label', v.muted ? 'Unmute' : 'Mute');
  }

  function renderReel() {
    const r = reels[current];
    unloadVideo();

    media.innerHTML =
      '<video poster="' + r.poster + '" preload="none" playsinline loop></video>' +
      '<span class="reel-paused" aria-hidden="true">' + ICON.play + '</span>' +
      '<button class="reel-sound" type="button"></button>';
    const v = media.querySelector('video');
    const sound = media.querySelector('.reel-sound');
    v.muted = muted;
    v.src = r.video;
    paintSound(v, sound);
    const start = v.play();
    if (start) start.catch(() => {   // browser refused sound without a click: fall back to muted
      v.muted = true; paintSound(v, sound);
      const again = v.play();
      if (again) again.catch(() => {});
    });
    v.addEventListener('play', () => media.classList.remove('is-paused'));
    v.addEventListener('pause', () => media.classList.add('is-paused'));
    media.classList.remove('is-paused');
    v.addEventListener('click', () => {
      if (swiped) { swiped = false; return; }
      if (v.paused) v.play(); else v.pause();
    });
    sound.addEventListener('click', () => {
      v.muted = !v.muted; muted = v.muted;
      paintSound(v, sound);
    });

    header.innerHTML =
      '<span class="reel-ring"><img class="reel-av" src="aarushi-cropped.jpg" alt=""></span>' +
      '<div class="reel-head-text"><div class="reel-handle">' + REEL_ACCOUNT.handle +
        '<span class="reel-dot">·</span>' +
        '<a class="reel-follow" href="' + REEL_ACCOUNT.url + '" target="_blank" rel="noopener">Follow</a></div>' +
      '<div class="reel-sub">' + esc(r.label) + '</div></div>' +
      '<a class="reel-more" href="' + r.link + '" target="_blank" rel="noopener" aria-label="Open on TikTok">' + ICON.more + '</a>';

    captionEl.innerHTML =
      '<img class="reel-av" src="aarushi-cropped.jpg" alt="">' +
      '<div><p><strong>' + REEL_ACCOUNT.handle + '</strong> ' + esc(r.caption) + '</p>' +
      (r.tags && r.tags.length
        ? '<p class="reel-tags">' + r.tags.map(t =>
            '<a href="https://www.tiktok.com/tag/' + encodeURIComponent(t) + '" target="_blank" rel="noopener">#' + esc(t) + '</a>').join(' ') + '</p>'
        : '') +
      '<span class="reel-date">' + esc(r.posted.replace(/\s\d{4}$/, '')) + '</span></div>';
    captionEl.parentElement.scrollTop = 0;

    likesEl.textContent = r.likes;
    likesEl.parentElement.setAttribute('aria-label', r.likes + ' likes');
    savesEl.textContent = r.saves;
    savesEl.parentElement.setAttribute('aria-label', r.saves + ' saves');
    statsEl.innerHTML = '<strong>' + r.views + ' views</strong><span>' + esc(r.posted) + '</span>';
    openLink.href = r.link;

    prevBtn.hidden = current === 0;
    nextBtn.hidden = current === reels.length - 1;
  }

  function openReel(i) {
    if (!overlay.classList.contains('open')) returnFocus = document.activeElement;
    current = Math.max(0, Math.min(reels.length - 1, i));
    tileClips().forEach(v => v.pause());
    overlay.inert = false;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    renderReel();
    modal.focus({ preventScroll: true });
  }

  window.openReel = openReel; // used by Search

  function step(d) {
    const n = current + d;
    if (n < 0 || n >= reels.length) return;
    current = n;
    renderReel();
    if (!overlay.contains(document.activeElement) || document.activeElement.hidden) modal.focus({ preventScroll: true });
  }

  function closeReel() {
    if (!overlay.classList.contains('open')) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.inert = true;
    unloadVideo(); // only one video ever plays
    if (returnFocus && document.contains(returnFocus)) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
    // restart the tile clips that are on screen
    if (clipWatcher) tileClips().forEach(v => { clipWatcher.unobserve(v); clipWatcher.observe(v); });
  }

  function copyLink() {
    const link = reels[current].link;
    const done = () => showToast('Link copied');
    const fallback = () => {
      const t = document.createElement('textarea');
      t.value = link; t.setAttribute('readonly', '');
      t.style.cssText = 'position:fixed;opacity:0';
      overlay.appendChild(t); t.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (_) { /* not allowed */ }
      t.remove(); shareBtn.focus();
      if (ok) done(); else showToast('Could not copy the link');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(link).then(done, fallback);
    else fallback();
  }

  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  shareBtn.addEventListener('click', copyLink);
  overlay.querySelectorAll('[data-reel-close]').forEach(el => el.addEventListener('click', closeReel));

  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeReel();
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'Tab') {   // keep Tab inside the viewer
      const items = [...overlay.querySelectorAll('button, a[href]')].filter(el => !el.hidden && el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      const inside = overlay.contains(document.activeElement) && document.activeElement !== modal;
      if (e.shiftKey && (!inside || document.activeElement === first)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (!inside || document.activeElement === last)) { e.preventDefault(); first.focus(); }
    }
  });

  /* phone: swipe left/right on the video to change reel */
  let touch = null, swiped = false;
  media.addEventListener('touchstart', e => {
    swiped = false;
    touch = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
  }, { passive: true });
  media.addEventListener('touchend', e => {
    if (!touch) return;
    const dx = e.changedTouches[0].clientX - touch.x, dy = e.changedTouches[0].clientY - touch.y;
    touch = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    swiped = true;   // stops the tap that follows from pausing the video
    step(dx < 0 ? 1 : -1);
    setTimeout(() => { swiped = false; }, 400);
  }, { passive: true });
})();
