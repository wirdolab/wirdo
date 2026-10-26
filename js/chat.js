// ── CHAT ENGINE
const svcs = {
  marketing:{
    name:'Quantum Marketing System', icon:'#i-signal',
    kw:['marketing','redes','social','instagram','tiktok','facebook','ads','publicidad','branding','posicionamiento','seo','sem','email','community','contenido','audiencia','seguidores','engagement','marca','identidad','crecer','ventas','digital','campaña','anuncio','promocion','reels','youtube','linkedin'],
    res:{es:'Sí, podemos ayudarte. Con el Quantum Marketing System diseñamos estrategia completa: branding, paid ads en Meta/Google/TikTok, SEO, community management y presencia en todas las plataformas.',
         en:'Yes, we can help. With the Quantum Marketing System we design a complete strategy: branding, paid ads on Meta/Google/TikTok, SEO, community management and presence on all platforms.'}
  },
  aidev:{
    name:'AI Development & Automation', icon:'#i-cpu',
    kw:['app','aplicación','automatizar','automatización','bot','chatbot','agente','software','desarrollo','ia','ai','sistema','proceso','integración','api','programar','código','whatsapp','tecnología','plataforma','web','workflow','automatico','robot'],
    res:{es:'Perfecto, es exactamente lo que construimos. AI Dev: apps a medida, sistemas agénticos, integraciones WhatsApp AI y automatización de procesos — 50% más rápido.',
         en:'Perfect, that\'s exactly what we build. AI Dev: custom apps, agentic systems, WhatsApp AI integrations and process automation — 50% faster.'}
  },
  creative:{
    name:'AI Creative Studio', icon:'#i-film',
    kw:['video','contenido','imagen','foto','diseño','visual','producción','cinemat','creativo','reels','shorts','fotografía','gráfico','arte','render','animación','motion','post','audiovisual','clip'],
    res:{es:'Sí. AI Creative Studio produce cualquier contenido audiovisual con IA: posts, reels, arte generativo, videos cinemáticos profesionales — en fracción del tiempo habitual.',
         en:'Yes. AI Creative Studio produces any audiovisual content with AI: posts, reels, generative art, professional cinematic videos — in a fraction of the usual time.'}
  },
  ugc:{
    name:'Influencer & UGC Hub', icon:'#i-users',
    kw:['influencer','ugc','creador','colaboración','embajador','review','reseña','testimonio','viral','orgánico','creator'],
    res:{es:'Claro. Influencer & UGC Hub conecta tu marca con creators reales para campañas de UGC y marketing de influencers que generan confianza y conversiones auténticas.',
         en:'Absolutely. Influencer & UGC Hub connects your brand with real creators for UGC campaigns and influencer marketing that builds trust and authentic conversions.'}
  }
};

function addMsg(text, type, extra) {
  const msgs = document.getElementById('chat-msgs');
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  const lbl = document.createElement('span'); lbl.className = 'ml';
  lbl.textContent = type==='bot' ? 'wirdö AI' : 'Tú';
  const bubble = document.createElement('div'); bubble.className = 'mb';
  bubble.textContent = text;
  div.appendChild(lbl); div.appendChild(bubble);
  if (extra) div.appendChild(extra);
  msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight;
}
function addTyping() {
  const msgs = document.getElementById('chat-msgs');
  const d = document.createElement('div'); d.className='msg bot'; d.id='typing';
  const b = document.createElement('div'); b.className='mb';
  b.innerHTML='<div class="tdots"><span></span><span></span><span></span></div>';
  d.appendChild(b); msgs.appendChild(d); msgs.scrollTop=msgs.scrollHeight;
}
function removeTyping(){ const t=document.getElementById('typing'); if(t) t.remove(); }
function makePills(svcKey) {
  const s = svcs[svcKey]; const pills = document.createElement('div'); pills.className='cpills'; pills.style.marginTop='10px';
  const a = document.createElement('a'); a.href='#services'; a.className='cp';
  a.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><use href="'+s.icon+'"/></svg>'+s.name;
  pills.appendChild(a); return pills;
}
function selSvc(key) {
  const lang = document.documentElement.getAttribute('data-lang')||'es';
  const s = svcs[key]; addMsg(s.name,'usr'); addTyping();
  setTimeout(function(){ removeTyping(); addMsg(s.res[lang],'bot',makePills(key)); }, 900);
}
function matchSvc(q) {
  const norm = q.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  let best=null, score=0;
  for (const [k,s] of Object.entries(svcs)) {
    const n = s.kw.filter(kw=>norm.includes(kw)).length;
    if (n>score){ score=n; best=k; }
  }
  return score>0 ? best : null;
}
function sendMsg() {
  const inp = document.getElementById('cin'); const txt = inp.value.trim();
  if (!txt) return; inp.value='';
  const lang = document.documentElement.getAttribute('data-lang')||'es';
  addMsg(txt,'usr'); addTyping();
  setTimeout(function() {
    removeTyping();
    const m = matchSvc(txt);
    if (m) { addMsg(svcs[m].res[lang],'bot',makePills(m)); }
    else {
      const pills = document.createElement('div'); pills.className='cpills'; pills.style.marginTop='10px';
      for (const [k,s] of Object.entries(svcs)) {
        const btn=document.createElement('button'); btn.className='cp'; btn.onclick=function(){selSvc(k);};
        btn.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><use href="'+s.icon+'"/></svg>'+s.name;
        pills.appendChild(btn);
      }
      const noMatch = lang==='es' ? 'Estos son nuestros servicios actuales. ¿Alguno se acerca a lo que buscas?' : 'These are our current services. Does any of them match what you\'re looking for?';
      addMsg(noMatch,'bot',pills);
    }
  }, 1000);
}
document.getElementById('cin').addEventListener('keydown', function(e){ if(e.key==='Enter') sendMsg(); });
