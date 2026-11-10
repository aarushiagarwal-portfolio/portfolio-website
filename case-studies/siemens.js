/* ══════════════════════════════════════
   CLIENT DATA — Siemens
   A pitch, not a live campaign — no impressions/engagement to report, so
   the results slide uses 'trophy' + 'statTiles' instead of 'dashboardGroup',
   and the final slide uses 'outcomeList' instead of a creatives grid. Both
   are generic block types available to any client, see case-study.js.
══════════════════════════════════════ */
window.CASE_STUDIES = window.CASE_STUDIES || [];

window.CASE_STUDIES.push({
  id: 'siemens',
  name: 'Siemens',
  logo: 'assets/case-studies/siemens/siemens-logo.png',

  /* ── designed carousel (B2 style): slide 1 is the grid tile, all 4 open in
     the viewer. Remove this to fall back to the tile + slides below. ── */
  slidePages: [
    'case-studies/Siemens/carousel/slide-1-cover.html',
    'case-studies/Siemens/carousel/slide-2-the-brief.html',
    'case-studies/Siemens/carousel/slide-3-pitch-scope.html',
    'case-studies/Siemens/carousel/slide-4-what-i-delivered.html',
  ],

  /* ── grid tile ── */
  eyebrow: 'New Business Pitch',
  tileBrief: 'Full rebrand strategy for Siemens Careers — pitched and won in 7 days.',
  tileResults: [
    { label: 'Timeline', num: '7 Days' },
    { label: 'Content Series', num: '4' },
    { label: 'Outcome', num: 'Won' },
  ],

  /* ── carousel (6 slides) ── */
  slides: [
    {
      eyebrow: 'Case study',
      blocks: [
        { type: 'logo', src: 'assets/case-studies/siemens/siemens-logo.png', alt: 'Siemens' },
        { type: 'heading1', html: 'New business<br>pitch.' },
        { type: 'skillTiles', items: ['Strategy', 'Pitch', 'Trends'] },
      ],
    },
    {
      eyebrow: 'The brief',
      blocks: [
        { type: 'heading2', html: '<span class="cs-mark">1st pitch.</span> In 7 days.' },
        { type: 'paragraph', html: 'Rebrand Siemens Careers Instagram to "Life at Siemens" — a comprehensive strategy covering content series, IG trend integration, a 90-day content calendar, and a transition plan to protect engagement during the name change.' },
      ],
    },
    {
      eyebrow: 'Pitch scope',
      blocks: [
        {
          type: 'specGrid',
          items: [
            { k: 'Timeline', v: '7 days' },
            { k: 'Platform', v: 'Instagram' },
            { k: 'Markets', v: '6 countries' },
            { k: 'Audience', v: '22–35' },
          ],
        },
        { type: 'paragraph', style: 'margin-top:14px;', html: 'Targeting <span class="cs-mark">engineers, tech enthusiasts and young professionals</span> exploring careers at Siemens.' },
      ],
    },
    {
      eyebrow: 'My role',
      blocks: [
        { type: 'heading2', style: 'font-size:22px;', html: 'Strategy, content <span class="cs-mark">and delivery.</span>' },
        {
          type: 'roleList',
          items: [
            'Analysed the pitch brief and developed the strategic approach',
            'Built a comprehensive pitch deck for the rebrand strategy',
            'Briefed creative team on content series concepts and visual direction',
            'Filmed and edited 3 trend videos adapted for the Siemens brand',
            'Presented transition strategy to protect engagement during rebrand',
            'Developed a 90-day content calendar and 4 series recommendations',
          ],
        },
      ],
    },
    {
      eyebrow: 'Pitch results',
      blocks: [
        {
          type: 'trophy',
          icon: '🏆',
          label: 'Pitch won.',
          sub: 'Successfully won my first new business pitch against competing agencies.',
        },
        {
          type: 'statTiles',
          items: [
            { icon: '⏱️', num: '7', label: 'Days prep' },
            { icon: '💡', num: '4', label: 'Content series' },
            { icon: '🎬', num: '3', label: 'Trend videos' },
            { icon: '🥇', num: 'Won', label: 'Outcome' },
          ],
        },
      ],
    },
    {
      eyebrow: 'Outcome',
      blocks: [
        { type: 'heading2', style: 'font-size:24px;', html: 'What winning <span class="cs-mark">this pitch</span> proved.' },
        {
          type: 'outcomeList',
          items: [
            { icon: '🎯', text: 'A full brand strategy and content plan delivered in 7 days, alongside active client work' },
            { icon: '📱', text: 'Trend-native content created and adapted for a corporate brand without losing authenticity' },
            { icon: '🤝', text: 'Cross-functional collaboration under time pressure — strategy, creative and client teams aligned in under a week' },
          ],
        },
      ],
    },
  ],

  /* ── feed post chrome (right-hand info panel) ── */
  post: {
    username: 'aarushiagarwal',
    caption: `7 days. 1 pitch. Won. 🏆

Full rebrand strategy for Siemens Careers Instagram — content series, trend videos, 90-day calendar, and a transition plan to protect engagement. All built from scratch while managing live client work.

This is what showing up under pressure looks like. Swipe through ➡️`,
  },
});
