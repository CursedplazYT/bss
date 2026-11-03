/* Visual recreations for this WebGL fan game; original Roblox meshes are not bundled. */
(function(){
'use strict';
const white=[.92,.95,1],black=[.025,.025,.03],red=[.66,.015,.02],blue=[.08,.4,.64],green=[.04,.75,.4],purple=[.56,.16,.67],gold=[.74,.53,.025];
function segment(box,x1,y1,x2,y2,z,width,color){const dx=x2-x1,dy=y2-y1;box((x1+x2)/2,(y1+y2)/2,z,width,Math.hypot(dx,dy),.025,[0,0,-Math.atan2(dx,dy)*180/Math.PI],color,false,false)}
function mask(kind){return function(box,cylinder,sphere){
 const col={diamond:blue,demon:black,gummy:purple,honey:gold,fire:[.46,.025,.005],bubble:[.13,.42,.57]}[kind];
 const accent={diamond:white,demon:red,gummy:green,honey:black,fire:[.95,.62,.025],bubble:[.025,.14,.22]}[kind];
 function cy(x,y,z,r,h,c,r2=r,rx=90){cylinder(x,y,z,r,h,24,...c,1,rx,0,0,r2)}
 // Face drum, projecting brim, tapered hemispherical crown.
 cy(0,.34,0,.345,.36,col);cy(0,.55,0,.43,.055,col);cy(0,.59,0,.34,.045,accent);
 for(let i=0;i<5;i++){const y=.61+i*.055,r1=Math.sqrt(Math.max(0,.34*.34-(i*.055)**2)),r2=Math.sqrt(Math.max(0,.34*.34-((i+1)*.055)**2));cy(0,y+.0275,0,r1,.055,col,r2)}
 cy(0,.9,0,.195,.025,col,.14);
 const z=.39;
 if(kind==='diamond'){
  for(const x of [-.12,.12]){box(x,.37,z,.095,.15,.025,[0,0,45],white,false,false);box(x,.37,z,.15,.045,.026,[0,0,45],white,false,false)}
  segment(box,-.13,.24,0,.19,z,.04,white);segment(box,0,.19,.13,.24,z,.04,white);
  // Tiara: three open diamond loops and a tall central peak.
  for(const [x,y,w,h] of [[-.19,.83,.1,.15],[.19,.83,.1,.15],[0,.97,.13,.2]]){const pts=[[x,y-h],[x-w,y],[x,y+h],[x+w,y],[x,y-h]];for(let i=0;i<4;i++)segment(box,...pts[i],...pts[i+1],.18,.023,white)}
  for(const x of [-.2,-.1,0,.1,.2])box(x,.72,.26,.055,.095,.025,[0,0,45],white,false,false);
 }else if(kind==='demon'){
  for(const sign of [-1,1]){
   const pts=[[sign*.28,.8,.1],[sign*.43,1.02,.065],[sign*.55,1.22,.03],[sign*.59,1.37,0]];
   for(let i=0;i<3;i++){const a=pts[i],b=pts[i+1],dx=b[0]-a[0],dy=b[1]-a[1];cylinder((a[0]+b[0])/2,(a[1]+b[1])/2,0,a[2],Math.hypot(dx,dy),16,...red,1,90,0,-Math.atan2(dx,dy)*180/Math.PI,b[2])}
   cy(sign*.12,.36,z,.06,.025,red,.06,0);
   segment(box,sign*.05,.45,sign*.19,.39,z+.02,.035,red);
  }
  const pts=[[-.19,.21],[-.12,.25],[-.06,.18],[0,.22],[.07,.17],[.14,.25],[.2,.21]];for(let i=0;i<pts.length-1;i++)segment(box,...pts[i],...pts[i+1],z,.025,red);
 }else if(kind==='gummy'){
  cy(0,.97,0,.13,.18,green,.13);cy(0,1.065,0,.13,.025,green,.12);
  for(const x of [-.12,.12]){cy(x,.36,z,.055,.025,green,.055,0);box(x-.028,.39,z+.02,.035,.04,.026,false,col,false,false)}
  for(const [x,y,r] of [[-.12,.22,.035],[-.06,.19,.045],[0,.18,.045],[.06,.19,.045],[.12,.22,.035]])cy(x,y,z,r,.024,green,r,0);
 }else if(kind==='bubble'){
  for(const [x,y,z,r] of [[-.24,.83,.15,.09],[.23,.8,.13,.08],[0,.94,0,.08],[-.12,.78,-.26,.07],[.27,.7,-.05,.055]]){sphere(x,y,z,r,2,.11,.58,.67);sphere(x-r*.26,y+r*.32,z+r*.64,r*.24,1,.8,1,1)}
  for(const x of [-.12,.12]){cy(x,.37,z,.045,.025,accent,.045,0);box(x-.02,.4,z+.02,.045,.045,.03,false,col,false,false)}
  cy(0,.22,z,.065,.025,accent,.065,0);cy(0,.22,z+.016,.027,.01,blue,.027,0);
 }else if(kind==='fire'){
  for(const x of [-.12,.12]){cy(x,.36,z,.047,.025,accent,.047,0);box(x,.42,z,.035,.11,.025,[0,0,15],accent,false,false)}
  for(const [a,b] of [[[-.17,.25],[-.09,.2]],[[-.09,.2],[0,.25]],[[0,.25],[.09,.2]],[[.09,.2],[.17,.25]]])segment(box,...a,...b,z,.025,accent);
  cy(0,.99,0,.065,.19,[.94,.27,.01],0);cy(.025,1.08,0,.035,.15,[1,.7,.04],0);
 }else{
  for(const sign of [-1,1]){cy(sign*.12,.36,z,.034,.025,black,.034,0);segment(box,sign*.07,.41,sign*.16,.4,z,.025,black)}
  const pts=[[-.19,.25],[-.1,.2],[0,.18],[.1,.2],[.19,.25]];for(let i=0;i<4;i++)segment(box,...pts[i],...pts[i+1],z,.022,black);
  sphere(0,.99,0,.07,2,...gold);
 }
}}
function coconutBelt(box,cylinder,sphere){
 const brown=[.34,.22,.12],silver=[.68,.73,.76];
 box(0,-.1,-.25,.85,.09,.045,false,brown,false,false);
 for(const sign of [-1,1]){
  box(sign*.41,-.1,0,.045,.09,.5,false,brown,false,false);
  sphere(sign*.32,-.1,.3,.13,2,...silver);
  for(const [dx,dy] of [[-.035,.025],[.025,.04],[.015,-.035]])sphere(sign*.32+dx,-.1+dy,.416,.018,1,...white);
  // Paired triangular red/blue fins, matching the original buckle's silhouette.
  cylinder(sign*.33,.035,.36,.16,.032,3,...red,1,0,0,sign*20,.16);
  cylinder(sign*.33,-.2,.36,.16,.032,3,.02,.08,.8,1,0,0,sign*-20,.16);
 }
 sphere(0,-.1,.38,.19,2,...brown);
 for(const [x,y] of [[-.06,-.055],[.06,-.055],[0,-.16]])sphere(x,y,.553,.028,1,...white);
}
window.installBssGearVisuals=function(gear){
 if(gear.__bssVisualVersion===1)return;Object.defineProperty(gear,'__bssVisualVersion',{value:1});
 for(const [id,kind] of Object.entries({diamondMask:'diamond',demonMask:'demon',gummyMask:'gummy',honeyMask:'honey',fireMask:'fire',bubbleMask:'bubble'}))gear.mask[id].mesh=mask(kind);
 gear.belt.coconutBelt.mesh=coconutBelt;
 const oldGummy=gear.boots.gummyBoots.mesh;
 gear.boots.gummyBoots.mesh=function(box,cylinder,sphere){oldGummy(box,cylinder,sphere);for(const x of [-.2,.2]){box(x,-.29,.314,.21,.06,.025,false,green,false,false);box(x,-.29,.329,.15,.03,.01,false,[.4,1,1],false,false)}};
 // Retain the other original silhouettes while smoothing round surfaces and
 // replacing overexposed RGB values (some were 100) with bounded materials.
 function color(c){return c.map((v,i)=>i<3?Math.min(1.18,Math.max(0,v)):v)}
 function wrap(fn,prefix=0){return function(...args){const head=args.slice(0,prefix),[box,cylinder,sphere,...rest]=args.slice(prefix);return fn.call(this,...head,
  function(...a){if(Array.isArray(a[7]))a[7]=color(a[7]);return box(...a)},
  function(...a){if(a[5]>=8&&a[5]<20)a[5]=20;for(let i=6;i<9;i++)a[i]=Math.min(1.18,Math.max(0,a[i]));return cylinder(...a)},
  function(...a){for(let i=5;i<8;i++)a[i]=Math.min(1.18,Math.max(0,a[i]));return sphere(...a)},...rest)}}
 for(const [slot,entries] of Object.entries(gear)){
  if(entries&&typeof entries.mesh==='function'){entries.mesh=wrap(entries.mesh);continue}
  if(!entries||typeof entries!=='object')continue;
  for(const entry of Object.values(entries))if(entry&&typeof entry.mesh==='function')entry.mesh=wrap(entry.mesh,slot==='sprinkler'?3:0);
 }
};
})();
