function bssCoconutFallAcceleration(stacks){
    const n=Math.max(1,Math.min(100,Number(stacks)||1))
    return 2+0.28*(n-1)
}
function updateBssCoconutBeltHud(player,viewMatrix,width,height){
    let state=window.bssCoconutBeltHud
    const now=Date.now(),buff=player.extraInfo.coconutCombo
    const active=!!(buff&&buff.expiresAt>now)
    const equipped=player.currentGear.belt==='coconutBelt'
    if(!state||state.version!==3){
        if(state){for(const node of [state.panel,state.svg,state.badge])if(node&&node.remove)node.remove()}
        const stale=document.getElementById('bssCoconutComboStatus');if(stale&&stale.remove)stale.remove()
        if(!active&&!equipped)return
        const badge=document.createElement('div')
        badge.id='bssCoconutComboBadge'
        badge.style.cssText='position:fixed;z-index:99999;display:none;align-items:center;gap:3px;pointer-events:none;transform:translate(-50%,-100%);color:white;font:bold 23px Arial;text-shadow:0 2px 2px #000,1px 0 #000,-1px 0 #000;filter:drop-shadow(0 2px 2px #0007)'
        badge.innerHTML='<svg width="35" height="35" viewBox="0 0 35 35" aria-hidden="true"><ellipse cx="17.5" cy="17.5" rx="16" ry="13" transform="rotate(35 17.5 17.5)" fill="#86a94a" stroke="#e9f4c9" stroke-width="2"/><ellipse cx="17.5" cy="17.5" rx="12" ry="9" transform="rotate(35 17.5 17.5)" fill="#83542d" stroke="#f6efd5" stroke-width="2"/><circle cx="14" cy="13" r="1.8" fill="#29180a"/><circle cx="21" cy="16" r="1.8" fill="#29180a"/><circle cx="16" cy="21" r="1.8" fill="#29180a"/></svg><span class="comboLabel">x0</span>'
        document.body.appendChild(badge)
        // Keep the small charge icon among the existing passive icons.
        const svg=document.createElementNS('http://www.w3.org/2000/svg','svg')
        svg.id='bssCoconutComboPassive';svg.setAttribute('width','38');svg.setAttribute('height','34');svg.setAttribute('viewBox','0 0 38 34')
        svg.style.cssText='width:38px;height:34px;vertical-align:middle;cursor:help'
        svg.innerHTML='<title>Coconut Combo</title><circle cx="16" cy="15" r="13" fill="#3c864b" stroke="#171717" stroke-width="2"/><circle cx="16" cy="15" r="9" fill="#83542d"/><circle cx="13" cy="12" r="1.6" fill="#f6efd5"/><circle cx="20" cy="12" r="1.6" fill="#f6efd5"/><circle cx="16" cy="19" r="1.6" fill="#f6efd5"/><rect x="2" y="29" width="34" height="4" rx="2" fill="#34220c"/><rect class="comboCharge" x="2" y="29" width="0" height="4" rx="2" fill="#4fe1ff"/><text class="comboCount" x="37" y="26" text-anchor="end" fill="white" stroke="black" stroke-width=".4" style="font:bold 10px Arial;paint-order:stroke">0/10</text>'
        const anchor=document.getElementById('coconutHastePassive')||document.getElementById('diamondDrainPassive')
        if(anchor&&anchor.parentNode)anchor.parentNode.appendChild(svg)
        else{svg.style.position='fixed';svg.style.left='12px';svg.style.top='105px';document.body.appendChild(svg)}
        state=window.bssCoconutBeltHud={version:3,badge,svg,label:badge.querySelector('.comboLabel'),charge:svg.querySelector('.comboCount'),bar:svg.querySelector('.comboCharge'),title:svg.querySelector('title'),last:0}
    }
    state.svg.style.display=active||equipped?'inline-block':'none'
    const live=player.bssCoconutJuggle
    const juggling=equipped&&live&&live.active&&now-live.updatedAt<8000&&!player.dead
    const stacks=juggling?live.stacks:active?buff.stacks:0
    // Follow the player in screen space; never show behind the camera.
    let visible=false
    if(stacks>0&&!player.dead&&viewMatrix&&width>0&&height>0){
        const p=player.body.position,x=p.x,y=p.y+2.75,z=p.z,m=viewMatrix
        const cx=m[0]*x+m[4]*y+m[8]*z+m[12],cy=m[1]*x+m[5]*y+m[9]*z+m[13],cw=m[3]*x+m[7]*y+m[11]*z+m[15]
        if(cw>0){const sx=(cx/cw+1)*width/2,sy=(1-cy/cw)*height/2;visible=sx>=-50&&sx<=width+50&&sy>=0&&sy<=height+50;if(visible){state.badge.style.left=sx.toFixed(1)+'px';state.badge.style.top=sy.toFixed(1)+'px'}}
    }
    state.badge.style.display=visible?'flex':'none'
    const text='x'+stacks;if(state.label.textContent!==text)state.label.textContent=text
    if(now-state.last<200)return
    state.last=now
    const caught=Math.max(0,Math.min(9,Math.floor(Number(player.extraInfo.coconutComboCatches)||0)))
    state.charge.textContent=active||juggling?'x'+stacks:caught+'/10'
    state.bar.setAttribute('width',String(juggling?34:active?34*Math.max(0,Math.min(1,(buff.expiresAt-now)/30000)):34*caught/10))
    let tip='Coconut Combo: '+caught+'/10 catches. Total caught: '+Math.max(0,Math.floor(Number(player.stats&&player.stats.fallingCoconuts)||0))+'.'
    if(juggling)tip+=' Juggling '+live.kicks+'/50; '+live.stacks+' stacks.'
    if(active)tip+=' Buff x'+buff.stacks+': '+Math.ceil((buff.expiresAt-now)/1000)+'s remaining.'
    state.title.textContent=tip
}
