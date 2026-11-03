# Install the visual update

Extract this archive. Upload the CONTENTS of the bss-main folder into the root of your existing GitHub repository, replacing matching files. Keep the assets/bss folder structure. Commit the upload, wait for GitHub Pages to deploy, then press Ctrl+Shift+R.

Changed files:
- index.html: original artwork for all 82 inventory item icons, preserving descriptions and quantities.
- index.js: local artwork initialization, loot texture overlays, shop image previews, and gear visual integration.
- visual-assets.js: local image manifest and one-time loading/atlas painting.
- gear-visuals.js: six reference-based mask models, corrected Coconut Belt, Gummy Boots detail, smoother round parts and bounded colors across existing gear.
- assets/bss/: 170 local original-art PNGs, including every gear entry sold in the shops.

The rest of the project is included unchanged. No saved-game reset is needed. Existing stats, prices, abilities, audio settings and progression are retained.

The inventory/shop images are original item artwork. The 3D meshes are fan recreations: the masks and belt have been rebuilt; the other models retain their existing silhouettes with smoother surfaces and corrected overexposed colors. This package does not contain original Roblox 3D meshes or promise exact 3D replicas. Eight amulet-tier art variants not used in the shops remain unavailable; their existing 3D representations are retained.

Validation: all 103 gear/tool mesh functions ran with finite geometry arguments; stats/cost definitions were unchanged; all 82 inventory descriptions/count nodes were preserved; local image/script paths resolved; previous targeted gameplay/audio/rate checks passed. Full in-game browser validation was unavailable in this environment.
