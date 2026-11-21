# Maquette de l'interface Instagram Reels, mesurée sur une capture réelle du Reel AKTE 01 publié (iPhone, nov. 2026).
# La vidéo 1080x1920 est affichée à 0,942x de sa hauteur et rognée d'environ 50 px de chaque côté.
# Zones (pixels de la vidéo) : bords rognés x<50 et x>1030 ; barre d'état + flèche retour y<250 ;
# boutons j'aime/commentaire/repartage/partage x>915 pour y 980-1650 ; pseudo/légende/musique y>1650.
# Usage : python3 tools/ig_overlay.py capture.png [sortie.png]
import sys
from PIL import Image, ImageDraw
W, H = 1080, 1920
ov = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
d.rectangle((0, 0, 50, H), fill=(0, 0, 0, 170)); d.rectangle((1030, 0, W, H), fill=(0, 0, 0, 170))      # rognage
for y in range(0, 260): d.line([(50, y), (1030, y)], fill=(0, 0, 0, int(70 * (1 - y / 260))))
d.text((110, 60), "20:43", fill=(255, 255, 255, 255)); d.line([(150, 190), (128, 212), (150, 234)], fill=(255, 255, 255, 255), width=6)
for y in range(1600, H): d.line([(50, y), (1030, y)], fill=(0, 0, 0, int(150 * (y - 1600) / (H - 1600))))
for y in (1000, 1175, 1350, 1525):                                                                     # colonne de boutons
    d.ellipse((925, y, 985, y + 60), outline=(255, 255, 255, 255), width=6); d.rectangle((935, y + 75, 975, y + 100), fill=(255, 255, 255, 180))
d.ellipse((90, 1690, 190, 1790), fill=(220, 220, 220, 255)); d.rectangle((215, 1705, 560, 1745), fill=(255, 255, 255, 200))
d.rectangle((150, 1830, 750, 1860), fill=(255, 255, 255, 160))
for r in [(0, 0, 50, H), (1030, 0, W, H), (50, 0, 1030, 250), (915, 980, 1030, 1650), (50, 1650, 1030, H)]:
    d.rectangle(r, outline=(255, 40, 40, 255), width=4)
im = Image.open(sys.argv[1]).convert("RGBA").resize((W, H)); im.alpha_composite(ov)
im.convert("RGB").save(sys.argv[2] if len(sys.argv) > 2 else sys.argv[1].replace(".png", "_ig.png"))
