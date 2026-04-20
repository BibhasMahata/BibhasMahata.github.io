/* ═══════════════════════════════════════════════════
   BIBHAS MAHATA — Portfolio JS
   Cursor · Constellation · Radar · Bars · BarChart · Typewriter
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── CURSOR ─────────────────────────────────── */
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx+'px'; dot.style.top = my+'px';
  });
  (function loop(){ rx+=(mx-rx)*.1; ry+=(my-ry)*.1; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop); })();
  document.querySelectorAll('a,button,.tag,.skill-item,.proj-card,.fact,.contact-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
  });

  /* ─── NAV ────────────────────────────────────── */
  const nav = document.getElementById('nav');
  const navAs = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('stuck', window.scrollY > 50);
  }, {passive:true});

  /* ─── ACTIVE NAV ─────────────────────────────── */
  const secs = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let cur = '';
    secs.forEach(s => { if(window.scrollY >= s.offsetTop - 160) cur = s.id; });
    navAs.forEach(a => { a.classList.toggle('active', a.getAttribute('href')==='#'+cur); });
  }, {passive:true});

  /* ─── TYPEWRITER ─────────────────────────────── */
  const phrases = ['Full Stack Developer','Backend Engineer','ML Researcher','Open to Opportunities'];
  const tw = document.getElementById('typewriter');
  let pi=0, ci=0, del=false;
  function type(){
    const p = phrases[pi%phrases.length];
    if(!del){ tw.textContent=p.slice(0,++ci); if(ci===p.length){del=true;setTimeout(type,1900);return;} setTimeout(type,75); }
    else { tw.textContent=p.slice(0,--ci); if(ci===0){del=false;pi++;setTimeout(type,350);return;} setTimeout(type,35); }
  }
  setTimeout(type, 1300);

  /* ─── CONSTELLATION ──────────────────────────── */
  const cvs = document.getElementById('constellation-canvas');
  if(cvs){
    const ctx = cvs.getContext('2d');
    let W,H,pts=[];
    function rsz(){ W=cvs.width=cvs.offsetWidth; H=cvs.height=cvs.offsetHeight; init(); }
    function init(){
      const n = Math.floor(W*H/10000);
      pts = Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28,r:Math.random()*1.2+.4}));
    }
    rsz();
    window.addEventListener('resize', rsz);
    let cmx=-999,cmy=-999;
    document.addEventListener('mousemove',e=>{const r=cvs.getBoundingClientRect();cmx=e.clientX-r.left;cmy=e.clientY-r.top;});
    const DIST=120;
    (function draw(){
      ctx.clearRect(0,0,W,H);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0;
        if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        const dx=p.x-cmx,dy=p.y-cmy,d=Math.sqrt(dx*dx+dy*dy);
        if(d<90){p.x+=dx/d*1.2;p.y+=dy/d*1.2;}
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle='rgba(201,246,62,.6)'; ctx.fill();
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<DIST){ ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
          ctx.strokeStyle=`rgba(201,246,62,${.15*(1-d/DIST)})`; ctx.lineWidth=.5; ctx.stroke(); }
      }
      requestAnimationFrame(draw);
    })();
  }

  /* ─── RADAR FACTORY ──────────────────────────── */
  function buildRadar(id, size, animated){
    const el = document.getElementById(id); if(!el) return;
    const c = el.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
   el.width = size * dpr; el.height = size * dpr;
   el.style.width = size + 'px'; el.style.height = size + 'px';
   c.scale(dpr, dpr);
    const cx=size/2, cy=size/2, R=size*.38;
    const labels = ['Frontend','Backend','DSA','ML / AI','Sys. Design','Databases'];
    const vals   = [.82,.78,.72,.75,.60,.76];
    const colors = ['#c9f63e','#e96040','#80bcff','#a78bfa','rgba(201,246,62,.55)','rgba(233,96,64,.55)'];
    const N=labels.length;
    let t=0, started=false;

    function pt(i,f){ const a=(Math.PI*2*i/N)-Math.PI/2; return{x:cx+Math.cos(a)*R*f,y:cy+Math.sin(a)*R*f}; }

    function draw(t){
      c.clearRect(0,0,size,size);
      const e=Math.min(t,1);
      [.25,.5,.75,1].forEach(r=>{
        c.beginPath(); for(let i=0;i<N;i++){const p=pt(i,r); i===0?c.moveTo(p.x,p.y):c.lineTo(p.x,p.y);} c.closePath();
        c.strokeStyle='rgba(230,226,216,.07)'; c.lineWidth=1; c.stroke();
      });
      for(let i=0;i<N;i++){const p=pt(i,1);c.beginPath();c.moveTo(cx,cy);c.lineTo(p.x,p.y);c.strokeStyle='rgba(230,226,216,.06)';c.lineWidth=1;c.stroke();}
      c.beginPath(); for(let i=0;i<N;i++){const p=pt(i,vals[i]*e);i===0?c.moveTo(p.x,p.y):c.lineTo(p.x,p.y);} c.closePath();
      c.fillStyle='rgba(201,246,62,.1)'; c.strokeStyle='rgba(201,246,62,.75)'; c.lineWidth=1.5; c.fill(); c.stroke();
      for(let i=0;i<N;i++){const p=pt(i,vals[i]*e);c.beginPath();c.arc(p.x,p.y,4,0,Math.PI*2);c.fillStyle=colors[i];c.fill();}
      const fs = Math.max(8, size*.032);
      c.font=`${fs}px "JetBrains Mono",monospace`; c.fillStyle='rgba(230,226,216,.5)'; c.textAlign='center'; c.textBaseline='middle';
      for(let i=0;i<N;i++){const p=pt(i,1.28);c.fillText(labels[i],p.x,p.y);}
    }

    if(animated){
      const obs = new IntersectionObserver(entries=>{
        entries.forEach(en=>{
          if(en.isIntersecting && !started){
            started=true;
            (function a(){t+=.02;draw(t);if(t<1)requestAnimationFrame(a);})();
            obs.unobserve(el);
          }
        });
      },{threshold:.2});
      obs.observe(el);
    } else {
      setTimeout(()=>{(function a(){t+=.02;draw(t);if(t<1)requestAnimationFrame(a);})();}, 1350);
    }
  }

  buildRadar('radar-hero', 220, false);
  buildRadar('radar-about', 260, true);

  /* ─── SKILL BARS ─────────────────────────────── */
  const fills = document.querySelectorAll('.skill-fill');
  const bObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ setTimeout(()=>{e.target.style.width=e.target.dataset.pct+'%';},80); bObs.unobserve(e.target); }
    });
  },{threshold:.3});
  fills.forEach(f=>bObs.observe(f));

  /* ─── BAR CHART ──────────────────────────────── */
  const sc = document.getElementById('skill-chart');
  if(sc){
    const ctx2 = sc.getContext('2d');
    function sizeChart(){
      const W2 = sc.parentElement.clientWidth - 40;
      const H2 = 180;
      sc.width = W2; sc.height = H2;
      return {W2, H2};
    }
    const data=[{l:'JS/React',v:82},{l:'Node/Express',v:78},{l:'Python/ML',v:75},{l:'MongoDB/SQL',v:72},{l:'DSA',v:68},{l:'Git/Ops',v:64}];
    let cT=0,cStarted=false;
    const cObs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting && !cStarted){
          cStarted=true;
          const {W2,H2}=sizeChart();
          const pad={t:18,r:10,b:36,l:8};
          const bw=(W2-pad.l-pad.r)/data.length;
          const maxH=H2-pad.t-pad.b;
          function draw(){
            ctx2.clearRect(0,0,W2,H2);
            const ease=Math.min(cT,1);
            data.forEach((d,i)=>{
              const bW=bw*.64, x=pad.l+i*bw+bw*.18, h=(d.v/100)*maxH*ease, y=pad.t+maxH-h;
              const g=ctx2.createLinearGradient(x,y,x,y+h);
              g.addColorStop(0,'rgba(201,246,62,.88)'); g.addColorStop(1,'rgba(201,246,62,.22)');
              ctx2.fillStyle=g; ctx2.beginPath();
              if(ctx2.roundRect) ctx2.roundRect(x,y,bW,h,[2,2,0,0]); else ctx2.rect(x,y,bW,h);
              ctx2.fill();
              if(ease>.45){ ctx2.font='500 9px "JetBrains Mono",monospace'; ctx2.fillStyle='rgba(201,246,62,.85)'; ctx2.textAlign='center'; ctx2.fillText(Math.round(d.v*ease)+'%',x+bW/2,y-5); }
              ctx2.font='8.5px "JetBrains Mono",monospace'; ctx2.fillStyle='rgba(230,226,216,.38)'; ctx2.textAlign='center'; ctx2.fillText(d.l,x+bW/2,H2-pad.b+13);
            });
            ctx2.beginPath(); ctx2.moveTo(pad.l,pad.t+maxH); ctx2.lineTo(W2-pad.r,pad.t+maxH);
            ctx2.strokeStyle='rgba(230,226,216,.08)'; ctx2.lineWidth=1; ctx2.stroke();
          }
          (function animate(){ cT+=.022; draw(); if(cT<1) requestAnimationFrame(animate); })();
          cObs.unobserve(sc);
        }
      });
    },{threshold:.2});
    cObs.observe(sc);
  }

  /* ─── SCROLL REVEALS ─────────────────────────── */
  const rvs = document.querySelectorAll('.rv,.rl');
  const rObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('in');rObs.unobserve(e.target);} });
  },{threshold:.1});
  rvs.forEach(el=>rObs.observe(el));

});
