/* Illustrations vectorielles originales. Encre + hachures, aucune image patient.
 * Les groupes sont animés par le moteur existant, les détails par motion.js.
 */
(() => {
  const NS = "http://www.w3.org/2000/svg";
  const ink = "#242521", gray = "#b6b9ad", paper = "#f7f6ee", yellow = "#f8ce4e";
  let seed = 410;
  const el = (tag, attrs = {}) => {
    const n = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    return n;
  };
  const group = (root, cue, attrs = {}) => {
    const g = el("g", { "data-at": cue, "data-anim": "draw", "data-dur": "1.15", ...attrs });
    root.append(g); return g;
  };
  const paint = (g, method, args, options = {}) => {
    const node = rough.svg(g.ownerSVGElement)[method](...args, {
      stroke: ink, strokeWidth: 2.1, roughness: .48, bowing: .4,
      seed: seed++, ...options,
    });
    node.querySelectorAll("path").forEach(p => {
      if (p.getAttribute("fill") !== "none" && p.getAttribute("stroke") === "none") p.dataset.fill = "1";
      else p.setAttribute("pathLength", "1");
    });
    g.append(node); return node;
  };
  const path = (g, d, o) => paint(g, "path", [d], o);
  const line = (g, a, b, o) => paint(g, "line", [...a, ...b], o);
  const ellipse = (g, x, y, w, h, o) => paint(g, "ellipse", [x, y, w, h], o);
  const rect = (g, x, y, w, h, o) => paint(g, "rectangle", [x, y, w, h], o);
  const solid = c => ({ fill: c, fillStyle: "solid" });
  const hatch = c => ({ fill:c, fillStyle:"hachure", hachureGap:5, fillWeight:1, hachureAngle:-40 });
  const text = (g, value, x, y, size = 15) => {
    const t = el("text", { x, y, fill:ink, stroke:"none", "font-family":"Kalam", "font-size":size, "font-weight":700 });
    t.textContent = value; g.append(t); return t;
  };

  // Patient, couverture, barrières du lit, perfusion et moniteur.
  const patient = document.getElementById("patient-art");
  const bed = group(patient, "b1@مريض", { "data-cam":"none" });
  path(bed, "M20 146V83Q20 73 29 73H36V146H374V119Q374 110 383 110H391V154H20Z", solid(paper));
  rect(bed, 29, 136, 354, 16, hatch(gray));
  line(bed, [41,154], [41,190]); line(bed, [369,154], [369,190]);
  ellipse(bed, 42, 194, 14, 13, solid(paper)); ellipse(bed, 369,194,14,13,solid(paper));
  rect(bed, 43, 95, 77, 32, solid(paper));
  const person = group(patient, "b1@مريض+0.25", { "data-cam":"none" });
  ellipse(person, 91, 77, 51, 49, solid(paper));
  path(person, "M70 68Q75 50 96 52Q117 54 118 76M82 80l5 2M101 78l5 1M90 93q9 4 15-1");
  path(person, "M117 94Q140 74 183 83L234 95Q289 87 343 126H114Z", hatch("#bfc2b3"));
  path(person, "M150 91q19 13 23 32M199 92l22 30M258 99l22 26", {stroke:gray,strokeWidth:1.4});
  path(person, "M130 103Q171 108 210 111L286 126Q310 126 321 135M130 112Q168 120 207 119L283 134Q302 141 321 140", solid(paper));
  line(person,[307,132],[325,132],{strokeWidth:1.4});
  const monitor = group(patient, "b3@Blutgruppe", {"data-cam":"none"});
  path(monitor,"M302 6H390Q397 6 397 14V68H296V14Q296 6 302 6Z",solid(paper));
  rect(monitor,304,14,84,43,{fill:"#eceee5",fillStyle:"solid",strokeWidth:1.5});
  path(monitor,"M310 38h14l5-8 7 20 8-30 7 18h29",{strokeWidth:1.7});
  line(monitor,[346,69],[346,98]); line(monitor,[326,99],[369,99]);
  const spark = el("circle",{id:"ecg-dot",cx:310,cy:38,r:3,fill:yellow}); monitor.append(spark);

  // Deux poches presque identiques, sans groupe sanguin imprimé sur la poche.
  const bags = document.getElementById("bag-art");
  function bag(g, x, y, w, h) {
    path(g, `M${x+12} ${y}H${x+w-12}Q${x+w} ${y} ${x+w} ${y+15}V${y+h-22}Q${x+w} ${y+h} ${x+w-20} ${y+h}H${x+20}Q${x} ${y+h} ${x} ${y+h-22}V${y+15}Q${x} ${y} ${x+12} ${y}Z`, solid(paper));
    path(g, `M${x+4} ${y+82}Q${x+w/2} ${y+74} ${x+w-4} ${y+82}V${y+h-22}Q${x+w-4} ${y+h-5} ${x+w-20} ${y+h-5}H${x+20}Q${x+4} ${y+h-5} ${x+4} ${y+h-22}Z`,hatch(gray));
    path(g,`M${x+w/2-14} ${y}V${y-13}H${x+w/2+14}V${y}M${x+w/2} ${y-13}V${y-25}`,{strokeWidth:2});
    ellipse(g,x+w/2,y-30,14,12);
    rect(g,x+17,y+35,w-34,35,solid(paper));
    text(g,"EK",x+36,y+59,18);
    for(let i=0;i<12;i++) line(g,[x+18+i*5,y+74],[x+18+i*5,y+84],{strokeWidth:i%3===0?2:1});
    path(g,`M${x+w/2-5} ${y+h}V${y+h+16}H${x+w/2+5}V${y+h}`,solid(paper));
  }
  const second = group(bags,"b5@الأكياس",{"data-anim":"slide","opacity":.65});
  bag(second,139,43,105,153);
  const first = group(bags,"b4@Konserve");
  bag(first,41,29,112,163);
  const paperG = group(bags,"b6@فالورقة");
  path(paperG,"M254 90L322 98L308 197L241 189Z",solid(paper));
  path(paperG,"M308 97L306 116L320 111",{strokeWidth:1.4});
  for(let i=0;i<5;i++) line(paperG,[254-i*1.2,119+i*12],[306-i*1.2,124+i*12],{strokeWidth:1.2,stroke:gray});
  line(paperG,[251,142],[302,148],{stroke:yellow,strokeWidth:10});
  line(paperG,[250,142],[297,147],{strokeWidth:1});
  path(paperG,"M233 177Q215 212 204 211M204 211l2-12M204 211l12-1",{strokeWidth:1.6});

  const tube = document.getElementById("tube-art");
  const tubing = group(tube,"b7@Verwechslung",{"data-cam":"none","data-dur":"1.8"});
  const tubeD = "M410 238C410 265 327 260 289 218S197 171 111 171H28";
  path(tubing,tubeD,{stroke:yellow,strokeWidth:9,roughness:.15});
  path(tubing,tubeD,{stroke:ink,strokeWidth:1.6,roughness:.15});
  const flow = el("path",{id:"flow-path",d:tubeD,fill:"none",stroke:"none"}); tube.append(flow);
  for(let i=0;i<6;i++)tube.append(el("circle",{"data-flow":i,r:3.3,fill:ink,opacity:0}));

  // Chaque barrière est une tranche en perspective ; les trous restent visibles.
  function barrier(svg, cue) {
    const g = group(svg,cue,{"data-cam":"none"});
    path(g,"M121 151L195 168V226L121 209Z",{...solid("#f8ce4e"),strokeWidth:1.8});
    path(g,"M121 151L102 161V219L121 209Z",hatch(gray));
    path(g,"M121 209L195 226L177 235L102 219Z",hatch(gray));
    ellipse(g,155,184,26,20,{...solid(paper),strokeWidth:1.4});
    ellipse(g,176,207,12,9,{...solid(paper),strokeWidth:1.2});
    ellipse(g,139,165,10,7,{...solid(paper),strokeWidth:1});
  }

  const fatigue = document.getElementById("fatigue-art");
  const clock = group(fatigue,"b9@الطبيبة");
  ellipse(clock,148,67,100,100,solid(paper));
  ellipse(clock,148,67,86,86,{stroke:gray,strokeWidth:1});
  for(let i=0;i<12;i++) {
    const a=i*Math.PI/6;
    line(clock,[148+37*Math.sin(a),67-37*Math.cos(a)],[148+41*Math.sin(a),67-41*Math.cos(a)],{strokeWidth:i%3===0?2:1});
  }
  path(clock,"M146 41L148 67L170 82",{strokeWidth:3});
  ellipse(clock,148,67,5,5,solid(ink));
  path(clock,"M125 116l-10 12M171 116l10 12M143 15V7H157V15",{strokeWidth:2});
  const hands = el("g",{id:"clock-motion"});
  hands.append(el("path",{d:"M148 67L148 35",fill:"none",stroke:yellow,"stroke-width":3,"stroke-linecap":"round"}));
  clock.append(hands);
  const stress = group(fatigue,"b10@Notdienst",{"data-cam":"none"});
  path(stress,"M213 33l8-9-3 15 10-9M213 57l15-3-8 9M83 39l-12-5M83 60l-14 2",{strokeWidth:2});
  barrier(fatigue,"b10@فاتت");

  const training = document.getElementById("training-art");
  const book = group(training,"b11@التكوين");
  path(book,"M148 38Q115 14 78 24V112Q118 104 148 124Q181 103 219 114V25Q181 14 148 38Z",solid(paper));
  path(book,"M148 38V124M81 119Q115 111 148 133Q185 113 219 121",{strokeWidth:2});
  for(let i=0;i<4;i++) {
    path(book,`M89 ${49+i*13}Q110 ${44+i*13} 134 ${56+i*13}`,{stroke:gray,strokeWidth:1});
    path(book,`M161 ${56+i*13}Q181 ${45+i*13} 207 ${48+i*13}`,{stroke:gray,strokeWidth:1});
  }
  const missing=group(training,"b11@دارتش",{"data-cam":"none"});
  ellipse(missing,219,100,47,47,solid(paper));
  path(missing,"M205 86L232 113M232 86L205 113",{strokeWidth:3.5});
  barrier(training,"b12@الخطأ");

  const organisation = document.getElementById("organisation-art");
  const hospital = group(organisation,"b13@Organisationsverschulden");
  path(hospital,"M92 125V49H120V23H181V49H211V125Z",solid(paper));
  path(hospital,"M139 125V97H163V125M143 36H158M150 29V44",{strokeWidth:2.4});
  for(const x of [103,132,161,190])for(const y of [61,79])rect(hospital,x,y,9,10,{strokeWidth:1,fill:"#e4e6db",fillStyle:"solid"});
  line(hospital,[80,126],[224,126]);
  path(hospital,"M83 53L72 53V117H81M219 57H230V117H220",{strokeWidth:1.2});
  const orgDetail=group(organisation,"b14@إدارة",{"data-cam":"none"});
  path(orgDetail,"M238 68h18v25h-18zM264 68h18v25h-18zM248 62v-7M273 62v-7M246 98l-12 18M273 98l-12 18",{strokeWidth:1.5});
  barrier(organisation,"b14@السبيطار");

  const chain=document.getElementById("chain-art");
  const chainG=group(chain,"b14@السبيطار",{"data-cam":"none","data-dur":"2"});
  const chainD="M948 65C909 48 849 56 817 61S720 78 658 67S549 51 491 61S374 78 321 67S218 51 165 61S77 72 31 59";
  path(chainG,chainD,{stroke:yellow,strokeWidth:10,roughness:.15});
  path(chainG,chainD,{stroke:ink,strokeWidth:1.7,roughness:.15});
  path(chainG,"M45 45L27 59L46 74",{strokeWidth:2.4});
  const chainPath=el("path",{id:"chain-path",d:chainD,fill:"none",stroke:"none"});chain.append(chainPath);
  for(let i=0;i<4;i++)chain.append(el("circle",{"data-chain-flow":i,r:4,fill:ink,opacity:0}));

  // Architecture judiciaire : fronton, colonnes cannelées, soubassement.
  const justice = document.getElementById("justice-art");
  const courthouse = group(justice,"b15@fahrlässige",{"data-cam":"none","data-dur":"1.6"});
  path(courthouse,"M29 77L155 17L281 77Z",solid(paper));
  path(courthouse,"M54 70L155 30L256 70Z",hatch(gray));
  rect(courthouse,34,82,242,11,solid(paper));
  for(const x of [54,108,169,224]) {
    path(courthouse,`M${x} 96H${x+25}L${x+23} 157H${x+2}Z`,solid(paper));
    line(courthouse,[x+9,102],[x+8,153],{stroke:gray,strokeWidth:1});
    line(courthouse,[x+17,102],[x+17,153],{stroke:gray,strokeWidth:1});
    rect(courthouse,x-3,157,31,7,solid(paper));
  }
  rect(courthouse,26,166,258,8,solid(paper));
  rect(courthouse,15,177,280,8,hatch(gray));
  const scales=group(justice,"b17@Absehen",{"data-cam":"none"});
  ellipse(scales,155,57,33,25,solid(paper));
  path(scales,"M155 44V69M137 51H173M141 51l-6 12h13zM169 51l-6 12h13z",{strokeWidth:1.2});
  line(scales,[145,70],[165,70],{strokeWidth:1.4});
})();
