/* ══════════════════════════════════════
   CLIENT DATA — RWE
   Template for future case studies: copy this file,
   swap the values, keep the same shape. See the
   comment block at the top of case-study.js for the
   two-step wiring (script tag + you're done), and for
   what block types are available for `slides`.
══════════════════════════════════════ */
window.CASE_STUDIES = window.CASE_STUDIES || [];

window.CASE_STUDIES.push({
  id: 'rwe',
  name: 'RWE',
  logo: 'assets/case-studies/rwe/rwe-logo.png',

  /* ── designed carousel (B2 style): slide 1 is the grid tile, all 6 open in
     the viewer. Remove this to fall back to the tile + slides below. ── */
  slidePages: [
    'case-studies/RWE/carousel/slide-1-cover.html',
    'case-studies/RWE/carousel/slide-2-the-brief.html',
    'case-studies/RWE/carousel/slide-3-campaign-scope.html',
    'case-studies/RWE/carousel/slide-4-my-role.html',
    'case-studies/RWE/carousel/slide-5-results.html',
    'case-studies/RWE/carousel/slide-6-the-work.html',
  ],

  /* ── grid tile ── */
  eyebrow: 'Always On Social',
  tileBrief: 'Retention through authentic, behind-the-scenes storytelling.',
  tileResults: [
    { label: 'Impressions', num: '37M+' },
    { label: 'Engagement', num: '10M+' },
    { label: 'Eng. rate', num: '27%' },
  ],

  /* ── carousel (6 slides) ── */
  slides: [
    {
      eyebrow: 'Case study',
      blocks: [
        { type: 'logo', src: 'assets/case-studies/rwe/rwe-logo.png', alt: 'RWE' },
        { type: 'heading1', html: 'Always-on<br>social.' },
        { type: 'skillTiles', items: ['Strategy', 'Content', 'Reporting'] },
      ],
    },
    {
      eyebrow: 'The brief',
      blocks: [
        { type: 'heading2', html: 'Make RWE\'s people <span class="cs-mark">impossible to ignore.</span>' },
        { type: 'paragraph', html: 'Retention starts with pride. The goal was authentic, behind-the-scenes storytelling that puts RWE\'s culture, not just its logo, in front of the talent it needs.' },
      ],
    },
    {
      eyebrow: 'Campaign scope',
      blocks: [
        {
          type: 'specGrid',
          items: [
            { k: 'Duration', v: '12 months' },
            { k: 'Budget', v: '€90,000' },
            { k: 'Markets', v: '15 countries' },
            { k: 'Channels', icons: ['instagram', 'facebook', 'linkedin'] },
          ],
        },
        { type: 'paragraph', style: 'margin-top:14px;', html: 'Reaching <span class="cs-mark">engineers, technicians and IT talent</span> in renewable energy.' },
      ],
    },
    {
      eyebrow: 'My role',
      blocks: [
        { type: 'heading2', style: 'font-size:22px;', html: 'End-to-end <span class="cs-mark">ownership.</span>' },
        {
          type: 'roleList',
          items: [
            'Account strategy: annual planning, trend analysis, content recommendations',
            'Collaborated with creative team on new content series',
            'Managed monthly content planning, scheduling, publishing & community engagement',
            'Directed end-to-end video production, briefing to final approval',
            'Optimised content performance through paid boosting',
            'Managed client relationships, reporting, WIP calls & content approvals',
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
              title: 'Campaign dashboard',
              items: [
                { icon: '👁️', label: 'Impressions', num: '37M+' },
                { icon: '👆', label: 'Engagement', num: '10M+' },
                { icon: '📈', label: 'Eng. rate', num: '27%' },
              ],
            },
          ],
        },
      ],
    },
    {
      eyebrow: 'The work',
      blocks: [
        { type: 'heading2', style: 'font-size:22px;margin-bottom:2px;', html: 'A few frames from the year.' },
        {
          type: 'creativesGrid',
          items: [
            { img: 'assets/case-studies/rwe/creative-1.jpeg', tag: 'REEL', caption: 'Friendships day', href: 'https://www.instagram.com/rwe.global/reel/DMvAqnPKb-A/' },
            { img: 'assets/case-studies/rwe/creative-2.jpeg', tag: 'REEL', caption: 'This is us · trend', href: 'https://www.instagram.com/rwe.global/p/DXJ86kejLG3/' },
            { img: 'assets/case-studies/rwe/creative-3.jpeg', tag: 'REEL', caption: 'Day in the life', href: 'https://www.instagram.com/rwe.global/reel/DNBCRzHMPvr/' },
            { img: 'assets/case-studies/rwe/creative-4.jpeg', tag: 'REEL', caption: 'Career mobility', href: 'https://www.instagram.com/rwe.global/p/DMFz0SYOWvt/' },
          ],
        },
      ],
    },
  ],

  /* ── feed post chrome (right-hand info panel) ── */
  post: {
    username: 'aarushiagarwal',
    caption: `Case study: RWE's Always On Social 📊🔥

Over 12 months, I led a full-funnel employer branding campaign across Instagram, Facebook and LinkedIn — reaching engineers, technicians and IT talent in 15 countries.

The brief was to strengthen employee retention by putting RWE's people and culture front and centre, not just the brand.

The result was 37M+ impressions, 10M+ engagements, and a 27% engagement rate.

Swipe through for the full breakdown of strategy, execution and results 👉

#EmployerBranding #SocialMediaStrategy #ContentStrategy`,
  },
});
