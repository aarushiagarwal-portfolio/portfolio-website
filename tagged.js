/* ══════════════════════════════════════
   TAGGED TAB — reviews shown as posts (design: Tagged A on the canvas).

   EVERYTHING YOU'D WANT TO EDIT IS IN TAGGED BELOW.
   Each post:
     initials  the letters in the circle
     name      reviewer's name
     role      Client | Colleague | Manager | Director …
     quote     the short quote. Wrap the words to highlight in *one star*.
     look      colour scheme, one of: cream-coral, wine, ink-rose,
               marigold, ink-coral, cream-rose
     review    which slide of the Reviews story opens on tap
               (0 = the first review in script.js)
══════════════════════════════════════ */
const TAGGED = [
  { initials: 'NN', name: 'Natasha N.', role: 'Client',   look: 'cream-coral', review: 0,
    quote: 'Always brings *fresh ideas* and executes them flawlessly.' },
  { initials: 'GS', name: 'Grace S.',   role: 'Client',   look: 'wine',        review: 1,
    quote: 'Works efficiently, accurately and *on time. Every single time.*' },
  { initials: 'KO', name: 'Kat O.',     role: 'Manager',  look: 'ink-rose',    review: 2,
    quote: 'Her growth within our team is *truly inspiring.*' },
  { initials: 'SA', name: 'Sheeza A.',  role: 'Manager',  look: 'marigold',    review: 3,
    quote: 'Has her *finger on the pulse* when it comes to trends.' },
  { initials: 'SB', name: 'Samuel B.',  role: 'Manager',  look: 'ink-coral',   review: 4,
    quote: '*Fantastic in client-facing* situations. Calm and articulate.' },
  { initials: 'MA', name: 'Mandy A.',   role: 'Director', look: 'cream-rose',  review: 5,
    quote: 'Bridges *strategy and execution* seamlessly. A rare skill.' },
];

(function () {
  const grid = document.querySelector('#tab-tagged .tagged-grid');
  if (!grid) return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const QUOTE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 17c-1.5 0-2.5-1.2-2.5-3 0-3.5 2.5-6.5 5.5-7.5l.6 1.2C7.6 8.6 6.6 10 6.4 11.4c1.6.1 2.6 1.2 2.6 2.7S7.8 17 6 17zm9 0c-1.5 0-2.5-1.2-2.5-3 0-3.5 2.5-6.5 5.5-7.5l.6 1.2c-2 .9-3 2.3-3.2 3.7 1.6.1 2.6 1.2 2.6 2.7S16.8 17 15 17z"/></svg>';
  const total = String(TAGGED.length).padStart(2, '0');

  grid.innerHTML = TAGGED.map((t, i) => {
    const quote = esc(t.quote).replace(/\*(.+?)\*/g, '<em>$1</em>');
    const plain = t.quote.replace(/\*/g, '');
    return `<button type="button" class="tagged-post tg tg-${esc(t.look)}" data-review="${t.review}"
        aria-label="${esc(t.role)} review from ${esc(t.name)}: ${esc(plain)} Open the full review">
      <span class="tg-in"><span class="tg-eb"><span>${esc(t.role)} review</span><span>${String(i + 1).padStart(2, '0')} / ${total}</span></span>
      <span class="tg-qm">${QUOTE}</span>
      <span class="tg-q">${quote}</span>
      <span class="tg-by"><span class="tg-av">${esc(t.initials)}</span>
        <span><span class="tg-nm">${esc(t.name)}</span><span class="tg-rl">${esc(t.role)}</span></span></span></span>
    </button>`;
  }).join('');

  grid.addEventListener('click', e => {
    const post = e.target.closest('[data-review]');
    if (post) openStory('reviews', +post.dataset.review || 0);
  });
})();
