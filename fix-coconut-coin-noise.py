"""Silence pickup audio only for honey tokens spawned by caught coconuts."""
from pathlib import Path
import sys
path=Path(__file__).resolve().parent/'index.js'
if not path.is_file():
    raise SystemExit('Put this script beside your current index.js and run it again. No files changed.')
raw=path.read_bytes()
source=raw.decode('utf-8')
marker="if(this.type!=='honey'||this.from!=='Coconut')gameAudio.lootPickup(this.type)"
if marker in source:
    print('The coconut coin-noise fix is already applied. No files changed.')
    sys.exit(0)
needle='gameAudio.lootPickup(this.type)'
if source.count(needle)!=1:
    raise SystemExit('Expected one loot pickup sound call. No files changed; send your current index.js for inspection.')
start=source.find('    class LootToken {')
pos=source.index(needle)
if start<0 or not start<pos<source.find('\n    class ',start+1):
    raise SystemExit('The sound call is outside the expected LootToken class. No files changed.')
path.write_bytes(source.replace(needle,marker,1).encode('utf-8'))
print('Only coconut-created honey tokens are now silent when picked up. Other sounds and gameplay are unchanged.')
