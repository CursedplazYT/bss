from pathlib import Path
import shutil
p=Path('index.js')
if not p.exists():raise SystemExit('Put this script beside index.js and run it there.')
raw=p.read_bytes();s=raw.decode('utf-8-sig');crlf=b'\r\n' in raw;s=s.replace('\r\n','\n')
marker='// BSS combo timing and badge v4'
if marker in s:raise SystemExit('This fix is already installed.')
if '// BSS compact coconut badge v3' not in s:raise SystemExit('Install the previous combo badge / Chromebook update first. No files changed.')
def replace(a,b):
 global s
 if s.count(a)!=1:raise SystemExit('Unexpected game version: '+a[:90]+'. No files changed.')
 s=s.replace(a,b,1)
replace('updateBssCoconutBeltHud(player,user.viewMatrix,width,height)','updateBssCoconutBeltHud(player,player.viewMatrix,window.innerWidth,window.innerHeight)')
replace('this.vel-=dt*(this.combo?bssCoconutFallAcceleration(this.combo.stacks):this.soloComboPending?2:20)','this.vel-=dt*20')
replace('this.delay=0.25','this.delay=bssCoconutComboDelay(this.combo.kicks)')
replace('function bssCoconutFallAcceleration(stacks){\n    const n=Math.max(1,Math.min(100,Number(stacks)||1))\n    return 2+0.28*(n-1)\n}',marker+'\nfunction bssCoconutComboDelay(catches){\n    return Math.max(0.15,3*Math.pow(0.88,Math.max(0,(Number(catches)||1)-1)))\n}')
replace('if(this.combo.kicks>1){\n                        const soundStep=(this.combo.kicks-2)%4+1','if(this.combo.kicks>0){\n                        const soundStep=(this.combo.kicks-1)%4+1')
replace('if(now-(lastPlayed[name]??-Infinity)<gap||playing.size>=(important?16:10))return',"""if(now-(lastPlayed[name]??-Infinity)<gap)return
        // Combo catch cues take priority over background token sounds.
        if(name.startsWith('coconutCombo')){
            if(playing.size>=16){
                const old=Array.from(playing).find(a=>!String(a.bssEffect).startsWith('coconutCombo'))||playing.values().next().value
                if(old){old.pause();playing.delete(old);old.removeAttribute('src');old.load()}
            }
        }else if(playing.size>=(important?16:10))return""")
# Raise default gain without overriding the user's saved mute or slider choices.
for n in range(1,5):replace('coconutCombo'+str(n)+':0.65','coconutCombo'+str(n)+':1.0')
backup=p.with_name('index.before-combo-v4.js')
if backup.exists():raise SystemExit('Backup already exists. Rename it before retrying. No files changed.')
shutil.copy2(p,backup)
p.write_bytes(s.replace('\n','\r\n' if crlf else '\n').encode('utf-8'))
print('Fixed: normal fall speed, shrinking wait between combo coconuts, correct camera for xN badge, and priority catch audio. Backup: '+backup.name)
