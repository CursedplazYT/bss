/* Visual recreations for this WebGL fan game; original Roblox meshes are not bundled. */
(function(){
'use strict';
const white=[.92,.95,1],black=[.025,.025,.03],red=[.66,.015,.02],blue=[.08,.4,.64],green=[.04,.75,.4],purple=[.56,.16,.67],gold=[.74,.53,.025];
function segment(box,x1,y1,x2,y2,z,width,color){const dx=x2-x1,dy=y2-y1;box((x1+x2)/2,(y1+y2)/2,z,width,Math.hypot(dx,dy),.025,[0,0,-Math.atan2(dx,dy)*180/Math.PI],color)}
function mask(kind){return function(box,cylinder,sphere){
 const col={diamond:blue,demon:black,gummy:purple,honey:gold,fire:[.46,.025,.005],bubble:[.13,.42,.57]}[kind];
 const accent={diamond:white,demon:red,gummy:green,honey:black,fire:[.95,.62,.025],bubble:[.025,.14,.22]}[kind];
 function cy(x,y,z,r,h,c,r2=r,rx=90){cylinder(x,y,z,r,h,24,...c,rx,0,0,r2)}
 // Face drum, projecting brim, tapered hemispherical crown.
 cy(0,.34,0,.345,.36,col);cy(0,.55,0,.43,.055,col);cy(0,.59,0,.34,.045,accent);
 for(let i=0;i<5;i++){const y=.61+i*.055,r1=Math.sqrt(Math.max(0,.34*.34-(i*.055)**2)),r2=Math.sqrt(Math.max(0,.34*.34-((i+1)*.055)**2));cy(0,y+.0275,0,r1,.055,col,r2)}
 cy(0,.9,0,.195,.025,col,.14);
 const z=.39;
 if(kind==='diamond'){
  for(const x of [-.12,.12]){box(x,.37,z,.095,.15,.025,[0,0,45],white);box(x,.37,z,.15,.045,.026,[0,0,45],white)}
  segment(box,-.13,.24,0,.19,z,.04,white);segment(box,0,.19,.13,.24,z,.04,white);
  // Tiara: three open diamond loops and a tall central peak.
  for(const [x,y,w,h] of [[-.19,.83,.1,.15],[.19,.83,.1,.15],[0,.97,.13,.2]]){const pts=[[x,y-h],[x-w,y],[x,y+h],[x+w,y],[x,y-h]];for(let i=0;i<4;i++)segment(box,...pts[i],...pts[i+1],.18,.023,white)}
  for(const x of [-.2,-.1,0,.1,.2])box(x,.72,.26,.055,.095,.025,[0,0,45],white);
 }else if(kind==='demon'){
  for(const sign of [-1,1]){
   const pts=[[sign*.28,.8,.1],[sign*.43,1.02,.065],[sign*.55,1.22,.03],[sign*.59,1.37,0]];
   for(let i=0;i<3;i++){const a=pts[i],b=pts[i+1],dx=b[0]-a[0],dy=b[1]-a[1];cylinder((a[0]+b[0])/2,(a[1]+b[1])/2,0,a[2],Math.hypot(dx,dy),16,...red,90,0,-Math.atan2(dx,dy)*180/Math.PI,b[2])}
   cy(sign*.12,.36,z,.06,.025,red,.06,0);
   segment(box,sign*.05,.45,sign*.19,.39,z+.02,.035,red);
  }
  const pts=[[-.19,.21],[-.12,.25],[-.06,.18],[0,.22],[.07,.17],[.14,.25],[.2,.21]];for(let i=0;i<pts.length-1;i++)segment(box,...pts[i],...pts[i+1],z,.025,red);
 }else if(kind==='gummy'){
  cy(0,.97,0,.13,.18,green,.13);cy(0,1.065,0,.13,.025,green,.12);
  for(const x of [-.12,.12]){cy(x,.36,z,.055,.025,green,.055,0);box(x-.028,.39,z+.02,.035,.04,.026,false,col)}
  for(const [x,y,r] of [[-.12,.22,.035],[-.06,.19,.045],[0,.18,.045],[.06,.19,.045],[.12,.22,.035]])cy(x,y,z,r,.024,green,r,0);
 }else if(kind==='bubble'){
  for(const [x,y,z,r] of [[-.24,.83,.15,.09],[.23,.8,.13,.08],[0,.94,0,.08],[-.12,.78,-.26,.07],[.27,.7,-.05,.055]]){sphere(x,y,z,r,2,.11,.58,.67);sphere(x-r*.26,y+r*.32,z+r*.64,r*.24,1,.8,1,1)}
  for(const x of [-.12,.12]){cy(x,.37,z,.045,.025,accent,.045,0);box(x-.02,.4,z+.02,.045,.045,.03,false,col)}
  cy(0,.22,z,.065,.025,accent,.065,0);cy(0,.22,z+.016,.027,.01,blue,.027,0);
 }else if(kind==='fire'){
  for(const x of [-.12,.12]){cy(x,.36,z,.047,.025,accent,.047,0);box(x,.42,z,.035,.11,.025,[0,0,15],accent)}
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
 box(0,-.1,-.25,.85,.09,.045,false,brown);
 for(const sign of [-1,1]){
  box(sign*.41,-.1,0,.045,.09,.5,false,brown);
  sphere(sign*.32,-.1,.3,.13,2,...silver);
  for(const [dx,dy] of [[-.035,.025],[.025,.04],[.015,-.035]])sphere(sign*.32+dx,-.1+dy,.416,.018,1,...white);
  // Paired triangular red/blue fins, matching the original buckle's silhouette.
  cylinder(sign*.33,.035,.36,.16,.032,3,...red,0,0,sign*20,.16);
  cylinder(sign*.33,-.2,.36,.16,.032,3,.02,.08,.8,0,0,sign*-20,.16);
 }
 sphere(0,-.1,.38,.19,2,...brown);
 for(const [x,y] of [[-.06,-.055],[.06,-.055],[0,-.16]])sphere(x,y,.553,.028,1,...white);
}
const steel=[.57,.63,.67],wood=[.3,.15,.055],tan=[.63,.48,.25],cream=[.84,.78,.55],dark=[.08,.09,.105];
function kit(box,cy,sp){
 const B=(x,y,z,w,h,d,c,r=false)=>box(x,y,z,w,h,d,r,c);
 const C=(x,y,z,r,h,c,rx=90,ry=0,rz=0,r2=r,n=16)=>cy(x,y,z,r,h,n,...c,rx||.00001,ry,rz,r2);
 const S=(x,y,z,r,c,detail=2)=>sp(x,y,z,r,detail,...c);
 const P=(pts,z,d,c)=>{if(!box.bssPolygon)throw new Error('Updated index.js is required for gear models');box.bssPolygon(pts,z,d,c)};
 const line=(a,b,w,c)=>{const dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2],l=Math.hypot(dx,dy,dz);const rx=Math.acos(dz/l)*180/Math.PI,rz=Math.atan2(dx,-dy)*180/Math.PI;C((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,w,l,c,rx,0,rz,w,10)};
 const ring=(x,y,z,rx,ry,w,c,steps=16)=>{for(let i=0;i<steps;i++){const a=i*Math.PI*2/steps,b=(i+1)*Math.PI*2/steps;line([x+rx*Math.cos(a),y+ry*Math.sin(a),z],[x+rx*Math.cos(b),y+ry*Math.sin(b),z],w,c)}};
 const disc=(x,y,z,r,d,c,n=16)=>C(x,y,z,r,d,c,.00001,0,0,r,n);
 const leaf=(x,y,z,s,angle,c)=>{const pts=[[0,-.45],[-.12,-.34],[-.23,-.12],[-.24,.08],[-.19,.29],[-.09,.49],[0,.58],[.09,.49],[.19,.29],[.24,.08],[.23,-.12],[.12,-.34]].map(([a,b])=>{const t=angle*Math.PI/180;return[x+s*(a*Math.cos(t)-b*Math.sin(t)),y+s*(a*Math.sin(t)+b*Math.cos(t))]});P(pts,z,.035,c)};
 return{B,C,S,P,line,ring,disc,leaf};
}
function pack(name){return function(box,cy,sp){const{B,C,S,P}=kit(box,cy,sp);const z=-.6;
 const gauge=(w=.72,y=.25,zz=-1,c=steel)=>{B(0,y,zz,w+.07,.29,.055,c);B(-w/4,y,zz-.035,w/2,.22,.018,[.08,.55,.13]);B(w/4,y,zz-.035,w/2,.22,.018,[.62,.09,.07])};
 for(const x of [-.19,.19])B(x,.23,-.29,.065,.72,.05,dark);
 if(name==='pouch'){
  C(0,.07,z,.29,.14,tan,90,0,0,.39);C(0,.27,z,.39,.26,tan,90,0,0,.28);C(0,.46,z,.28,.12,tan,90,0,0,.08);S(0,.59,z,.09,tan);gauge(.6,.34,-.9,cream);
 }else if(name==='jar'){
  C(0,.28,z,.31,.66,tan);C(0,.65,z,.33,.08,steel);C(0,-.065,z,.28,.045,steel);for(const x of [-.21,.21])B(x,.28,z-.24,.025,.52,.018,cream);gauge(.66,.25,-.94,dark);
 }else if(name==='backpack'){
  B(0,.28,z,.7,.88,.36,[.08,.26,.06]);B(0,.72,z,.7,.09,.36,[.12,.36,.08]);B(0,.02,z-.23,.58,.23,.12,tan);B(0,.12,z-.3,.53,.035,.02,gold);S(0,.02,z-.305,.025,dark,1);gauge(.58,.44,z-.2,[.09,.25,.05]);
 }else if(name==='canister'){
  C(0,.28,z,.3,.6,white);C(0,.65,z,.2,.15,[.22,.48,.65]);C(0,.77,z,.27,.1,white);B(0,.2,z-.27,.78,.51,.08,white);gauge(.68,.22,z-.33,white);
 }else if(name==='megaJug'){
  C(0,.2,z,.3,.48,cream);C(0,.51,z,.31,.16,[.04,.18,.07],90,0,0,.21);C(0,.65,z,.2,.13,[.04,.18,.07],90,0,0,.08);C(0,.76,z,.07,.11,[.04,.18,.07]);C(0,.47,z,.32,.04,cream);gauge(.66,.24,z-.34,[.04,.18,.07]);
 }else if(name==='compressor'){
  for(const x of [-.18,.18]){C(x,.29,z,.16,.7,white);C(x,.65,z,.17,.07,steel);B(x,.43,z-.15,.18,.11,.035,dark)}
  B(0,.28,z,.77,.1,.32,dark);for(const x of [-.34,.34])B(x,.24,z,.065,.55,.26,dark);gauge(.74,.2,z-.25,dark);
 }else if(name==='eliteBarrel'){
  C(0,.3,z,.31,.76,wood,90,0,0,.3);for(let i=0;i<12;i++){const a=i*Math.PI/6;B(Math.sin(a)*.302,.3,z+Math.cos(a)*.302,.018,.7,.02,[.45,.29,.13],[0,a*180/Math.PI,0])}
  for(const y of [-.05,.1,.53,.67])C(0,y,z,.325,.055,dark);gauge(.74,.28,z-.37,dark);
 }else if(['portOHive','redPortOHive','bluePortOHive','porcelainOHive'].includes(name)){
  const col=name==='redPortOHive'?[.65,.015,.015]:name==='bluePortOHive'?[.015,.04,.7]:name==='porcelainOHive'?white:cream;
  for(let i=0;i<5;i++){const y=-.07+i*.16;C(0,y,z,.25,.08,col,90,0,0,.32);C(0,y+.08,z,.32,.08,col,90,0,0,.25)}
  C(0,.75,z,.2,.1,col,90,0,0,.08);gauge(.76,.3,z-.36,name==='portOHive'?white:gold);
  if(name==='porcelainOHive')for(const sign of [-1,1]){const col=sign<0?blue:red;P([[sign*.39,.42],[sign*.75,.54],[sign*.57,.3],[sign*.76,.23],[sign*.37,.18]],z-.34,.06,col)}
 }else if(name==='coconutCanister'){
  S(0,.28,z,.48,[.42,.28,.17],2);
  for(const x of [-.13,.13])S(x,.56,z-.41,.075,black,1);S(0,.39,z-.47,.08,white,2);S(0,.39,z-.52,.052,black,1);
  for(const sign of [-1,1]){C(sign*.45,.25,z,.2,.18,white,.00001,90,0,.2);C(sign*.56,.25,z,.17,.055,sign<0?blue:red,.00001,90,0,.17)}
  gauge(.7,-.015,z-.43,white);
 }
}}
function boots(name){return function(box,cy,sp){const{B,C,S,disc}=kit(box,cy,sp);
 for(const sign of [-1,1]){const x=sign*.23;
  const gummy=name==='gummyBoots',coconut=name==='coconutClogs',mondo=name==='mondoBoots',hiking=name==='hikingBoots';
  const sole=gummy?green:coconut||mondo?(sign<0?blue:red):hiking?dark:[.5,.43,.025];
  const col=gummy?purple:coconut?wood:mondo?white:hiking?[.32,.17,.11]:[.62,.52,.025];
  B(x,-.52,.1,.4,.12,.73,sole);B(x,-.41,.15,.35,.16,.62,col);
  B(x,-.25,-.1,.36,.19,.12,col);B(x-.14,-.25,.035,.08,.2,.35,col);B(x+.14,-.25,.035,.08,.2,.35,col);B(x,-.25,.2,.34,.2,.07,col);B(x,-.345,.015,.2,.015,.26,dark);
  if(gummy){B(x,-.27,.245,.24,.085,.025,green);B(x,-.27,.26,.19,.045,.015,[.3,1,.95]);B(x,-.29,-.21,.05,.08,.04,green)}
  if(coconut){B(x,-.25,.245,.22,.045,.04,white);S(x,-.36,.43,.2,[.4,.28,.18],2);for(const[dx,dy]of[[-.06,.045],[.05,.06],[.03,-.05]])S(x+dx,-.36+dy,.61,.032,black,1)}
  if(mondo)B(x,-.25,.245,.24,.055,.03,gold);
  if(hiking)for(const y of [-.36,-.3,-.24])B(x,y,.25,.21,.018,.025,[.15,.08,.045]);
 }
}}
function belt(name){return function(box,cy,sp){const{B,C,P,disc,leaf}=kit(box,cy,sp);
 for(const x of [-.3,.3])B(x,-.1,0,.1,.13,.55,wood);B(0,-.1,-.27,.68,.13,.06,wood);
 if(name==='coconutBelt'){coconutBelt(box,cy,sp);return}
 if(name==='petalBelt'){
  for(const a of [-65,65,180])leaf(0,-.06,.34,.4,a,[.12,.9,.22]);for(const a of [-65,65,180])leaf(0,-.06,.39,.34,a,[.88,.86,1]);P([[0,.07],[-.1,-.03],[0,-.14],[.1,-.03]],.44,.07,gold);return
 }
 if(name==='honeycombBelt'){
  for(const[x,y,r]of[[-.27,-.04,.13],[0,-.1,.19],[.27,-.04,.13]]){disc(x,y,.34,r,.09,gold,6);disc(x,y,.396,r*.77,.025,cream,6);disc(x,y,.413,r*.58,.015,white,6)}return
 }
 const col=name==='beltPocket'?[.39,.29,.08]:steel;B(0,-.1,.31,.78,.27,.13,col);B(0,-.09,.4,.64,.13,.06,name==='beltPocket'?wood:dark);B(0,-.2,.38,.71,.065,.08,col);
 if(name==='mondoBeltBag')for(const sign of [-1,1])P([[sign*.35,.04],[sign*.7,.1],[sign*.52,-.04],[sign*.7,-.15],[sign*.35,-.14]],.37,.045,sign<0?red:blue);
}}
function guard(name,sign){return function(box,cy,sp){const{B,P}=kit(box,cy,sp);const x=sign*.39,y=.06,z=.12;const isRed=sign>0,col=isRed?red:blue;
 const shape=pts=>pts.map(([a,b])=>[x+sign*a,y+b]);
 if(['crimsonGuard','cobaltGuard'].includes(name)){
  P(shape([[-.12,-.15],[.17,-.19],[.34,.01],[.04,.2]]),z,.11,col);
  P(shape([[-.09,-.12],[.06,.52],[.13,.62],[.02,-.1]]),z+.075,.04,white);
  P(shape([[.015,-.12],[.38,.18],[.43,.18],[.12,-.14]]),z+.08,.035,white);
 }else if(['rileyGuard','buckoGuard'].includes(name)){
  P(shape([[-.12,-.16],[.31,-.17],[.14,-.04],[.38,.12],[.13,.12],[.34,.48],[-.13,.19]]),z,.1,col);
  P(shape([[-.05,-.1],[.1,-.07],[.08,.12]]),z+.065,.035,gold);
 }else{
  const elite=name.startsWith('elite'),basic=['redGuard','blueGuard'].includes(name);
  const main=name==='lookerGuard'?[.1,.5,.08]:name==='hastyGuard'?gold:name==='bomberGuard'||name==='braveGuard'?white:col;
  P(shape([[-.14,-.17],[.2,-.13],[.3,.24],[-.17,.22]]),z,.13,elite?dark:main);
  P(shape([[-.08,-.12],[.15,-.08],[.22,.16],[-.12,.15]]),z+.08,.035,elite?col:main);
  B(x,y+.04,z+.12,.09,.35,.035,black,[0,0,-sign*12]);
  if(elite)P(shape([[.16,-.12],[.31,-.16],[.21,.06],[.3,.2],[.11,.18]]),z+.07,.035,dark);
 }
}}
function simpleMask(name){return function(box,cy,sp){const{B,C,S,line,ring}=kit(box,cy,sp);
 const col=name==='propellerHat'?blue:name==='beekeeperMask'?white:gold;
 C(0,.59,0,.37,.09,col);C(0,.72,0,.3,.18,col,90,0,0,.21);C(0,.84,0,.21,.1,col,90,0,0,.07);
 if(name==='beekeeperMask'){
  for(const x of [-.28,.28])line([x,.56,.23],[x,.15,.28],.023,white);line([-.28,.15,.28],[.28,.15,.28],.023,white);
  for(let i=-3;i<=3;i++)line([i*.07,.17,.29],[i*.07,.52,.29],.007,steel);for(let i=0;i<5;i++)line([-.26,.2+i*.065,.29],[.26,.2+i*.065,.29],.007,steel);
 }else{
  for(const x of [-.1,.1])S(x,.34,.255,.025,black,1);line([-.1,.21,.255],[0,.18,.26],.012,black);line([0,.18,.26],[.1,.21,.255],.012,black);
  if(name==='helmet')for(const sign of [-1,1])line([sign*.29,.55,.2],[sign*.25,.15,.28],.018,gold);
 }
 if(name==='propellerHat'){
  for(const[x,c]of[[-.17,red],[.17,blue]])B(x,.72,.02,.28,.16,.33,c);C(0,.96,0,.025,.2,steel);B(0,1.06,0,.75,.025,.09,gold,[0,25,0]);B(0,1.06,0,.09,.025,.75,gold,[0,25,0]);S(0,1.08,0,.05,red,1)
 }
}}
function tool(name){return function(box,cy,sp){const{B,C,S,P,line,ring,disc,leaf}=kit(box,cy,sp);const x=-.32,z=.43;
 const shaft=(col=steel,length=1.1,r=.035)=>C(x,length/2-.15,z,r,length,col);
 const handle=(y,col)=>{B(x-.11,y,z,.035,.24,.05,col);B(x+.11,y,z,.035,.24,.05,col);B(x,y-.12,z,.25,.035,.05,col);B(x,y+.12,z,.25,.035,.05,col)};
 const poly=(pts,c,d=.045,zz=z)=>P(pts.map(([a,b])=>[x+a,b]),zz,d,c);
 if(name==='shovel'){
  shaft(wood,.98);handle(-.13,steel);poly([[-.18,.85],[-.17,1.13],[0,1.36],[.17,1.13],[.18,.85]],steel,.06);B(x,.82,z,.11,.16,.09,steel);
 }else if(['rake','goldenRake'].includes(name)){
  const g=name==='goldenRake',c=g?gold:steel;shaft(c,1.1);B(x,1.05,z,g?1.06:.52,.07,.07,c);
  const n=g?11:5;for(let i=0;i<n;i++){const xx=x+(i-(n-1)/2)*(g?.09:.1);B(xx,1.2,z,.028,.28,.045,c)}if(g)handle(-.15,gold);
 }else if(['clippers','scissors'].includes(name)){
  const large=name==='scissors',s=large?1.15:.9;
  for(const sign of [-1,1]){
   const hx=x+sign*.15*s,hy=.42;
   B(hx-.08*s,hy,z,.025,.22*s,.04,large?(sign<0?red:blue):gold,[0,0,-sign*12]);B(hx+.08*s,hy,z,.025,.22*s,.04,large?(sign<0?red:blue):gold,[0,0,-sign*12]);B(hx,hy+.11*s,z,.18*s,.025,.04,large?(sign<0?red:blue):gold);B(hx,hy-.11*s,z,.18*s,.025,.04,large?(sign<0?red:blue):gold);
   poly([[sign*.05,.57],[sign*.13,.65],[sign*.28,1.28],[0,.71]],steel,.035);
  }disc(x,.65,z+.04,.035,.02,dark);
 }else if(['magnet','electroMagnet'].includes(name)){
  const electric=name==='electroMagnet',c=electric?gold:red;shaft(steel,.85);
  const outer=[],inner=[],r=electric?.37:.31;
  for(let i=0;i<=12;i++){const a=Math.PI+i*Math.PI/12;outer.push([Math.cos(a)*r,1.12+Math.sin(a)*r])}
  for(let i=12;i>=0;i--){const a=Math.PI+i*Math.PI/12;inner.push([Math.cos(a)*(r-.11),1.12+Math.sin(a)*(r-.11)])}
  poly([...outer,...inner],c,.1);for(const sign of [-1,1])B(x+sign*(r-.055),1.24,z,.11,.27,.1,c);for(const sign of [-1,1])B(x+sign*(r-.055),1.4,z,.11,.09,.1,white);
  if(electric){for(const dx of [-.12,.12])B(x+dx,1.31,z,.075,.2,.1,white);for(let i=0;i<3;i++)poly([[i*.2-.32,1.5],[i*.2-.25,1.3],[i*.2-.31,1.35],[i*.2-.23,1.17]],green,.012,z+.07)}
 }else if(name==='vacuum'){
  B(x,.13,z,.6,.19,.38,dark);B(x,.23,z+.08,.5,.04,.26,steel);for(const dx of [-.19,.19])B(x+dx,.14,z+.2,.07,.055,.02,gold);shaft(steel,1.05,.045);S(x,.94,z,.06,steel,1);B(x,.59,z-.15,.4,.73,.12,tan);for(let i=-2;i<=2;i++)B(x+i*.07,.59,z-.22,.018,.7,.02,wood);
 }else if(name==='superScooper'){
  shaft(gold,1.1,.035);for(let i=0;i<6;i++)C(x,-.03+i*.12,z,.055,.06,i%2?blue:gold);poly([[-.32,.95],[-.32,1.43],[-.02,1.43],[-.02,.95]],gold,.08);poly([[.02,.95],[.02,1.43],[.32,1.43],[.32,.95]],blue,.08);B(x,1.17,z,.035,.5,.09,red);handle(-.18,steel);
 }else if(name==='pulsar'){
  shaft(gold,1.15,.035);C(x,-.08,z,.06,.28,[.02,.8,.05]);S(x,1.2,z,.15,[.02,.9,.04],2);disc(x,1.2,z+.13,.085,.03,black);disc(x,1.2,z+.15,.04,.02,[.02,.8,.04]);ring(x,1.2,z,.32,.32,.012,black);for(const dy of [-.1,.1])ring(x,1.2+dy,z,.29,.09,.012,black);B(x-.32,1.2,z,.05,.045,.04,blue);B(x+.32,1.2,z,.05,.045,.04,blue);
 }else if(['honeyDipper','porcelainDipper'].includes(name)){
  const porcelain=name==='porcelainDipper';shaft(gold,1.1,.035);const c=porcelain?white:gold;
  for(let i=0;i<5;i++)C(x,.97+i*.085,z,.15+Math.sin((i+1)*Math.PI/6)*.06,.055,c);
  if(porcelain){ring(x,1.17,z,.27,.45,.015,[.35,.5,.55]);for(const sign of [-1,1])poly([[sign*.05,.93],[sign*.39,1.02],[sign*.23,.85],[sign*.39,.8],[0,.82]],sign<0?red:blue,.035);for(const[dx,dy,r]of[[.29,1.47,.025],[-.2,1.56,.025],[.1,1.67,.02]])S(x+dx,dy,z,r,[.5,.8,.85],1)}
 }else if(name==='bubbleWand'){
  shaft(blue,.95,.025);B(x,-.06,z,.11,.28,.08,gold);ring(x,1.2,z,.28,.33,.033,[.02,.04,.7]);for(const[dx,y,r]of[[-.17,1.48,.11],[.06,1.46,.1],[.22,1.32,.08],[-.08,1.32,.08]]){S(x+dx,y,z,r,[.16,.55,.66],2);S(x+dx-r*.24,y+r*.35,z+r*.75,r*.2,white,1)}
 }else if(name==='scythe'){
  shaft(gold,1.18);C(x,-.13,z,.06,.24,red);poly([[-.05,1.05],[-.1,1.39],[.07,1.57],[.18,1.46],[.36,1.48],[.33,1.19],[.13,1.12]],red,.09);poly([[.05,1.46],[-.21,1.57],[-.48,1.54],[-.72,1.43],[-.86,1.25],[-.52,1.36],[-.21,1.36],[.04,1.31]],steel,.045,z+.015);poly([[-.45,1.49],[-.51,1.69],[-.37,1.58],[-.36,1.84],[-.25,1.67],[-.32,1.46]],[.95,.38,.02],.025);
 }else if(name==='sparkStaff'){
  shaft([.15,.015,.2],1.55,.023);for(const y of [.05,.8,1.17,1.34])C(x,y,z,.04,.045,gold);S(x,1.26,z,.1,[.24,.015,.27],1);for(let i=0;i<7;i++){const a=i*2*Math.PI/7,dx=Math.cos(a)*.36,dy=Math.sin(a)*.31;poly([[0,1.26],[dx*.45,1.26+dy*.45],[dx*.3-.03,1.28+dy*.4],[dx,1.26+dy],[dx*.56,1.26+dy*.24]],gold,.014)}
 }else if(name==='petalWand'){
  shaft(cream,1.18);C(x,.45,z,.05,.07,green);for(const a of [0,72,144,216,288])leaf(x,1.27,z,.65,a,[.89,.87,1]);for(const a of [36,108,180,252,324])leaf(x,1.27,z-.055,.55,a,[.75,.75,.9]);poly([[0,1.06],[-.19,1.26],[0,1.48],[.19,1.26]],gold,.12,z+.09);poly([[0,1.26],[-.19,1.26],[0,1.48]],[.9,.76,.3],.012,z+.158);
 }else if(name==='darkScythe'){
  shaft(black,1.5,.038);for(let i=0;i<5;i++)C(x,.05+i*.09,z,.046,.055,[.19,.015,.3]);
  // Swept, tapered blade and two distinct backward spikes.
  poly([[.06,1.3],[-.12,1.63],[-.4,1.7],[-.7,1.63],[-.94,1.45],[-1.09,1.18],[-1.15,.85],[-.95,1.13],[-.74,1.33],[-.43,1.41],[-.15,1.34]],black,.075);
  poly([[-.16,1.43],[-.44,1.5],[-.72,1.43],[-.94,1.25],[-1.09,.99],[-.99,1.3],[-.77,1.51],[-.44,1.6],[-.2,1.54]],red,.014,z+.045);
  poly([[-.08,1.56],[.18,2.13],[.12,1.61],[.4,1.88],[.21,1.44]],black,.07);poly([[-.05,-.16],[0,-.35],[.06,-.13]],[.23,.01,.32],.065);
 }else if(name==='tidePopper'){
  shaft([.05,.65,.83],1.6,.035);for(const[y,r,h]of[[.36,.12,.12],[.72,.19,.1],[.85,.13,.22],[1.11,.16,.06],[1.31,.07,.3],[1.55,.04,.25]])C(x,y,z,r,h,[.15,.7,.86],90,0,0,r*.55);
  C(x,.57,z,.19,.08,white);C(x,1.04,z,.13,.04,white);for(const sign of [-1,1]){line([x,.6,z],[x+sign*.39,.63,z],.018,[.17,.66,.75]);S(x+sign*.39,.63,z,.045,white,2)}
 }else if(name==='gummyBaller'){
  shaft(purple,.95,.035);C(x,-.08,z,.075,.18,green);C(x,.87,z,.16,.08,green);disc(x,1.03,z,.32,.12,purple);for(const[dx,dy]of[[-.13,.1],[.1,.12],[-.03,-.1]])disc(x+dx,1.03+dy,z+.075,.074,.035,green);S(x,1.63,z,.18,[.72,.15,.8],2);
 }
}}
function amulet(name){return function(box,cy,sp){const{B,C,S,P,line,ring,disc}=kit(box,cy,sp);const x=(window.amuletOffset||[0,0])[0],y=1.5+(window.amuletOffset||[0,0])[1],z=.1;
 const c=name.startsWith('bronze')?[.52,.29,.11]:name.startsWith('silver')?steel:name.startsWith('gold')?gold:name.startsWith('diamond')?[.12,.7,.85]:[.05,.65,.16];
 if(name.includes('Star')){const pts=[];for(let i=0;i<10;i++){const a=Math.PI/2+i*Math.PI/5,r=i%2?.07:.16;pts.push([x+Math.cos(a)*r,y+Math.sin(a)*r])}P(pts,z,.045,c);for(const dx of [-.04,.04])S(x+dx,y+.01,z+.038,.013,black,1);line([x-.035,y-.04,z+.04],[x+.035,y-.04,z+.04],.005,black)}
 else if(name.includes('Cog')){disc(x,y,z,.11,.045,c,12);for(let i=0;i<10;i++){const a=i*Math.PI/5;B(x+Math.cos(a)*.12,y+Math.sin(a)*.12,z,.045,.06,.045,c,[0,0,a*180/Math.PI-90])}disc(x,y,z+.03,.042,.01,dark)}
 else if(name.includes('Ant')){S(x,y+.05,z,.06,c,1);S(x,y-.045,z,.075,c,1);for(const sign of [-1,1]){for(const dy of [-.06,0,.05])line([x+sign*.03,y+dy,z],[x+sign*.15,y+dy-.04,z],.009,c);line([x+sign*.03,y+.09,z],[x+sign*.07,y+.17,z],.007,c)}}
 else if(name.includes('Shell')){disc(x,y,z,.14,.05,c,16);for(let i=0;i<22;i++){const a=i*.46,b=(i+1)*.46,r=.012+i*.005,r2=r+.005;line([x+Math.cos(a)*r,y+Math.sin(a)*r,z+.032],[x+Math.cos(b)*r2,y+Math.sin(b)*r2,z+.032],.008,dark)}}
 else if(name.includes('Stick')){line([x,y-.12,z],[x,y+.13,z],.012,c);for(const sign of [-1,1])for(const dy of [-.06,.02,.09])line([x,y+dy,z],[x+sign*.13,y+dy+.07,z],.008,c);S(x,y+.13,z,.027,c,1)}
 else if(name==='moonAmulet'){const pts=[[.1,.12],[.01,.16],[-.1,.12],[-.15,.02],[-.12,-.1],[-.02,-.15],[.1,-.12],[.02,-.09],[-.025,-.04],[-.035,.03],[.005,.085]].map(([a,b])=>[x+a,y+b]);P(pts,z,.035,[.85,.82,.27])}
 else{S(x,y,z,.14,white,2);for(const[dx,dy,col]of[[-.07,.05,green],[.07,.05,red],[0,-.05,gold]])S(x+dx,y+dy,z+.11,.04,col,1)}
}}
function gliding(name){return function(box,cy,sp){const{B,C,P,line}=kit(box,cy,sp);
 if(name==='parachute'){
  C(0,1.85,0,1.08,.23,white,90,0,0,.88);C(0,2.06,0,.88,.18,white,90,0,0,.5);C(0,2.18,0,.5,.07,white,90,0,0,.1);
  for(const sign of [-1,1])for(const zz of [-.35,.35])line([sign*.28,.35,zz*.4],[sign*.9,1.74,zz],.012,steel);
 }else{
  for(const sign of [-1,1]){P([[0,2.02],[sign*.5,1.95],[sign*1.6,1.32],[sign*1.83,1.2],[sign*1.48,1.7],[sign*.56,2.1]],-.12,1.15,black);P([[sign*.56,2.1],[sign*1.48,1.7],[sign*1.83,1.2],[sign*1.6,1.32]],-.12,1.18,gold);for(const zz of [-.4,.4])line([sign*.22,.3,zz*.4],[sign*1.15,1.7,zz],.018,steel)}
  B(0,2.02,0,.25,.07,1.2,gold);
 }
}}
function sprinkler(name){return function(x,y,z,box,cy,sp){
 const b=(...a)=>{a[0]+=x;a[1]+=y;a[2]+=z;return box(...a)};if(box.bssPolygon)b.bssPolygon=(pts,zz,d,c)=>box.bssPolygon(pts.map(([a,b])=>[a+x,b+y]),zz+z,d,c);
 const c=(...a)=>{a[0]+=x;a[1]+=y;a[2]+=z;return cy(...a)},s=(...a)=>{a[0]+=x;a[1]+=y;a[2]+=z;return sp(...a)};
 const{B,C,S,line,disc}=kit(b,c,s),tier=['basicSprinkler','silverSoakers','goldenGushers','diamondDiluters','superSaturator'].indexOf(name),col=[steel,white,gold,[.08,.66,.8],gold][tier];
 B(0,.05,0,.52,.1,.52,col);C(0,.39,0,.055,.62,col);C(0,.69,0,.12,.09,col);const n=tier===4?4:2;
 for(let i=0;i<n;i++){const a=i*Math.PI*2/n,dx=Math.cos(a)*.24,dz=Math.sin(a)*.24;line([0,.68,0],[dx,.68,dz],.045,col);C(dx,.76,dz,.075,.13,tier===4?white:col);C(dx,.84,dz,.06,.025,[.1,.3,.42])}
 if(tier===4){C(0,.57,0,.16,.16,white);C(0,.62,0,.19,.05,gold);C(0,.87,0,.085,.14,gold,90,0,0,.045);S(0,.96,0,.055,[.16,.65,.85],2)}
}}
window.bssPlanterVisuals={};
for(const name of ['paper','plastic','candy','redClay','blueClay','tacky','pesticide','petal','plenty'])window.bssPlanterVisuals[name+'Planter']=function(box,cy,sp){
 const{B,C,S,P,line,ring,leaf}=kit(box,cy,sp),soil=[.22,.13,.05];
 if(name==='paper'){
  B(0,.55,0,1.05,1.1,1.05,cream);for(const sign of [-1,1])P([[sign*.52,.05],[sign*.25,.3],[sign*.52,.7],[sign*.2,1.04]],.535,.014,tan);B(0,1.11,0,1.12,.1,1.12,tan);B(0,1.17,0,.9,.025,.9,soil);
 }else if(name==='plenty'){
  C(0,.12,0,.46,.15,gold);C(0,.45,0,.13,.6,gold);C(0,.92,0,.35,.4,gold,90,0,0,.66);C(0,1.23,0,.66,.23,gold);C(0,1.37,0,.7,.08,green);C(0,1.417,0,.57,.012,soil);
  for(const sign of [-1,1]){ring(sign*.61,1.06,0,.3,.32,.043,gold);line([sign*.78,.8,0],[sign*.6,.55,0],.035,gold)}
  B(0,1.02,.59,.26,.06,.025,green);B(-.1,1.04,.6,.045,.3,.025,green);B(.1,1.13,.6,.045,.12,.025,green);B(0,1.21,.6,.2,.04,.025,green);
 }else if(name==='pesticide'){
  for(const y of [.32,.93]){C(0,y,0,.38,.26,green,90,0,0,.65);C(0,y+.26,0,.65,.26,green,90,0,0,.38)}
  C(0,1.38,0,.4,.08,green);C(0,1.427,0,.31,.012,soil);for(const y of [.44,1.05]){P([[-.18,y-.12],[.18,y-.12],[0,y+.18]],.62,.014,gold);S(0,y,.64,.035,black,1)}
 }else{
  const col=name==='plastic'?gold:name==='candy'?purple:name==='redClay'?[.67,.19,.07]:name==='blueClay'?[.06,.17,.7]:name==='tacky'?[.5,.7,.2]:cream;
  C(0,.48,0,.44,.9,col,90,0,0,.64);C(0,1.01,0,.69,.16,col);C(0,1.1,0,.57,.018,soil);
  if(name==='candy')for(let i=0;i<5;i++){C(0,.16+i*.18,0,.46+i*.037,.04,i%2?green:white);S(Math.cos(i*1.3)*.63,1.02,Math.sin(i*1.3)*.63,.065,[red,gold,blue,green,white][i],1)}
  if(name==='petal'){for(let i=0;i<7;i++)leaf(Math.sin(i*Math.PI*2/7)*.42,1.05,Math.cos(i*Math.PI*2/7)*.5,.5,i*360/7,white);C(0,.18,0,.4,.15,white)}
  if(name==='tacky')for(let i=0;i<8;i++){const a=i*Math.PI/4;line([Math.cos(a)*.48,.15,Math.sin(a)*.48],[Math.cos(a+.4)*.63,.95,Math.sin(a+.4)*.63],.035,i%2?blue:red)}
  if(name==='redClay'||name==='blueClay')for(let i=0;i<12;i++){const a=i*Math.PI/6;line([Math.cos(a)*.45,.18,Math.sin(a)*.45],[Math.cos(a)*.5,.28,Math.sin(a)*.5],.013,dark)}
 }
};
window.installBssGearVisuals=function(gear){
 if(gear.__bssVisualVersion===3)return;Object.defineProperty(gear,'__bssVisualVersion',{value:3,configurable:true});
 const coverage=[];
 function replace(slot,name,fn){if(!gear[slot]||!gear[slot][name])throw new Error('Unknown gear '+slot+'.'+name);gear[slot][name].mesh=fn;coverage.push(slot+'.'+name)}
 for(const[id,kind]of Object.entries({diamondMask:'diamond',demonMask:'demon',gummyMask:'gummy',honeyMask:'honey',fireMask:'fire',bubbleMask:'bubble'}))replace('mask',id,mask(kind));
 for(const name of ['helmet','beekeeperMask','propellerHat'])replace('mask',name,simpleMask(name));
 for(const name of Object.keys(gear.backpack))if(name!=='none')replace('backpack',name,pack(name));
 for(const name of Object.keys(gear.belt))if(name!=='none')replace('belt',name,belt(name));
 for(const name of Object.keys(gear.boots))if(name!=='none')replace('boots',name,boots(name));
 for(const[slot,sign]of[['leftGuard',1],['rightGuard',-1]])for(const name of Object.keys(gear[slot]))if(name!=='none')replace(slot,name,guard(name,sign));
 for(const name of Object.keys(gear.tool))replace('tool',name,tool(name));
 for(const name of Object.keys(gear.sprinkler))if(name!=='none'){const fn=sprinkler(name);replace('sprinkler',name,fn);gear.sprinkler[name].shopMesh=fn}
 for(const name of ['parachute','glider'])replace('glider',name,gliding(name));
 for(const name of Object.keys(gear))if(name.endsWith('Amulet')&&typeof gear[name].mesh==='function'){gear[name].mesh=amulet(name);coverage.push(name)}
 window.bssGearVisualCoverage=Object.freeze(coverage);
};
})();
