function beginBssComboCoconut(player,isEnemy){
    // Solo combos now charge from successful catches, never from thrown items.
    return null
}
function recordBssSoloCoconutCatch(player,field,now=Date.now()){
    if(player.dead||player.currentGear.belt!=='coconutBelt'||field==='AntField')return false
    const live=player.bssCoconutJuggle
    if(live&&live.active&&now-live.updatedAt<8000)return false
    const previous=Math.max(0,Math.min(9,Math.floor(Number(player.extraInfo.coconutComboCatches)||0)))
    const count=previous+1
    player.extraInfo.coconutComboCatches=count%10
    return count===10
}
function updateBssCoconutBeltHud(player){
    let state=window.bssCoconutBeltHud
    const now=Date.now(),buff=player.extraInfo.coconutCombo
    const active=!!(buff&&buff.expiresAt>now)
    const equipped=player.currentGear.belt==='coconutBelt'
    if(!state||state.version!==2){
        if(state&&state.panel&&state.panel.remove)state.panel.remove()
        if(!active&&!equipped)return
        const panel=document.createElement('div')
        panel.id='bssCoconutComboStatus'
        panel.style.cssText='position:fixed;bottom:12px;left:12px;z-index:99999;background:#fff4cb;color:#302508;border:2px solid #b58a15;border-radius:8px;padding:7px 10px;font:13px Arial;pointer-events:none;line-height:1.5;white-space:pre-line'
        document.body.appendChild(panel)
        const svg=document.createElementNS('http://www.w3.org/2000/svg','svg')
        svg.id='bssCoconutComboPassive';svg.setAttribute('width','46');svg.setAttribute('height','36');svg.setAttribute('viewBox','0 0 46 36')
        svg.style.cssText='width:46px;height:36px;vertical-align:middle;cursor:help'
        svg.innerHTML='<title>Coconut Combo</title><circle cx="17" cy="16" r="14" fill="#147bb9" stroke="#171717" stroke-width="2"/><circle cx="17" cy="16" r="10" fill="#805021"/><circle cx="14" cy="12" r="2" fill="#fff4dc"/><circle cx="20" cy="12" r="2" fill="#fff4dc"/><circle cx="17" cy="19" r="2" fill="#fff4dc"/><rect x="2" y="29" width="42" height="5" rx="2" fill="#34220c"/><rect class="comboCharge" x="2" y="29" width="0" height="5" rx="2" fill="#4fe1ff"/><text class="comboCount" x="45" y="26" text-anchor="end" fill="white" stroke="black" stroke-width=".4" style="font:bold 11px Arial;paint-order:stroke">0/10</text>'
        const anchor=document.getElementById('coconutHastePassive')||document.getElementById('diamondDrainPassive')
        if(anchor&&anchor.parentNode)anchor.parentNode.appendChild(svg)
        else{svg.style.position='fixed';svg.style.left='12px';svg.style.bottom='100px';svg.style.zIndex='99999';document.body.appendChild(svg)}
        state=window.bssCoconutBeltHud={version:2,panel,svg,label:svg.querySelector('.comboCount'),bar:svg.querySelector('.comboCharge'),title:svg.querySelector('title'),last:0,lastText:''}
    }
    state.panel.style.display=active||equipped?'block':'none'
    state.svg.style.display=active||equipped?'inline-block':'none'
    if(now-state.last<200)return
    state.last=now
    const caught=Math.max(0,Math.min(9,Math.floor(Number(player.extraInfo.coconutComboCatches)||0)))
    const live=player.bssCoconutJuggle
    const juggling=equipped&&live&&live.active&&now-live.updatedAt<8000&&!player.dead
    let text=equipped?'Coconut Combo: '+caught+'/10 catches':'Coconut Combo'
    text+='\nTotal coconuts caught: '+Math.max(0,Math.floor(Number(player.stats&&player.stats.fallingCoconuts)||0))
    if(juggling)text+='\nJuggling: '+live.kicks+'/50 catches | '+live.stacks+' stacks'
    else if(equipped)text+='\n'+(player.fieldIn==='AntField'?'Charge pauses in Ant Field.':'Catch '+(10-caught)+' more to start a combo.')
    if(active)text+='\nCombo x'+buff.stacks+' | '+Math.ceil((buff.expiresAt-now)/1000)+'s remaining'
    if(text!==state.lastText){state.panel.textContent=text;state.lastText=text}
    state.label.textContent=juggling?'x'+live.stacks:caught+'/10'
    state.bar.setAttribute('width',String(juggling?42:42*caught/10))
    let tip='Coconut Belt: 10 successful catches start a solo combo. Juggle up to 50 catches. Buff lasts 30 seconds.'
    if(active){const b=bssCoconutComboBonuses(buff.stacks);tip+=' x'+b.pollen.toFixed(2)+' pollen; x'+b.color.toFixed(2)+' color pollen; x'+b.attack.toFixed(2)+' attack; x'+b.honey.toFixed(2)+' honey from tokens; '+Math.round(b.unique*100)+'% unique instant conversion.'}
    state.title.textContent=tip;state.panel.title=tip
}
