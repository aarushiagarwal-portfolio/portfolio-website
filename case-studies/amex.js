/* ══════════════════════════════════════
   CLIENT DATA — American Express
   Standard 6-slide shape, same as RWE/adidas. The one structural difference:
   only 3 creative assets, so the creatives grid lays out as a single row
   instead of 2x2 — handled automatically by creativesGrid based on item
   count (see case-study.js), no per-client config needed.
══════════════════════════════════════ */
window.CASE_STUDIES = window.CASE_STUDIES || [];

window.CASE_STUDIES.push({
  id: 'amex',
  name: 'American Express',
  logo: 'assets/case-studies/amex/amex-logo.png',

  /* ── grid tile ── */
  eyebrow: 'Tech Talent Campaign',
  tileBrief: 'Paid social campaign building Amex\'s tech employer brand across 3 markets.',
  tileResults: [
    { label: 'Impressions', num: '40M+' },
    { label: 'Clicks', num: '11M+' },
    { label: 'CTR', num: '27.5%' },
  ],

  /* ── carousel (6 slides) ── */
  slides: [
    {
      eyebrow: 'Case study',
      blocks: [
        { type: 'logo', src: 'assets/case-studies/amex/amex-logo.png', alt: 'American Express' },
        { type: 'heading1', html: 'Paid social.<br>Tech talent.' },
        { type: 'skillTiles', items: ['Paid social', 'Strategy', 'Reporting'] },
      ],
    },
    {
      eyebrow: 'The brief',
      blocks: [
        { type: 'heading2', html: 'Build awareness of Amex\'s <span class="cs-mark">tech employer brand.</span>' },
        { type: 'paragraph', html: 'A 9-month always-on paid social campaign targeting tech talent across the US, UK and India — reaching software developers, IT professionals and engineers with 2 to 12+ years of experience.' },
      ],
    },
    {
      eyebrow: 'Campaign scope',
      blocks: [
        {
          type: 'specGrid',
          items: [
            { k: 'Duration', v: '9 months' },
            { k: 'Paid budget', v: '$335,000' },
            { k: 'Markets', v: 'US · UK · IN' },
            { k: 'Channels', icons: ['facebook', 'linkedin', 'reddit'] },
          ],
        },
        { type: 'paragraph', style: 'margin-top:14px;', html: 'Targeting <span class="cs-mark">tech talent</span> interested in software development, IT and engineering roles.' },
      ],
    },
    {
      eyebrow: 'My role',
      blocks: [
        { type: 'heading2', style: 'font-size:22px;', html: 'End-to-end <span class="cs-mark">ownership.</span>' },
        {
          type: 'roleList',
          items: [
            'Supported campaign strategy and executed paid social across LinkedIn, Meta and Reddit',
            'Created audience targeting and flight plans',
            'Content calendars and campaign timeline management',
            'Set up, monitored and optimised ads across all three platforms',
            'Generated campaign performance reports',
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
                { icon: '👁️', label: 'Impressions', num: '40M+' },
                { icon: '👆', label: 'Clicks', num: '11M+' },
                { icon: '📈', label: 'CTR', num: '27.5%' },
                { icon: '💰', label: 'CPC', num: '$1.3' },
              ],
            },
          ],
        },
      ],
    },
    {
      eyebrow: 'The work',
      blocks: [
        { type: 'heading2', style: 'font-size:22px;margin-bottom:2px;', html: 'Three markets, one message.' },
        {
          type: 'creativesGrid',
          items: [
            { img: 'assets/case-studies/amex/creative-1.jpeg', tag: 'POST', caption: 'US', href: 'https://www.instagram.com/p/DMz5duxsbKX/#advertiser', isVideo: false },
            { img: 'assets/case-studies/amex/creative-2.jpeg', tag: 'POST', caption: 'UK', href: 'https://www.instagram.com/p/DODonVpAOO4/#advertiser', isVideo: false },
            { img: 'assets/case-studies/amex/creative-3.jpeg', tag: 'POST', caption: 'India', href: 'https://www.instagram.com/p/DODqSzMjIuE/#advertiser', isVideo: false },
          ],
        },
      ],
    },
  ],

  /* ── feed post chrome (right-hand info panel) ── */
  post: {
    username: 'aarushiagarwal',
    caption: `9 months. 3 markets. 40M+ impressions. 11M+ clicks. 💳

Paid social tactical campaign for American Express, where the objective was to build awareness of the tech roles across Facebook, LinkedIn and Reddit, reaching engineers and developers across the US, UK and India.

Strategy, targeting, execution and reporting. Owned end to end.

Swipe through ➡️`,
  },
});
