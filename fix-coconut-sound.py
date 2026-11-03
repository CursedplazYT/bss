"""Change only the coconut catch sound in the index.js next to this script."""
from pathlib import Path
import base64
import re
import sys

root = Path(__file__).resolve().parent
source = root / 'index.js'
audio = root / 'coconut-catch.ogg'
if not source.is_file():
    raise SystemExit('Put this script and coconut-catch.ogg beside your current index.js, then run it again.')
raw = source.read_bytes()
text = raw.decode('utf-8')
if '// Original coconut thud, once per landing.' in text:
    print('The coconut sound fix is already applied. No files changed.')
    sys.exit(0)
entry = r'("coconutCatch"\s*:\s*")data:audio/[^;"\s]+;base64,[^"]*(")'
if len(re.findall(entry, text)) != 1:
    raise SystemExit('Could not identify exactly one coconutCatch audio entry. No files changed.')
impact = "if(player.fieldIn===this.field||vec3.sqrDist(this.pos,[player.body.position.x,player.body.position.y,player.body.position.z])<=1600)gameAudio.effect('coconutImpact')"
catch = "gameAudio.effect('coconutCatch')"
if text.count(impact) != 1 or text.count(catch) != 1:
    raise SystemExit('Coconut sound calls differ from the expected version. No files changed.')
sound = audio.read_bytes()
if not sound.startswith(b'OggS'):
    raise SystemExit('The audio file is missing or invalid. No files changed.')
newline = '\r\n' if b'\r\n' in raw else '\n'
replacement = "// Original coconut thud, once per landing." + newline + "            const caughtForAudio=!this.isBigFatBully&&vec3.sqrDist(this.pos,[player.body.position.x,player.body.position.y,player.body.position.z])<=this.displaySize" + newline + "            if(player.fieldIn===this.field||vec3.sqrDist(this.pos,[player.body.position.x,player.body.position.y,player.body.position.z])<=1600)gameAudio.effect(caughtForAudio?'coconutCatch':'coconutImpact')"
# Make every check before writing, and preserve the file's existing line endings.
updated = text.replace(catch, '// Catch sound is played once by the landing handler.', 1)
updated = updated.replace(impact, replacement, 1)
url = 'data:audio/ogg;base64,' + base64.b64encode(sound).decode('ascii')
updated = re.sub(entry, lambda m: m[1] + url + m[2], updated, count=1)
source.write_bytes(updated.encode('utf-8'))
print('Updated coconut audio only in index.js. No visual or gameplay code was replaced.')
