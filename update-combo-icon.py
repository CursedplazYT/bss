from pathlib import Path
import base64,shutil
p=Path('index.js'); raw=p.read_bytes(); crlf=b'\r\n' in raw
s=raw.decode('utf-8-sig').replace('\r\n','\n')
if '// BSS top Coconut Combo icon v5' in s:raise SystemExit('Already installed.')
if '// BSS solo coconut combo v2' not in s:raise SystemExit('Requires the solo coconut combo update. No changes made.')
a=s.index('function updateBssCoconutBeltHud(')
b=s.index('// Keep the belt shop entry usable',a)
root=Path(__file__).resolve().parent
image='data:image/png;base64,'+base64.b64encode((root/'coconut-combo.png').read_bytes()).decode()
hud=(root/'combo-hud.js').read_text().replace('BSS_COMBO_ICON_DATA',image)
s=s[:a]+hud+'\n\n'+s[b:]
backup=p.with_name('index.before-combo-icon.js')
if backup.exists():raise SystemExit('Backup exists; rename it before retrying. No changes made.')
shutil.copy2(p,backup);p.write_bytes(s.replace('\n','\r\n' if crlf else '\n').encode())
print('Updated top-row icon and active-bonus tooltip. Backup: '+backup.name)
