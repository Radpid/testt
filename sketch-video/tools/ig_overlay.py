# Maquette de l'interface Instagram Reels (1080x1920) à superposer sur des captures pour vérifier les zones sûres.
# Zones à éviter (contour rouge) : en-tête 0–220 px ; bas 1500–1920 px (pseudo, légende, musique, barre) ;
# colonne de boutons à droite x > 960 pour y 1000–1500.
# Usage : python3 tools/ig_overlay.py capture.png [sortie.png]
import sys
from PIL import Image, ImageDraw
W, H = 1080, 1920
ov = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
for y in range(0, 230): d.line([(0, y), (W, y)], fill=(0, 0, 0, int(90 * (1 - y / 230))))
for y in range(1480, H): d.line([(0, y), (W, y)], fill=(0, 0, 0, int(150 * (y - 1480) / (H - 1480))))
for y in (1130, 1260, 1390, 1500): d.ellipse((985, y, 1045, y + 60), outline=(255, 255, 255, 255), width=6)
d.ellipse((40, 1600, 110, 1670), fill=(220, 220, 220, 255)); d.rectangle((130, 1615, 560, 1655), fill=(255, 255, 255, 200))
d.rectangle((40, 1695, 900, 1725), fill=(255, 255, 255, 150)); d.rectangle((40, 1765, 600, 1790), fill=(255, 255, 255, 150))
d.rectangle((0, 1840, W, H), fill=(0, 0, 0, 200))
for r in [(0, 0, W, 220), (0, 1500, W, H), (960, 1000, W, 1500)]: d.rectangle(r, outline=(255, 40, 40, 255), width=4)
im = Image.open(sys.argv[1]).convert("RGBA").resize((W, H)); im.alpha_composite(ov)
im.convert("RGB").save(sys.argv[2] if len(sys.argv) > 2 else sys.argv[1].replace(".png", "_ig.png"))
