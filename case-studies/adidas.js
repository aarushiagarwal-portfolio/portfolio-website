/* ══════════════════════════════════════
   CLIENT DATA — adidas
   Standard 6-slide shape, same as RWE, but the results slide has a single
   dashboard with 5 rows (impressions, clicks, CTR, CPC, applications)
   instead of the usual 3 — dashboardGroup already supports any number of
   items per dashboard, so no component changes were needed. All 4
   creatives are static posts (isVideo: false), same pattern as Mars's
   quote card.
══════════════════════════════════════ */
window.CASE_STUDIES = window.CASE_STUDIES || [];

window.CASE_STUDIES.push({
  id: 'adidas',
  name: 'adidas',
  logo: 'assets/case-studies/adidas/adidas-logo.png',

  /* ── grid tile ── */
  eyebrow: 'Paid Social',
  tileBrief: 'Paid social campaign activating the new employer brand across 4 audiences, globally.',
  tileResults: [
    { label: 'Impressions', num: '61.5M+' },
    { label: 'Clicks', num: '1M+' },
    { label: 'Applications', num: '63.4K+' },
  ],

  /* ── carousel (6 slides) ── */
  slides: [
    {
      eyebrow: 'Case study',
      blocks: [
        { type: 'logo', src: 'assets/case-studies/adidas/adidas-logo.png', alt: 'adidas' },
        { type: 'heading1', html: 'Paid social.<br>Global scale.' },
        { type: 'skillTiles', items: ['Paid social', 'Strategy', 'Reporting'] },
      ],
    },
    {
      eyebrow: 'The brief',
      blocks: [
        { type: 'heading2', html: 'Bring the new employer brand <span class="cs-mark">to life.</span>' },
        { type: 'paragraph', html: 'Activate paid social content targeting external talent across four audiences: Always On, Early Careers, Retail, and Digital & Tech — all running simultaneously across 13 countries.' },
      ],
    },
    {
      eyebrow: 'Campaign scope',
      blocks: [
        {
          type: 'specGrid',
          items: [
            { k: 'Duration', v: '9 months' },
            { k: 'Paid budget', v: '€84,460' },
            { k: 'Markets', v: '13 countries' },
            { k: 'Channels', icons: ['instagram', 'facebook', 'linkedin'] },
          ],
        },
        { type: 'paragraph', style: 'margin-top:14px;', html: 'Four audiences, one brand: <span class="cs-mark">Global, Early Careers, Retail, and Digital & Tech.</span>' },
      ],
    },
    {
      eyebrow: 'My role',
      blocks: [
        { type: 'heading2', style: 'font-size:22px;', html: 'End-to-end <span class="cs-mark">ownership.</span>' },
        {
          type: 'roleList',
          items: [
            'Monthly content calendars across the full 9-month campaign flight',
            'Set up and optimised 50+ paid ads across Meta and LinkedIn monthly',
            'Data-driven optimisations: audience refinements and creative testing',
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
                { icon: '👁️', label: 'Impressions', num: '61.5M+' },
                { icon: '👆', label: 'Clicks', num: '1M+' },
                { icon: '📈', label: 'CTR', num: '2.13%' },
                { icon: '💰', label: 'CPC', num: '€0.13' },
                { icon: '📋', label: 'Applications', num: '63.4K+' },
              ],
            },
          ],
        },
      ],
    },
    {
      eyebrow: 'The work',
      blocks: [
        { type: 'heading2', style: 'font-size:22px;margin-bottom:2px;', html: 'Four audiences, one brand.' },
        {
          type: 'creativesGrid',
          items: [
            { img: 'assets/case-studies/adidas/creative-1.jpeg', tag: 'POST', caption: 'Global', href: 'https://www.instagram.com/p/Cuj_R7ENunk/#advertiser', isVideo: false },
            { img: 'assets/case-studies/adidas/creative-2.jpeg', tag: 'POST', caption: 'Retail', href: 'https://www.instagram.com/p/CumjooJNT1e/#advertiser', isVideo: false },
            { img: 'assets/case-studies/adidas/creative-3.jpeg', tag: 'POST', caption: 'Digital & Tech', href: 'https://www.instagram.com/p/Corw1hujRMj/#advertiser', isVideo: false },
            { img: 'assets/case-studies/adidas/creative-4.jpeg', tag: 'POST', caption: 'Early Careers', href: 'https://www.instagram.com/p/Cs_i5bXtyC5/#advertiser', isVideo: false },
          ],
        },
      ],
    },
  ],

  /* ── feed post chrome (right-hand info panel) ── */
  post: {
    username: 'aarushiagarwal',
    caption: `9 months. 13 countries. 4 audiences. 50+ ads per month. 🖤

Four audiences, four different stories, Global, Early Careers, Retail, Digital & Tech. All running simultaneously across 13 countries. Every month: new ads, new optimisations, new content calendars.

The results spoke for themselves: 61.5M+ impressions, over a million clicks, and 63,000+ applications driven directly through the campaign.

Swipe to see how it all came together.`,
  },
});
