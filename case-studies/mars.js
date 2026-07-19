/* ══════════════════════════════════════
   CLIENT DATA — Mars
   Two-part campaign (paid launch + organic/boosting), which is why this
   one has 7 slides instead of RWE's 6, a 4th platform (TikTok), and a
   results slide with two dashboards side-by-side (see 'dashboardGroup'
   in case-study.js). None of that needed changes to the component itself
   — see the block-type reference at the top of case-study.js.
══════════════════════════════════════ */
window.CASE_STUDIES = window.CASE_STUDIES || [];

window.CASE_STUDIES.push({
  id: 'mars',
  name: 'Mars',
  logo: 'assets/case-studies/mars/mars-logo.png',

  /* ── grid tile ── */
  eyebrow: 'Careers Podcast',
  tileBrief: 'Real career journeys, told through an 8-episode podcast and social-first rollout.',
  tileResults: [
    { label: 'Impressions', num: '22.3M+' },
    { label: 'Engagement', num: '3.53M+' },
    { label: 'Eng. rate', num: '15.79%' },
  ],

  /* ── carousel (7 slides) ── */
  slides: [
    {
      eyebrow: 'Case study',
      blocks: [
        { type: 'logo', src: 'assets/case-studies/mars/mars-logo.png', alt: 'Mars' },
        { type: 'heading1', html: 'Always-on<br>social.' },
        { type: 'skillTiles', items: ['Strategy', 'Podcast', 'Reporting'] },
      ],
    },
    {
      eyebrow: 'The brief',
      blocks: [
        { type: 'heading2', html: 'Make early careers <span class="cs-mark">sound real.</span>' },
        { type: 'paragraph', html: 'An 8-episode podcast featuring Mars employees\' own career journeys, backed by a tactical paid launch to build awareness and buzz around the release.' },
      ],
    },
    {
      eyebrow: 'Paid campaign scope',
      blocks: [
        {
          type: 'specGrid',
          items: [
            { k: 'Duration', v: '4 months' },
            { k: 'Paid budget', v: '$20,000' },
            { k: 'Markets', v: 'US · UK · France' },
            { k: 'Channels', icons: ['instagram', 'facebook', 'linkedin', 'tiktok'] },
          ],
        },
        { type: 'paragraph', style: 'margin-top:14px;', html: 'Reaching <span class="cs-mark">university graduates</span> in FMCG, business and finance.' },
      ],
    },
    {
      eyebrow: 'Organic rollout',
      blocks: [
        { type: 'heading2', style: 'font-size:22px;', html: 'Then, <span class="cs-mark">the organic push.</span>' },
        { type: 'paragraph', html: 'Every episode carried 2 social cuts and a quote card, each linking back to Spotify, then boosted once performance data came in.' },
        {
          type: 'specGrid',
          style: 'margin-top:4px;',
          items: [
            { k: 'Assets', v: '24 total' },
            { k: 'Boosting spend', v: '$8,600' },
          ],
        },
        { type: 'paragraph', style: 'margin-top:10px;', html: 'Every clip was pulled from a full raw-content audit to find the strongest snippets.' },
      ],
    },
    {
      eyebrow: 'My role',
      blocks: [
        { type: 'heading2', style: 'font-size:22px;', html: 'End-to-end <span class="cs-mark">ownership.</span>' },
        {
          type: 'roleList',
          items: [
            'Supported podcast strategy: platform, season structure, format & competitor analysis',
            'Developed a social-first rollout across Reels, TikTok & LinkedIn',
            'Managed day-to-day delivery: briefing, quality control, approvals & reporting',
            'Directed production, briefing two social cuts per episode',
            'Delivered 16 video clips and 8 static assets',
            'Managed cross-platform distribution across TikTok, Meta & LinkedIn',
          ],
        },
      ],
    },
    {
      eyebrow: 'Results',
      blocks: [
        {
          type: 'dashboardGroup',
          dashboards: [
            {
              title: 'Paid launch',
              items: [
                { icon: '👁️', label: 'Impressions', num: '4.68M+' },
                { icon: '👆', label: 'Engagement', num: '124.9K+' },
                { icon: '📈', label: 'Eng. rate', num: '2.67%' },
              ],
            },
            {
              title: 'Organic + boosting',
              items: [
                { icon: '👁️', label: 'Impressions', num: '22.3M+' },
                { icon: '👆', label: 'Engagement', num: '3.53M+' },
                { icon: '📈', label: 'Eng. rate', num: '15.79%' },
              ],
            },
          ],
        },
      ],
    },
    {
      eyebrow: 'The work',
      blocks: [
        { type: 'heading2', style: 'font-size:22px;margin-bottom:2px;', html: 'A few frames from the launch.' },
        {
          type: 'creativesGrid',
          items: [
            { img: 'assets/case-studies/mars/creative-1.jpeg', tag: 'REEL', caption: 'Trailer', href: 'https://www.instagram.com/p/Cz86n6rNtiX/#advertiser' },
            { img: 'assets/case-studies/mars/creative-2.jpeg', tag: 'REEL', caption: 'Social cut', href: 'https://www.instagram.com/p/CzY3Wqct2ir/' },
            { img: 'assets/case-studies/mars/creative-3.jpeg', tag: 'REEL', caption: 'Social cut', href: 'https://www.instagram.com/p/Cz9AC3otdHJ/' },
            { img: 'assets/case-studies/mars/creative-4.jpeg', tag: 'POST', caption: 'Quote card', href: 'https://www.instagram.com/p/CzrG0ULNxWU/', isVideo: false },
          ],
        },
      ],
    },
  ],

  /* ── feed post chrome (right-hand info panel) ── */
  post: {
    username: 'aarushiagarwal',
    caption: `8 episodes. 24 assets. One story: real careers at Mars.

A two-part strategy: an 8-episode careers podcast featuring Mars employees' own journeys, backed by a tactical paid launch and an organic + boosting push across Instagram, Facebook, LinkedIn and TikTok.

24 social assets, all pulled from a full raw-content audit to find the strongest snippets — every post linking back to Spotify.

Paid launch: 4.68M+ impressions, 2.67% engagement rate.
Organic + boosting: 22.3M+ impressions, 15.79% engagement rate.

Swipe through for the full breakdown 👉`,
  },
});
