const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const S=window.SITE,AS=window.ASSETS||{},im=p=>AS[p]||p,esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const first=S.name.split(' ')[0];$('#nm').textContent=first;
$('#eyebrow').textContent=S.hero.eyebrow;$('#h1').textContent=S.hero.headline;$('#lead').textContent=S.hero.lead;
const wa=t=>`https://wa.me/${S.whatsapp}?text=${encodeURIComponent(t)}`;
$('#wa').href=wa(S.whatsappMessage);$('#cv').href=S.cvFile;
$('#hpills').innerHTML=S.hero.pills.map(p=>`<span class="chip">${esc(p)}</span>`).join('');
$('#tools').innerHTML=[...S.tools,...S.tools].map(t=>`<span>${esc(t)}</span>`).join('');
$('#pic').src=im(S.images.casual);$('#ah').textContent=S.about.heading;
$('#ap').className='ap rv';$('#ap').innerHTML=S.about.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('');
$('#ind').innerHTML=S.industries.map(i=>`<span>${esc(i)}</span>`).join('');
$('#stats').innerHTML=S.stats.map(s=>`<div class="card rv"><b data-n="${s.count}" data-s="${s.suffix}">0</b><span>${esc(s.label)}</span></div>`).join('');
$('#vals').innerHTML=S.about.values.map(v=>`<div class="card rv"><h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></div>`).join('');
const E=S.education;$('#edu').innerHTML=`<h3>${esc(E.degree)}</h3><p>${esc(E.school)}, ${esc(E.years)}. Languages: ${esc(E.languages)}.</p><div class="skills">${E.highlights.map(h=>`<span>${esc(h)}</span>`).join('')}</div>`;
$('#svc').innerHTML=SERVICES.map(s=>`<button class="sv" aria-expanded="false"><h3>${esc(s.title)}</h3><p>${esc(s.summary)}</p><ul>${s.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul><span class="pl">+ Details</span></button>`).join('');
$('#svc').onclick=e=>{const b=e.target.closest('.sv');if(!b)return;const o=b.classList.toggle('open');b.setAttribute('aria-expanded',o);b.querySelector('.pl').textContent=o?'− Close':'+ Details'};
$('#tl').innerHTML=EXPERIENCE.map((j,i)=>`<div class="job rv ${i?'':'open'}"><button aria-expanded="${!i}"><div><h3>${esc(j.role)}</h3><small>${esc(j.company)}${j.place?' · '+esc(j.place):''}</small></div><span class="pd">${esc(j.period)}</span></button><ul>${j.bullets.map(b=>`<li>${esc(b)}</li>`).join('')}</ul></div>`).join('');
$('#tl').onclick=e=>{const b=e.target.closest('.job button');if(b){const o=b.parentNode.classList.toggle('open');b.setAttribute('aria-expanded',o)}};
$('#logos').innerHTML=BRANDS.map(l=>`<div class="logo rv"><img src="${im('images/brands/'+l[0]+'.png')}" alt="${esc(l[1])}" loading="lazy"></div>`).join('');
const gp=n=>im('images/gallery/g'+String(n).padStart(2,'0')+'.webp');{const st=document.createElement('style');st.textContent=Array.from({length:24},(_,i)=>`.gi${i+1}{background-image:url("${gp(i+1)}")}`).join('');document.head.append(st)}
const card=p=>`<a class="pp rv" href="proposals/${p.id}.html"><div class="im nodl"><img src="${im('images/proposals/'+p.folder+'/01.webp')}" alt="" loading="lazy"></div><div class="bd"><small>${esc(p.tag)}</small><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><span class="vl">View full plan · ${p.count} ${p.shape=='tall'?'pages':'slides'} →</span></div></a>`;
['strategy','pillars'].forEach(g=>{$('#pp-'+g).innerHTML=PROPOSALS.filter(p=>p.group==g).map(card).join('')});
$('#sitegrid').innerHTML=SITES.map(s=>`<a class="site rv" href="${s[2]}" target="_blank" rel="noopener"><div class="chrome"><i></i><i></i><i></i><small>${s[1]}</small></div><div class="pv ${s[5]?'q':''}">${s[5]?'':`<span class="nm">${esc(s[0])}</span>`}<img src="${im(s[4])}" alt="${esc(s[0])} website" loading="lazy" onerror="this.remove()"></div><h3>${esc(s[0])}</h3><p>${esc(s[3])}</p></a>`).join('')+`<div class="land rv"><b>${esc(LANDING.count)}</b><p>${esc(LANDING.text)}</p><small>🔒 ${esc(LANDING.note)}</small></div>`;
/* lightbox */
let L=[],cur=0;const lb=$('#lb');const show=i=>{cur=(i+L.length)%L.length;$('#lbi').style.backgroundImage=`url("${L[cur].src}")`;$('#lbi').setAttribute('aria-label',L[cur].cap||'Template preview');$('#lbc').textContent=L[cur].cap};
const openLB=(l,i)=>{L=l;show(i);lb.classList.add('open')};
$('.x').onclick=()=>lb.classList.remove('open');$('.p').onclick=()=>show(cur-1);$('.n').onclick=()=>show(cur+1);lb.onclick=e=>{if(e.target===lb)lb.classList.remove('open')};
/* portfolio */
let cat='all';$('#cats').innerHTML=[{id:'all',label:'All'},...CATEGORIES].map(c=>`<button class="chip" data-c="${c.id}">${esc(c.label)}</button>`).join('');
function drawPF(){$$('#cats .chip').forEach(c=>c.classList.toggle('on',c.dataset.c==cat));const l=PORTFOLIO.filter(p=>cat=='all'?!p.tabOnly:p.category==cat);
$('#pf').innerHTML=l.map((p,i)=>`<button data-i="${i}" aria-label="Enlarge ${esc(p.title)}"><img src="${im('images/work/'+p.image)}" alt="${esc(p.title)}: ${esc(p.text)}" loading="lazy"></button>`).join('');
$('#pf').onclick=e=>{const b=e.target.closest('button');if(b)openLB(l.map(p=>({src:im('images/work/'+p.image),cap:p.title+'. '+p.text})),+b.dataset.i)}}
$('#cats').onclick=e=>{const b=e.target.closest('button');if(b){cat=b.dataset.c;drawPF()}};drawPF();
const GL=Array.from({length:24},(_,i)=>i+1);
const row=a=>`<div class="row ${a}">${[...GL,...GL].map(s=>`<div class="ph gi${s}"></div>`).join('')}</div>`;
$('#gal').innerHTML=row('')+row('rev');
addEventListener('keydown',e=>{if(e.key=='Escape'){lb.classList.remove('open');$('#md').classList.remove('open')}if(!lb.classList.contains('open'))return;if(e.key=='ArrowRight')show(cur+1);if(e.key=='ArrowLeft')show(cur-1)});
/* cases */
$('#cs').innerHTML=CASES.map((c,i)=>`<button class="cs rv" data-i="${i}"><div class="im">${c.cover?`<img src="${im('images/work/'+c.cover)}" alt="" loading="lazy">`:''}</div><div class="bd"><small>${esc(c.tag)}</small><h3>${esc(c.title)}</h3><p>${esc(c.summary)}</p></div></button>`).join('');
$('#cs').onclick=e=>{const b=e.target.closest('.cs');if(!b)return;const c=CASES[+b.dataset.i],md=$('#md');
$('#mdb').innerHTML=`<button class="xx" aria-label="Close">✕</button><small style="color:var(--r);font-weight:600">${esc(c.tag)} · ${esc(c.industry)}</small><h2>${esc(c.title)}</h2><p class="meta">${esc(c.role)} · ${esc(c.period)}</p><div class="skills">${c.platforms.map(p=>`<span>${esc(p)}</span>`).join('')}</div>${c.results.length?`<h4>Results</h4><div class="res">${c.results.map(r=>`<div><b>${esc(r.value)}</b><span>${esc(r.label)}</span></div>`).join('')}</div>`:''}<h4>Challenge</h4><p>${esc(c.challenge)}</p><h4>What I did</h4><ul>${c.approach.map(a=>`<li>${esc(a)}</li>`).join('')}</ul>${c.gallery.length?`<h4>Samples</h4><div class="mg">${c.gallery.map((g,j)=>`<button data-j="${j}"><img src="${im('images/work/'+g)}" alt="" loading="lazy"></button>`).join('')}</div>`:''}`;
md.classList.add('open');md.scrollTop=0;$('#mdb .xx').onclick=()=>md.classList.remove('open');
$$('#mdb .mg button').forEach(x=>x.onclick=()=>openLB(c.gallery.map(g=>({src:im('images/work/'+g),cap:c.title})),+x.dataset.j))};
$('#md').onclick=e=>{if(e.target.id=='md')$('#md').classList.remove('open')};
/* guides */
let key='social',step=0;$('#tabs').innerHTML=Object.entries(GUIDES).map(([k,v])=>`<button class="chip" data-k="${k}">${v[0]}</button>`).join('');
function draw(scroll){const s=GUIDES[key][1];$$('#tabs .chip').forEach(c=>c.classList.toggle('on',c.dataset.k==key));
$('#flow').innerHTML=s.map((x,i)=>`<button class="node ${i<step?'done':''} ${i==step?'on':''}" data-i="${i}"><div class="d">${i+1}</div><span>${x[0]}</span></button>`).join('');
const c=s[step];$('#detail').innerHTML=`<div><h3>${esc(c[0])}</h3><p>${esc(c[1])}</p></div><ul>${c[2].map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;
if(scroll){const f=$('#flow'),n=$('#flow .on');f.scrollTo({left:n.offsetLeft-f.clientWidth/2+n.offsetWidth/2,behavior:'smooth'})}}
$('#tabs').onclick=e=>{const b=e.target.closest('button');if(b){key=b.dataset.k;step=0;draw()}};$('#flow').onclick=e=>{const b=e.target.closest('button');if(b){step=+b.dataset.i;draw(1)}};
$('#pv').onclick=()=>{step=Math.max(0,step-1);draw(1)};$('#nx').onclick=()=>{step=Math.min(GUIDES[key][1].length-1,step+1);draw(1)};draw();
$$('#hpills .chip').forEach((c,i)=>{const t=['social','social','social','email','email','web'][i];c.onclick=()=>{if(t){key=t;step=0;draw()}$('#'+(['social','social','social','guides','guides','guides'][i])).scrollIntoView()}});
/* testimonials + contact */
$('#tm').innerHTML=TESTIMONIALS.map(t=>`<div class="tq"><p>“${esc(t.quote)}”</p><div><span class="av">${esc(t.name[0])}</span><span><b>${esc(t.name)}</b><small>${esc(t.role)}</small></span></div></div>`).join('');
$('#cintro').textContent=S.contactIntro;$('#ft').textContent=S.footerTagline;
$('#cinfo').innerHTML=`<h3>Get in touch</h3><a href="mailto:${S.email}">${esc(S.email)}</a><a href="${wa(S.whatsappMessage)}" target="_blank" rel="noopener">WhatsApp ${esc(S.phoneDisplay)}</a><a href="${S.linkedin}" target="_blank" rel="noopener">LinkedIn</a><a href="${S.cvFile}" download>Download CV</a><p style="opacity:.6;margin:14px 0 0">${esc(S.location)}</p>`;
$('#navcta').href='#contact';
const msg=()=>`Hi ${first}, I'm ${$('#fn').value||'(name)'} (${$('#fe').value||'no email given'}).\n\n${$('#fm').value}`;
$('#fw').onclick=()=>open(wa(msg()),'_blank');$('#fx').onclick=()=>location.href=`mailto:${S.email}?subject=${encodeURIComponent('Marketing enquiry')}&body=${encodeURIComponent(msg())}`;
/* typing, reveal, counters, parallax, nav highlight */
const W=["manage your brand's social media every day.","design email and SMS campaigns that get clicked.","run Meta Ads with clear reporting.","build automations and websites that capture leads."];
let wi=0,ci=0,del=false;(function tick(){const w=W[wi];ci+=del?-1:1;$('#type').textContent=w.slice(0,ci);let d=del?22:48;if(!del&&ci==w.length){del=true;d=1600}else if(del&&ci==0){del=false;wi=(wi+1)%W.length;d=300}setTimeout(tick,d)})();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});$$('.rv').forEach(e=>io.observe(e));
const so=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,n=+el.dataset.n;let v=0;const st=n/40;const t=setInterval(()=>{v=Math.min(n,v+st);el.textContent=Math.round(v)+(el.dataset.s||'');if(v>=n)clearInterval(t)},30);so.unobserve(el)}),{threshold:.6});$$('[data-n]').forEach(e=>so.observe(e));
const bl=$$('.blob');addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;bl.forEach((b,i)=>b.style.transform=`translate(${x*(i+1)*50}px,${y*(i+1)*30}px)`)});
const secs=$$('main section[id]'),links=$$('nav a.l');addEventListener('scroll',()=>{let c='';secs.forEach(s=>{if(scrollY>=s.offsetTop-200)c=s.id});links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')=='#'+c))},{passive:true});

/* view-only protection */
document.addEventListener('contextmenu',e=>{if(e.target.closest('.nodl'))e.preventDefault()});document.addEventListener('dragstart',e=>{if(e.target.closest('.nodl'))e.preventDefault()});
