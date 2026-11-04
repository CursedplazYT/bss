"""Update the current solo combo HUD, fall speed, and Chromebook visual preset."""
from pathlib import Path
import sys
root=Path(__file__).resolve().parent;path=root/'index.js'
if not path.is_file():raise SystemExit('Put these patch files beside your current index.js. No files changed.')
raw=path.read_bytes();crlf=b'\r\n' in raw;text=raw.decode('utf-8').replace('\r\n','\n')
if '// BSS compact coconut badge v3' in text:
 print('Compact coconut badge update is already installed. No files changed.');sys.exit(0)
if '// BSS solo coconut combo v2' not in text:raise SystemExit('Install the solo coconut combo update first. No files changed.')
def once(old,new):
 global text
 if text.count(old)!=1:raise SystemExit('Unexpected code near '+old[:70]+'. No files changed. Send your current index.js for inspection.')
 text=text.replace(old,new,1)
needle='function updateBssCoconutBeltHud('
if text.count(needle)!=1:raise SystemExit('Unexpected combo HUD. No files changed.')
a=text.index(needle);b=text.find('\n}',a)
if b<0:raise SystemExit('Could not locate HUD. No files changed.')
helper=(root/'coconut-badge.js').read_text()
text=text[:a]+'// BSS compact coconut badge v3\n'+helper.rstrip()+text[b+2:]
once('updateBssCoconutBeltHud(player)','updateBssCoconutBeltHud(player,user.viewMatrix,width,height)')
once('this.combo=beginBssComboCoconut(player,!!isBigFatBully)',"this.combo=beginBssComboCoconut(player,!!isBigFatBully)\n            this.soloComboPending=!isBigFatBully&&player.currentGear.belt==='coconutBelt'&&(player.extraInfo.coconutComboCatches||0)>=9&&!(player.bssCoconutJuggle&&player.bssCoconutJuggle.active)")
once('this.vel-=dt*20*(this.combo?Math.min(3,1+this.combo.kicks*0.06):1)','this.vel-=dt*(this.combo?bssCoconutFallAcceleration(this.combo.stacks):this.soloComboPending?2:20)')
# Hide only the decorative field blocks; field corruption/duplication stats still run.
a=text.index('    class GlitchEffect {');b=text.index('\n    class ',a+1);segment=text[a:b]
if segment.count('this.life-=dt')!=1:raise SystemExit('Unexpected field glitch renderer. No files changed.')
segment=segment.replace('this.life-=dt',"this.life-=dt\n            if(graphics.settings.showGlitches===false)return this.life<=0",1);text=text[:a]+segment+text[b:]
a=text.index('function createBssGraphics(');b=text.find('\n}',a)+2;segment=text[a:b]
if 'showGlitches' in segment:raise SystemExit('Graphics options already differ. No files changed.')
segment=segment.replace('showBubbles:true,starOpacity','showBubbles:true,showGlitches:true,starOpacity')
segment=segment.replace("['hideSpicyBees','explosions','trails','pollenText','showBubbles']","['hideSpicyBees','explosions','trails','pollenText','showBubbles','showGlitches']")
segment=segment.replace('<small>Hidden bees','<label><input data-showGlitches type="checkbox" style="height:auto"> Field glitch effects</label><small>Hidden bees')
segment=segment.replace('showBubbles:false,starOpacity','showBubbles:false,showGlitches:false,starOpacity').replace('dupeOpacity:0.35,scale:0.6','dupeOpacity:0,scale:0.6')
if 'showGlitches:false' not in segment or 'data-showGlitches' not in segment:raise SystemExit('Could not update Chromebook preset. No files changed.')
text=text[:a]+segment+text[b:]
if crlf:text=text.replace('\n','\r\n')
path.write_bytes(text.encode('utf-8'))
print('Updated: floating coconut xN badge, slow-to-fast combo falls, and hidden field glitches/dupes in Chromebook preset.')
