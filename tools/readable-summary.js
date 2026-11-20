/* Writes a plain-text copy of the portfolio (case studies, skills, reviews,
   reels) into index.html, between the READABLE SUMMARY markers. It's hidden
   on screen but read by screen readers, recruiter tools and AI screeners,
   which don't see the designed slides (they're iframes drawn by JavaScript).
   Run it after changing a case study, review, skill or reel:
     node tools/readable-summary.js                                         */
const fs=require('fs'),vm=require('vm');
const root=require('path').join(__dirname,'..');
const ctx={window:{},console};vm.createContext(ctx);
for(const f of ['rwe','mars','siemens','adidas','amex']) vm.runInContext(fs.readFileSync(root+'/case-studies/'+f+'.js','utf8'),ctx);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const strip=s=>esc(String(s).replace(/<[^>]+>/g,'')).replace(/[\u{1F300}-\u{1FAFF}☀-➿️]/gu,'').replace(/ +\n/g,'\n').replace(/Swipe through ?/g,'').replace(/^Case study: /,'').trim();
let out=['<section class="sr-only" aria-labelledby="sumTitle">','<h2 id="sumTitle">Case studies</h2>'];
for(const d of ctx.window.CASE_STUDIES){
  out.push('<article>');
  out.push(`<h3>${esc(d.name)}: ${esc(d.eyebrow||'')}</h3>`);
  if(d.tileBrief) out.push(`<p>${esc(d.tileBrief)}</p>`);
  if(d.tileResults) out.push(`<p>Results: ${d.tileResults.map(r=>esc(r.num+' '+r.label.toLowerCase())).join(', ')}.</p>`);
  const roles=(d.slides||[]).flatMap(s=>s.blocks||[]).filter(b=>b.type==='roleList').flatMap(b=>b.items);
  if(roles.length) out.push('<p>My role:</p><ul>'+roles.map(r=>`<li>${strip(r)}</li>`).join('')+'</ul>');
  if(d.post&&d.post.caption) out.push(`<p>${strip(d.post.caption).replace(/\n+/g,' ')}</p>`);
  out.push('</article>');
}
out.push('</section>');
const part1=out.join('\n');
// skills, reviews, reels
const sj=fs.readFileSync(root+'/script.js','utf8');
const st=sj.slice(sj.indexOf('const STORIES = {')+'const STORIES = '.length, sj.indexOf('\n};', sj.indexOf('const STORIES = {'))+2);
const STORIES=vm.runInNewContext('LINKEDIN_URL="";('+st+')');
const sk=STORIES.skills.flatMap(s=>s.search||[]);
const by=k=>sk.filter(x=>x.sub===k).map(x=>esc(x.title)).join(', ');
const extra=['<section class="sr-only" aria-labelledby="sumSkills">','<h2 id="sumSkills">Skills</h2>',
`<p>Platforms: ${by('Platform')}.</p>`,`<p>Tools: ${by('Tool')}.</p>`,`<p>Certifications: ${by('Certification')}.</p>`,
'</section>','<section class="sr-only" aria-labelledby="sumReviews">','<h2 id="sumReviews">Reviews</h2>',
...STORIES.reviews.map(r=>`<blockquote><p>${esc(r.quote.replace(/^"|"$/g,''))}</p><footer>${esc(r.name)}, ${esc(r.role)}</footer></blockquote>`),
'</section>'];
const rj=fs.readFileSync(root+'/reels.js','utf8');
const labels=[...rj.matchAll(/\{ label: '((?:[^'\\]|\\.)+)'/g)].map(m=>m[1].replace(/\\'/g,"'")).slice(0,6);
extra.push('<section class="sr-only" aria-labelledby="sumReels">','<h2 id="sumReels">Reels: personal creator channel @aarushis.life</h2>',
`<p>My own TikTok content about London cafés and places, not client work: ${labels.map(esc).join('; ')}.</p>`,'</section>');
const html=part1+'\n'+extra.join('\n');
const idx=root+'/index.html', START='<!-- READABLE SUMMARY START -->', END='<!-- READABLE SUMMARY END -->';
const page=fs.readFileSync(idx,'utf8'), a=page.indexOf(START), b=page.indexOf(END);
if(a<0||b<a) throw new Error('Markers not found in index.html');
fs.writeFileSync(idx, page.slice(0,a+START.length)+'\n'+html+'\n'+page.slice(b));
console.log('Updated the readable summary in index.html');
