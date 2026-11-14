/* ── TABS ────────────────────────────── */
/* Tabs listed here aren't ready yet: clicking shows a "coming soon" toast instead */
const COMING_SOON_TABS = ['reels'];

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

const STORIES = {
  about: [
    // Slide 1: Hero photo
    { type: 'hero-photo' },
    // Slide 2: Bio quote
    { type: 'quote-bio' },
    // Slide 3-4: Bio detail
    { type: 'bio-info', heading: 'What I Do', text: "I handle end-to-end social strategies, from shaping narratives and content planning to execution, optimisation, and performance reporting, across social platforms. My work focuses on creating platform-native content that feels genuine, culturally relevant, and audience-first, whether it's sparking engagement, growing communities, or delivering measurable impact." },
    { type: 'bio-info', heading: 'My Approach', text: "I'm passionate about blending creativity with data. With a Master's in Marketing Communications and hands-on expertise in analytics tools, I use insights to refine strategies, spot trends, and keep the audience at the centre. I love collaborating with creatives, strategists, and influencers to bring campaigns and content to life. I'm excited about the evolving world of social media and ready to bring that energy to new opportunities." },
    // Slide 5: Fun facts
    { type: 'facts' },
    // Slide 6: What I love
    { type: 'loves' },
  ],
  skills: [
    { type: 'skill-intro' },
    { type: 'platforms' },
    { type: 'competencies', a:'Paid Social', aItems:['Campaign Setup','Audience Targeting','Media Schedules','Budget Monitoring','A/B Testing'], b:'Organic Social', bItems:['Community Management','Social Listening','Trend Spotting','Crisis Management','Influencer Coordination'] },
    { type: 'competencies', a:'Content Creation', aItems:['Social Copywriting','Short-form Video Creation','Graphic Design','Visual Storytelling','Asset Organisation'], b:'Platform Management', bItems:['Content Calendar','Content Scheduling','Analytics & Reporting','Competitor Analysis'] },
    { type: 'tools' },
    { type: 'certs' },
  ],
  reviews: [
    { type: 'review', av:'NN', name:'Natasha N.', role:'Colleague', quote:'"Extensive knowledge of social media. Always brings fresh ideas and executes them flawlessly. A genuine expert who elevates any team."', bg:'linear-gradient(160deg,#1a0505,#8B1A1A)' },
    { type: 'review', av:'GS', name:'Grace S.', role:'Colleague', quote:'"Works efficiently, accurately, and on time. Every single time. She sets the standard for reliability and quality in everything she delivers."', bg:'linear-gradient(160deg,#040418,#1e3a8a)' },
    { type: 'review', av:'KO', name:'Kat O.', role:'Manager', quote:'"Her growth within our team is truly inspiring. She stepped up at every opportunity and delivered results that consistently exceeded expectations."', bg:'linear-gradient(160deg,#04180a,#14532d)' },
    { type: 'review', av:'SA', name:'Sheeza A.', role:'Colleague', quote:'"Has her finger on the pulse when it comes to trends. She spots what\'s coming before anyone else and knows exactly how to capitalise on the moment."', bg:'linear-gradient(160deg,#181004,#92400e)' },
    { type: 'review', av:'SB', name:'Samuel B.', role:'Manager', quote:'"Fantastic in client-facing situations. Calm, articulate, and always makes the client feel heard and valued. An incredible asset in any meeting."', bg:'linear-gradient(160deg,#0c0418,#5b21b6)' },
    { type: 'review', av:'MA', name:'Mandy A.', role:'Director', quote:'"A natural ability for translating client objectives into actionable outcomes. Aarushi bridges strategy and execution seamlessly — a rare and valuable skill."', bg:'linear-gradient(160deg,#180410,#9d174d)' },
  ],
  contact: [
    { type: 'contact-avail' },
    { type: 'contact-links' },
  ],
};

function buildSlide(data) {
  const div = document.createElement('div');
  div.className = 'story-slide';

  switch (data.type) {

    case 'hero-photo':
      div.style.background = '#000';
      div.innerHTML = `
        <div class="slide-hero">
          <div class="slide-hero-photo">
            <img src="aarushi.jpg" alt="Aarushi" />
          </div>
          <div class="slide-hero-text">
            <div class="slide-hero-badge"><div class="badge-green-dot"></div>Available for new opportunities</div>
            <h2>Aarushi Agarwal</h2>
            <p>Social Media Manager & Content Creator</p>
          </div>
        </div>`;
      break;

    case 'quote-bio':
      div.style.background = 'linear-gradient(160deg,#111,#1a0a0a)';
      div.innerHTML = `
        <div class="slide-quote">
          <div class="slide-quote-mark">"</div>
          <p>A storyteller at heart, strategist by profession, and traveler by passion. I believe great social media comes from authentic connections and creative thinking.</p>
        </div>`;
      break;

    case 'bio-info':
      div.style.background = 'linear-gradient(160deg,#111,#1a0a0a)';
      div.innerHTML = `
        <div class="slide-quote">
          <h3 style="font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:1rem;">${data.heading}</h3>
          <p style="font-style:normal;font-size:0.92rem;">${data.text}</p>
        </div>`;
      break;

    case 'facts':
      div.style.background = 'linear-gradient(160deg,#0d0d0d,#1a1010)';
      div.innerHTML = `
        <div class="slide-facts">
          <h3>Fun Facts About Me</h3>
          <div class="fact-item"><span class="fact-emoji">✨</span><span class="fact-text">I'm the person who shares TikToks with colleagues saying "we should jump on this."</span></div>
          <div class="fact-item"><span class="fact-emoji">📸</span><span class="fact-text">My camera roll is full of ad screenshots, design ideas, trends, platform updates, and travel pictures.</span></div>
          <div class="fact-item"><span class="fact-emoji">🎬</span><span class="fact-text">I love a good behind-the-scenes moment more than a perfectly staged shot.</span></div>
          <div class="fact-item"><span class="fact-emoji">🌍</span><span class="fact-text">I've explored 18 countries, always chasing new experiences.</span></div>
          <div class="fact-item"><span class="fact-emoji">📍</span><span class="fact-text">I've called 9 cities home across 2 different countries.</span></div>
          <div class="fact-item"><span class="fact-emoji">📱</span><span class="fact-text">I love capturing everyday moments.</span></div>
        </div>`;
      break;

    case 'loves':
      div.style.background = 'linear-gradient(160deg,#0d0d0d,#0d0814)';
      div.innerHTML = `
        <div class="slide-loves">
          <h3>What I Love</h3>
          <div class="loves-cards">
            <div class="love-card"><div class="love-emoji">📸</div><span>Photography</span></div>
            <div class="love-card"><div class="love-emoji">✈️</div><span>Travel</span></div>
            <div class="love-card"><div class="love-emoji">✂️</div><span>Craft</span></div>
            <div class="love-card"><div class="love-emoji">🎨</div><span>Design</span></div>
          </div>
        </div>`;
      break;

    case 'skill-intro':
      div.style.background = 'linear-gradient(160deg,#1a0505,#8B1A1A)';
      div.innerHTML = `
        <div class="slide-stat">
          <div class="slide-stat-number">6</div>
          <div class="slide-stat-label">Platforms mastered</div>
          <div class="slide-stat-sub">Instagram · TikTok · LinkedIn · Facebook · Snapchat · Pinterest</div>
        </div>`;
      break;

    case 'platforms':
      div.style.background = 'linear-gradient(160deg,#0d0d0d,#1a0a0a)';
      div.innerHTML = `
        <div class="slide-bars">
          <h3>Platform Mastery</h3>
          <div class="sbar-row"><span>Instagram</span><div class="sbar-track"><div class="sbar-fill" data-w="98"></div></div><span class="sbar-pct">98%</span></div>
          <div class="sbar-row"><span>Facebook</span><div class="sbar-track"><div class="sbar-fill" data-w="98"></div></div><span class="sbar-pct">98%</span></div>
          <div class="sbar-row"><span>LinkedIn</span><div class="sbar-track"><div class="sbar-fill" data-w="95"></div></div><span class="sbar-pct">95%</span></div>
          <div class="sbar-row"><span>TikTok</span><div class="sbar-track"><div class="sbar-fill" data-w="93"></div></div><span class="sbar-pct">93%</span></div>
          <div class="sbar-row"><span>Snapchat</span><div class="sbar-track"><div class="sbar-fill" data-w="85"></div></div><span class="sbar-pct">85%</span></div>
          <div class="sbar-row"><span>Pinterest</span><div class="sbar-track"><div class="sbar-fill" data-w="80"></div></div><span class="sbar-pct">80%</span></div>
        </div>`;
      setTimeout(() => div.querySelectorAll('.sbar-fill').forEach(b => { b.style.width = b.dataset.w + '%'; }), 200);
      break;

    case 'competencies':
      div.style.background = 'linear-gradient(160deg,#0d0d0d,#0a0d1a)';
      div.innerHTML = `
        <div class="slide-comps">
          <h3>Core Competencies</h3>
          <div class="comp-block">
            <h4>${data.a}</h4>
            <div class="comp-chips">${data.aItems.map(i=>`<span>${i}</span>`).join('')}</div>
          </div>
          <div class="comp-block">
            <h4>${data.b}</h4>
            <div class="comp-chips">${data.bItems.map(i=>`<span>${i}</span>`).join('')}</div>
          </div>
        </div>`;
      break;

    case 'tools':
      div.style.background = 'linear-gradient(160deg,#0d0d0d,#180e04)';
      div.innerHTML = `
        <div class="slide-tools">
          <h3>Tools & Software</h3>
          <div class="tools-grid">
            <div class="tool-card-s"><strong>Sprout Social</strong><span>Analytics</span></div>
            <div class="tool-card-s"><strong>Sprinklr</strong><span>Analytics</span></div>
            <div class="tool-card-s"><strong>Hootsuite</strong><span>Scheduling</span></div>
            <div class="tool-card-s"><strong>BrandWatch</strong><span>Social Listening</span></div>
            <div class="tool-card-s"><strong>Monday.Com</strong><span>Project Management</span></div>
            <div class="tool-card-s"><strong>ZiFlow</strong><span>Workflow</span></div>
            <div class="tool-card-s"><strong>Canva</strong><span>Design</span></div>
            <div class="tool-card-s"><strong>CapCut</strong><span>Video Editing</span></div>
          </div>
        </div>`;
      break;

    case 'certs':
      div.style.background = 'linear-gradient(160deg,#0a0818,#1a0505)';
      div.innerHTML = `
        <div class="slide-certs">
          <h3>Always Learning</h3>
          <div class="cert-card-s"><span class="cert-ico">🎓</span><div><strong>LinkedIn Marketing Strategy</strong><span>Certified</span></div></div>
          <div class="cert-card-s"><span class="cert-ico">🎓</span><div><strong>Google Analytics</strong><span>Certified</span></div></div>
          <div class="cert-card-s"><span class="cert-ico">🎓</span><div><strong>Hootsuite Social Marketing</strong><span>Certified</span></div></div>
        </div>`;
      break;

    case 'review':
      div.style.background = data.bg;
      div.innerHTML = `
        <div class="slide-quote">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem;">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#fff;flex-shrink:0;">${data.av}</div>
            <div><div style="font-size:0.9rem;font-weight:700;color:#fff;">${data.name}</div><div style="font-size:0.75rem;color:rgba(255,255,255,0.45);">${data.role}</div></div>
            <div style="margin-left:auto;color:#f59e0b;letter-spacing:2px;font-size:0.8rem;">★★★★★</div>
          </div>
          <div class="slide-quote-mark">"</div>
          <p>${data.quote}</p>
        </div>`;
      break;

    case 'contact-avail':
      div.style.background = 'linear-gradient(160deg,#0d0d0d,#08180a)';
      div.innerHTML = `
        <div class="slide-stat">
          <div style="font-size:2.5rem;margin-bottom:1rem;">👋</div>
          <div class="slide-stat-number" style="font-size:1.8rem;line-height:1.3;">Let's work<br>together</div>
          <div style="display:flex;align-items:center;gap:0.5rem;margin-top:1.5rem;font-size:0.82rem;color:#4ade80;font-weight:600;">
            <div class="avail-dot"></div>Available for new opportunities
          </div>
          <div style="margin-top:1rem;font-size:0.8rem;color:rgba(255,255,255,0.4);line-height:1.6;">Open to full-time roles,<br>freelance & collaborations</div>
        </div>`;
      break;

    case 'contact-links':
      div.style.background = 'linear-gradient(160deg,#0d0d0d,#1a0505)';
      div.innerHTML = `
        <div class="slide-contact">
          <div class="contact-icon-circle">💬</div>
          <h2 style="text-align:center;">Let's Connect</h2>
          <p>Ready to take your social media to the next level? Reach out via LinkedIn or email. Let's create something amazing together! 🚀</p>
          <a href="https://www.linkedin.com/in/aarushi-agarwal126/" target="_blank" class="contact-link-s">
            <div class="cl-icon li-bg"><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></div>
            <div class="cl-text"><strong>LinkedIn</strong><span class="cl-sub">Connect with me</span><span class="cl-pill">Let's network</span></div>
            <span class="cl-arrow">&#8594;</span>
          </a>
          <a href="mailto:aarushiag126@gmail.com" class="contact-link-s">
            <div class="cl-icon em-bg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg></div>
            <div class="cl-text"><strong>Email</strong><span class="cl-sub">aarushiag126@gmail.com</span><span class="cl-pill">Drop me a line</span></div>
            <span class="cl-arrow">&#8594;</span>
          </a>
        </div>`;
      break;
  }
  return div;
}

/* Story state */
let storySlides = [], storyIdx = 0, storyTimer = null;
const SLIDE_DURATION = 5000;

const storyOverlay  = document.getElementById('storyOverlay');
const storyBackdrop = document.getElementById('storyBackdrop');
const storyBars     = document.getElementById('storyBars');
const storySlideArea= document.getElementById('storySlideArea');
const storyClose    = document.getElementById('storyClose');
const storyTapLeft  = document.getElementById('storyTapLeft');
const storyTapRight = document.getElementById('storyTapRight');

function openStory(key) {
  const data = STORIES[key];
  if (!data) return;
  storySlides = data;
  storyIdx = 0;

  // Build progress bars
  storyBars.innerHTML = data.map(() => `<div class="story-bar"><div class="story-bar-fill"></div></div>`).join('');

  // Build slides
  storySlideArea.innerHTML = '';
  data.forEach(d => storySlideArea.appendChild(buildSlide(d)));

  storyOverlay.classList.add('open');
  showStorySlide(0);
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
      fill.style.transition = `width ${SLIDE_DURATION}ms linear`;
      fill.style.width = '100%';
    });
    activeBar.classList.add('active');
  }

  // Trigger bar animations for platforms slide
  const activeSlide = slides[idx];
  if (activeSlide) {
    setTimeout(() => {
      activeSlide.querySelectorAll('.sbar-fill').forEach(b => { b.style.width = b.dataset.w + '%'; });
    }, 200);
  }

  storyTimer = setTimeout(() => {
    if (idx + 1 < storySlides.length) showStorySlide(idx + 1);
    else closeStory();
  }, SLIDE_DURATION);
}

function closeStory() {
  clearInterval(storyTimer);
  storyOverlay.classList.remove('open');
}

storyClose.addEventListener('click', closeStory);
storyBackdrop.addEventListener('click', closeStory);
storyTapLeft.addEventListener('click',  () => { if (storyIdx > 0) showStorySlide(storyIdx - 1); });
storyTapRight.addEventListener('click', () => { if (storyIdx + 1 < storySlides.length) showStorySlide(storyIdx + 1); else closeStory(); });

document.querySelectorAll('.highlight-item').forEach(item => {
  item.addEventListener('click', () => openStory(item.dataset.story));
});
document.getElementById('hireBtn').addEventListener('click', () => openStory('contact'));

/* ══════════════════════════════════════
   SIDEBAR + MOBILE NAV
   Every nav control carries data-nav="<action>". Actions without a
   handler yet (what's new, work with me, more) show a "coming soon"
   toast until their panels are built. Search is added by search.js.
══════════════════════════════════════ */

function showTab(name) {
  document.querySelector(`.tab-btn[data-tab="${name}"]`).click();
  document.querySelector('.tab-bar').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* Posts tab = Work page, Reels tab = Reels page: keep the sidebar in step */
const TAB_TO_NAV = { grid: 'work' };
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  chat: () => openStory('contact'),
  about: () => openStory('about'),
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
    div.innerHTML = `<img src="${s.img}" alt="" style="width:100%;height:100%;object-fit:cover;" />`;
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
      <div class="pi-avatar"><img src="aarushi-cropped.jpg" alt="Aarushi" /></div>
      <div><strong>aarushiagarwal</strong><span>Social Media Manager</span></div>
      <button class="pi-hire" id="piHire">Get In Touch</button>
    </div>
    <div class="pi-brand-name">${b.name}</div>
    <p class="pi-desc">${b.desc}</p>
    <div class="pi-tags">${b.tags.map(t=>`<span class="pi-tag">${t}</span>`).join('')}</div>
    <div class="pi-stats">${b.stats.map(s=>`<div class="pi-stat"><strong>${s.n}</strong><span>${s.l}</span></div>`).join('')}</div>`;

  document.getElementById('piHire').addEventListener('click', () => { closePost(); openStory('contact'); });
  updateCar();
  postOverlay.classList.add('open');
}

function closePost() { postOverlay.classList.remove('open'); }

document.addEventListener('keydown', e => {
  if (e.key === 'Escape')       { closeStory(); closePost(); }
  if (e.key === 'ArrowRight' && postOverlay.classList.contains('open')) { if (carIdx < carSlides.length - 1) { carIdx++; updateCar(); } }
  if (e.key === 'ArrowLeft'  && postOverlay.classList.contains('open')) { if (carIdx > 0) { carIdx--; updateCar(); } }
});
