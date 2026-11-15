/* Effets locaux, déterministes : SV.seek(t) produit toujours la même image.
 * Aucun changement du moteur partagé ; compatible avec son rendu Playwright.
 */
(() => {
  const clamp = n => Math.max(0,Math.min(1,n));
  const boot = () => {
    if (window.SV?.error) return;
    if (!window.SV?.ready) return requestAnimationFrame(boot);
    const sv = window.SV, seek = sv.seek.bind(sv);
    const beat = id => sv.state.tm.byId[id];
    const t0 = id => beat(id).start;
    const wordTime = (id,fragment) => {
      const words = beat(id).text.split(/\s+/);
      const i = words.findIndex(w => w.includes(fragment));
      return beat(id).words[Math.max(0,i)][0];
    };
    const flow = document.getElementById("flow-path");
    const flowLength = flow.getTotalLength();
    const chain = document.getElementById("chain-path");
    const chainLength = chain.getTotalLength();
    const outro = sv.state.outroA;
    // Plans dirigés : chaque proposition garde un cadrage stable. La caméra
    // existante reste disponible pour les autres vidéos du dépôt.
    const shots = [
      { at:0, s:.96, cx:540, cy:440 },
      { at:t0("b3")-.3, s:1.75, cx:278, cy:555 },
      { at:t0("b4")-.3, s:1.75, cx:832, cy:576 },
      { at:t0("b7")-.4, s:.91, cx:540, cy:580 },
      { at:t0("b9")-.3, s:1.85, cx:866, cy:1115 },
      { at:t0("b11")-.35, s:1.85, cx:540, cy:1115 },
      { at:t0("b12")-.25, s:.91, cx:540, cy:1118 },
      { at:t0("b13")-.3, s:1.85, cx:214, cy:1115 },
      { at:t0("b14")+.6, s:.91, cx:540, cy:1118 },
      { at:t0("b15")-.35, s:1.36, cx:375, cy:1530 },
      { at:t0("b16")-.2, s:1.65, cx:855, cy:1570 },
      { at:t0("b17")-.35, s:1.36, cx:375, cy:1575 },
      { at:t0("b18")-.3, s:.94, cx:540, cy:1585 },
      { at:outro, s:1, cx:540, cy:960, final:true },
    ];
    const ease=p=>p<.5 ? 4*p*p*p : 1-Math.pow(-2*p+2,3)/2;
    const cameraAt=t=>{
      let i=0;
      while(i<shots.length-1 && t>=shots[i+1].at)i++;
      const shot=shots[i], prev=shots[Math.max(0,i-1)];
      const p=ease(clamp((t-shot.at)/(shot.final?2.5:1.1)));
      const s=Math.exp(Math.log(prev.s)+(Math.log(shot.s)-Math.log(prev.s))*p);
      const cx=prev.cx+(shot.cx-prev.cx)*p, cy=prev.cy+(shot.cy-prev.cy)*p;
      const finalBlend=shot.final?p:0;
      const screenX=480+60*finalBlend,screenY=750+210*finalBlend;
      sv.state.poster.style.transform=`translate(${screenX-cx*s}px,${screenY-cy*s}px) scale(${s})`;
    };
    function particles(nodes,path,length,t,start,period) {
      nodes.forEach((node,i) => {
        const elapsed=t-start-i*.16;
        const phase=((elapsed/period+i/nodes.length)%1+1)%1;
        const p=path.getPointAtLength(phase*length);
        node.setAttribute("cx",p.x);node.setAttribute("cy",p.y);
        node.style.opacity=elapsed>=0 && t<outro ? clamp(elapsed*2)*.85 : 0;
      });
    }
    const drops=[...document.querySelectorAll("[data-flow]")];
    const chainDrops=[...document.querySelectorAll("[data-chain-flow]")];
    sv.seek = t => {
      seek(t);
      cameraAt(t);
      particles(drops,flow,flowLength,t,wordTime("b7","Verwechslung")+.8,3.1);
      particles(chainDrops,chain,chainLength,t,wordTime("b14","السبيطار")+1,4.6);
      const minutes=Math.max(0,Math.min(t,outro)-t0("b9"));
      document.getElementById("clock-motion").setAttribute("transform",`rotate(${minutes*14},148,67)`);
      const ecg=document.getElementById("ecg-dot");
      const phase=((t-t0("b3"))%2.3+2.3)%2.3/2.3;
      ecg.setAttribute("cx",310+70*phase);
      ecg.setAttribute("cy",38+Math.sin(phase*Math.PI*4)*5);
      ecg.style.opacity=t>=t0("b3") && t<outro ? .9 : 0;
    };
    const button=document.getElementById("poster-switch");
    let posterMode=new URLSearchParams(location.search).has("poster");
    const update=()=>{
      document.body.classList.toggle("poster-view",posterMode);
      button.textContent=posterMode ? "Revenir à l’animation" : "Voir le poster complet";
      if(posterMode) {
        const pause=document.getElementById("pp");
        if(pause?.textContent.includes("Pause"))pause.click();
        sv.seek(sv.duration);
      } else sv.seek(0);
    };
    button.addEventListener("click",()=>{posterMode=!posterMode;update();});
    if(posterMode)update();else sv.seek(sv.state.t || 0);
    sv.motionReady=true;
  };
  boot();
})();
