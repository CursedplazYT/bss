// BSS top Coconut Combo icon v5
function updateBssCoconutBeltHud(player){
    const now=Date.now(),buff=player.extraInfo.coconutCombo
    const active=!!(buff&&buff.expiresAt>now),equipped=player.currentGear.belt==='coconutBelt'
    let state=window.bssCoconutBeltHud
    if(!state||state.version!==5){
        if(state)for(const node of [state.panel,state.svg,state.badge,state.icon,state.tooltip])if(node&&node.remove)node.remove()
        for(const id of ['bssCoconutComboStatus','bssCoconutComboBadge','bssCoconutComboPassive']){const old=document.getElementById(id);if(old)old.remove()}
        if(!active&&!equipped)return
        const row=document.getElementById('gearInfoList')
        if(!row)return
        const icon=document.createElement('span')
        icon.id='bssCoconutComboTop'
        icon.style.cssText='position:relative;display:inline-block;width:34px;height:34px;vertical-align:middle;pointer-events:auto;cursor:help;margin:0 2px'
        icon.innerHTML='<img alt="Coconut Combo" src="BSS_COMBO_ICON_DATA" style="width:34px;height:34px;display:block;border-radius:3px"><span class="comboCount" style="position:absolute;right:1px;bottom:0;color:white;font:bold 12px Arial;text-shadow:1px 1px 1px black,-1px -1px 1px black"></span><span class="comboBar" style="position:absolute;bottom:0;left:0;height:3px;background:#58dbff"></span>'
        const tooltip=document.createElement('div')
        tooltip.style.cssText='display:none;position:fixed;z-index:100000;pointer-events:none;white-space:pre-line;max-width:310px;background:#202020f5;color:white;border:2px solid #d2e65b;border-radius:6px;padding:10px;font:14px/1.45 Arial;text-shadow:none'
        document.body.appendChild(tooltip);row.appendChild(icon)
        state=window.bssCoconutBeltHud={version:5,icon,tooltip,label:icon.querySelector('.comboCount'),bar:icon.querySelector('.comboBar'),last:0,hover:false}
        icon.addEventListener('mouseenter',()=>{state.hover=true;state.last=0})
        icon.addEventListener('mouseleave',()=>{state.hover=false;tooltip.style.display='none'})
    }
    state.icon.style.display=active||equipped?'inline-block':'none'
    if(now-state.last<200)return
    state.last=now
    const live=player.bssCoconutJuggle,juggling=!!(equipped&&live&&live.active&&now-live.updatedAt<8000&&!player.dead)
    const stacks=active?buff.stacks:0,caught=Math.max(0,Math.min(9,Math.floor(Number(player.extraInfo.coconutComboCatches)||0)))
    state.label.textContent=active?'x'+stacks:caught+'/10'
    state.bar.style.width=(34*(active?Math.max(0,Math.min(1,(buff.expiresAt-now)/30000)):caught/10))+'px'
    let text='Coconut Combo'+(active?' x'+stacks:' — charging')
    if(active){
        const b=bssCoconutComboBonuses(stacks),fmt=n=>Number(n.toFixed(3)).toString()
        text+='\n'+Math.ceil((buff.expiresAt-now)/1000)+'s remaining'
        text+='\nx'+fmt(b.pollen)+' pollen'
        text+='\nx'+fmt(b.color)+' red, blue and white pollen'
        text+='\nx'+fmt(b.pollen*b.color)+' combined color pollen multiplier'
        text+='\nx'+fmt(b.attack)+' bee attack'
        text+='\nx'+fmt(b.honey)+' honey from tokens'
        text+='\n'+fmt(b.unique*100)+'% unique instant conversion'
        text+='\n'+(juggling?'Juggling: '+live.kicks+'/50 catches':'Juggling ended; earned buff remains until the timer expires.')
    }else text+='\n'+caught+'/10 catches until the next combo.\nNo Coconut Combo bonuses active.'
    state.tooltip.textContent=text
    state.icon.setAttribute('aria-label',text)
    state.tooltip.style.display=state.hover&&(active||equipped)?'block':'none'
    if(state.hover){const r=state.icon.getBoundingClientRect();state.tooltip.style.left=Math.max(5,Math.min(r.left,window.innerWidth-325))+'px';state.tooltip.style.top=(r.bottom+6)+'px'}
}
