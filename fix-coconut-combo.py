"""Install the solo Coconut Combo update into the current index.js only."""
from pathlib import Path
import base64,re,sys
root=Path(__file__).resolve().parent
path=root/'index.js'
if not path.is_file():raise SystemExit('Put these patch files beside your CURRENT index.js. No files changed.')
raw=path.read_bytes();text=raw.decode('utf-8');crlf=b'\r\n' in raw;text=text.replace('\r\n','\n')
if '// BSS solo coconut combo v2' in text:
 print('Solo Coconut Combo update is already installed. No files changed.');sys.exit(0)
original=text

def once(old,new):
 global text
 if text.count(old)!=1:raise SystemExit('Unexpected code near '+old[:75]+'. No files changed. Send your current index.js for inspection.')
 text=text.replace(old,new,1)
def replace_function(name,new):
 global text
 needle='function '+name+'('
 if text.count(needle)!=1:raise SystemExit('Missing or duplicate '+name+'. No files changed.')
 a=text.index(needle);b=text.find('\n}',a)
 if b<0:raise SystemExit('Could not locate function end. No files changed.')
 text=text[:a]+new.rstrip()+text[b+2:]

helpers=(root/'combo-helpers.js').read_text()
a=helpers.index('function updateBssCoconutBeltHud(')
replace_function('beginBssComboCoconut',helpers[:a])
replace_function('updateBssCoconutBeltHud',helpers[a:])
catch_hook="""if(!this.combo&&recordBssSoloCoconutCatch(player,this.field)){
                        this.combo={stacks:0,kicks:0,lastField:null,colorHistory:{},lockedField:this.field}
                        gameAudio.effect('coconutComboIntro')
                        player.addMessage('Coconut Combo ready! Keep catching the blue circles.')
                    }
                    player.stats.fallingCoconuts++"""
once('player.stats.fallingCoconuts++',catch_hook)
advance='advanceBssCoconutCombo(this.combo,this.field,bssComboFieldColor(fieldInfo[this.field]))'
once(advance,advance+"""
                    player.bssCoconutJuggle={active:true,kicks:this.combo.kicks,stacks:this.combo.stacks,updatedAt:Date.now()}
                    if(this.combo.kicks>1){
                        const soundStep=(this.combo.kicks-2)%4+1
                        gameAudio.effect('coconutCombo'+soundStep)
                        if((this.combo.kicks-1)%4===0)gameAudio.effect('coconutComboBass'+(((this.combo.kicks-1)/4-1)%4+1))
                    }""")
# Restrict the end-of-chain hook to the Coconut class.
a=text.index('    class Coconut {');b=text.index('    class DrainingDiamond',a)
segment=text[a:b]
if segment.count('objects.mobs.splice(index,1)')!=1:raise SystemExit('Unexpected coconut end handler. No files changed.')
segment=segment.replace('objects.mobs.splice(index,1)',"if(this.combo&&player.bssCoconutJuggle)player.bssCoconutJuggle.active=false\n            objects.mobs.splice(index,1)",1)
text=text[:a]+segment+text[b:]
# Add original local audio to the existing mixer so all sound sliders apply.
files=[('coconutComboIntro','Cococombo_intro.ogg')]+[('coconutCombo'+str(i),'Cococombo'+str(i)+'.ogg') for i in range(1,5)]+[('coconutComboBass'+str(i),'Cococombo_bass'+str(i)+'.ogg') for i in range(1,5)]
setup=['// BSS solo coconut combo v2']
for key,name in files:
 data=(root/'combo-audio'/name).read_bytes()
 if not data.startswith(b'OggS'):raise SystemExit('Invalid audio file '+name+'. No files changed.')
 setup.append('    files.'+key+'="data:audio/ogg;base64,'+base64.b64encode(data).decode('ascii')+'"')
once('    const effectGains={','    '+ '\n'.join(setup)+'\n    const effectGains={coconutComboIntro:0.8,'+','.join('coconutCombo'+str(i)+':0.65,coconutComboBass'+str(i)+':0.45' for i in range(1,5))+',')
once('    const soundNames={',"    const soundNames={coconutComboIntro:'Coconut Combo intro',"+','.join("coconutCombo"+str(i)+":'Coconut Combo catch "+str(i)+"',coconutComboBass"+str(i)+":'Coconut Combo bass "+str(i)+"'" for i in range(1,5))+',')
once("const important=['oof'","const important=name.startsWith('coconutCombo')||['oof'")
text=text.replace('Every 40th player-spawned coconut becomes a Combo Coconut.','Every 10 successful catches with this belt starts a solo Combo Coconut.')
text=text.replace('Every 40 player-spawned coconuts creates a Combo Coconut.','Every 10 successful catches starts a solo Combo Coconut.')
# Keep ordinary catches free of the earlier extra tone and coin pickup noise.
entry=r'("coconutCatch"\s*:\s*")data:audio/[^;"\s]+;base64,[^"]*(")'
if len(re.findall(entry,text))!=1:raise SystemExit('Could not identify the ordinary coconut sound. No files changed.')
thud=(root/'combo-audio'/'Cocothud.ogg').read_bytes()
if not thud.startswith(b'OggS'):raise SystemExit('Invalid original coconut audio. No files changed.')
text=re.sub(entry,lambda m:m[1]+'data:audio/ogg;base64,'+base64.b64encode(thud).decode('ascii')+m[2],text,count=1)
impact="if(player.fieldIn===this.field||vec3.sqrDist(this.pos,[player.body.position.x,player.body.position.y,player.body.position.z])<=1600)gameAudio.effect('coconutImpact')"
if impact in text:
 once("gameAudio.effect('coconutCatch')",'// Ordinary catch audio is played by the landing handler.')
 once(impact,"const caughtForAudio=!this.isBigFatBully&&vec3.sqrDist(this.pos,[player.body.position.x,player.body.position.y,player.body.position.z])<=this.displaySize\n            if(player.fieldIn===this.field||vec3.sqrDist(this.pos,[player.body.position.x,player.body.position.y,player.body.position.z])<=1600)gameAudio.effect(caughtForAudio?'coconutCatch':'coconutImpact')")
elif "caughtForAudio?'coconutCatch':'coconutImpact'" not in text:raise SystemExit('Unexpected coconut landing audio. No files changed.')
coin="if(this.type!=='honey'||this.from!=='Coconut')gameAudio.lootPickup(this.type)"
if coin not in text:once('gameAudio.lootPickup(this.type)',coin)
once('    registerBssCoconutBelt(gear)\n',"    registerBssCoconutBelt(gear)\n    gear.belt.coconutBelt.desc=gear.belt.coconutBelt.desc.replace('Every 40th player-spawned coconut becomes a Combo Coconut.','Catching 10 coconuts with this belt starts a solo Combo Coconut.')\n")
if crlf:text=text.replace('\n','\r\n')
path.write_bytes(text.encode('utf-8'))
print('Installed: 10-catch solo combos, passive icon, catch/juggle counters, and 9 original combo audio clips.')
print('Coconut Belt must be equipped. Catch progress pauses while juggling and in Ant Field.')
