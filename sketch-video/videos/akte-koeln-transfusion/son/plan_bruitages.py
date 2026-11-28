# AKTE 04 — placement des bruitages sur les repères de la voix de l'auteur (sons générés : son/sons.py).
# Sons NATURELS seulement. Rembobinage = vraie cassette (tape_rewind) + touche du magnétophone (tape_key / tape_stop).
# Champs : s = son, at = repère, off = décalage (s), g = gain (dB, son ramené à 0 dBFS de crête), dur = durée max,
#          until = repère de fin (le son boucle jusque-là), fade = fondu de sortie, src = départ dans le fichier, every = répétition (s)
def E(s, at, g, off=0.0, **k): return dict(s=s, at=at, g=g, off=off, **k)

P = [
 # accroche : la balance, la salle
 E("court_room", "0", -32, until="i1-0.1", fade=0.5),
 E("weight_drop", "b1@بالغلطة", -10),
 E("typewriter", "b1@مات", -24, dur=1.4),
 E("card_drop", "b2+0.1", -18),
 E("typewriter", "b2+0.25", -22, dur=0.9, src=1.0),
 E("stamp", "b2@طبيبة", -10, off=0.3),
 # « نرجعو شي شوية لور » : on rembobine la cassette
 E("tape_key", "b3@نرجعو", -14, off=-0.08),
 E("tape_rewind", "b3@نرجعو", -15, until="i1-0.1", fade=0.2),
 E("tape_stop", "i1", -15, off=-0.12),
 # intro
 E("page_back", "i1", -21, off=-0.02),
 E("pin_cork", "i1", -18, off=0.08),
 # b4–b6 : le rembobinage continue jusqu'à « وقبل كل شي »
 E("page_back", "b4", -18, off=-0.05),
 E("tape_rewind_l", "b4", -21, until="b6@شي", fade=0.15),
 E("pin_cork", "b4@Köln", -16),
 E("church_bell", "b4@Köln", -26, off=0.3, dur=3.5, fade=1.5),
 E("paper_slide", "b4@الورقة", -20, off=-0.1),
 E("pen_sign", "b4@سنات", -24, dur=0.6),
 E("page_back", "b5", -18, off=-0.05),
 E("iv_bags", "b5", -20, off=0.1),
 E("drop", "b5", -26, off=0.3), E("drop", "b5", -26, off=0.9),
 E("page_back", "b6", -18, off=-0.05),
 E("tape_stop", "b6@شي", -13, off=-0.05),
 E("marker_hatch", "b6@شي", -20, off=0.05, until="b6@وحدة", fade=0.1),
 E("footsteps", "b6", -24, dur=2.6, fade=0.4),
 E("stamp", "b7@service", -10),
 E("card_drop", "b7@زاد", -16, off=0.45),
 # la nuit, le couloir
 E("page_turn", "b8", -18, off=-0.05),
 E("hosp_night", "b8", -30, until="b9", fade=0.4),
 E("footsteps", "b8", -18, off=0.05, until="b8@الطبيبة", fade=0.3),
 E("page_turn", "b9", -18, off=-0.05),
 E("footsteps", "b9", -21, off=0.05, dur=0.85, src=1.0, fade=0.2),
 E("typewriter", "b9@Assistenzärztin", -23, dur=0.6, src=0.5),
 E("marker_hatch", "b9@7", -22, dur=0.6, src=0.4, fade=0.1),
 E("typewriter", "b10@formation", -23, dur=0.6, src=1.6),
 E("paper_slide", "b10@Blutführerschein", -20),
 # le labo, les deux poches
 E("page_turn", "b11", -18, off=-0.05),
 E("roller_shutter", "b11", -14, off=0.07),
 E("tray_slide", "b11", -16, off=0.3),
 E("iv_bags", "b11@عطاها", -22),
 E("tray_slide", "b11@فدقة", -20, dur=0.5, src=0.3, fade=0.1),
 E("paper_slide", "b12", -20),
 E("marker_hatch", "b12@الـgroupe", -24, dur=0.6, src=1.0, fade=0.1),
 # 21:50, la chambre
 E("page_turn", "b13", -18, off=-0.05),
 E("hosp_night", "b13", -34, until="FLAT+0.6", fade=0.8),
 E("iv_hook", "b13@علقات", -16, off=0.4),
 E("drop", "b13@poche", -28, off=0.4, every=1.0, until="b15@ووقفو"),
 E("pencil_tick", "b14@2", -22), E("pencil_tick", "b14@6", -22),
 E("bed_creak", "b15@كيتقيا", -20),
 E("footsteps", "b15@ووقفو", -20, dur=0.5, src=0.6, fade=0.1),
 E("iv_hook", "b15@ووقفو", -18, off=0.3),
 # dimanche : la goutte, puis plus rien
 E("page_turn", "b16", -18, off=-0.05),
 E("drop", "b16", -26, off=0.3, every=1.2, until="FLAT-0.25"),
 # muette 2 : elle glisse le long du mur
 E("cloth_wall", "b16@end+2.9", -14),
 E("steth_drop", "b16@end+3.35", -12),
 E("door_open", "b18@الإدارة", -14),
 # le bureau
 E("page_turn", "b19", -18, off=-0.05),
 E("leather_chair", "b19@وخلاتها", -18),
 E("paper_slide", "b19@الورقة", -18),
 E("typewriter", "b19@بلي", -21, dur=0.6, src=2.0),
 E("pen_sign", "b19@الـformation", -15, off=0.3, dur=0.6, fade=0.1),
 E("stamp", "b19@هادشي", -10),
 # des mois
 E("page_turn", "b20", -18, off=-0.05),
 E("wind_window", "b20", -30, until="b21", fade=0.6),
 # le tribunal
 E("page_turn", "b21", -18, off=-0.05), E("page_turn", "b21", -20, off=0.12),
 E("court_room", "b21", -33, until="b26", fade=0.6),
 E("card_drop", "b21@النيابة", -18, off=0.4),
 E("typewriter", "b21@النيابة", -21, off=0.42, dur=0.45, src=0.2),
 E("typewriter", "b21@طلبات", -21, dur=0.35, src=1.2),
 E("typewriter", "b21@7", -20, dur=0.45, src=2.2),   # b21@7 = « 90 » (un repère tout en chiffres est un rang)
 E("cart", "b22@المحكمة", -16),
 E("stone_set", "b22@يعني", -15, off=0.45), E("stone_set", "b22@غلطة", -15, off=0.45),
 E("stone_set", "b22@كبيرة", -15, off=0.45), E("stone_set", "b22@التنظيم", -15, off=0.45),
 E("brass_clink", "b23@صغيرة", -20),
 E("stamp", "b23@المسؤولية", -10),
 E("card_drop", "b24@عقبتهاش", -24, off=0.3),
 E("brass_clink", "b24@genug", -19), E("brass_clink", "b24@bestraft", -19),
 E("stamp", "b24@كافي", -10),
 E("folder_drop", "b25", -16),
 E("card_drop", "b25@نهائي", -24),
 # la règle
 E("page_turn", "b26", -18, off=-0.05),
 E("card_drop", "b26@قبل", -18),
 E("typewriter", "b26@كل", -23, dur=0.6, src=0.9),
 E("cart", "b26@حدا", -22, dur=1.0, fade=0.3),
 E("pencil_tick", "b26@السمية", -16), E("pencil_tick", "b26@الـgroupe", -16), E("pencil_tick", "b26@والنمرة", -16),
 E("card_drop", "b27@ودير", -20),
 E("drop", "b27@Bedside", -20, off=0.2), E("drop", "b27@Bedside", -20, off=0.4),
 E("pencil_tick", "b27@الـgroupe", -19),
 E("paper_slide", "b28@وعمرك", -20),
 E("marker_x", "b28@درتيهاش", -18),
 # la dernière phrase : on rembobine… et le sang ne revient pas
 E("page_back", "b29", -18, off=-0.05),
 E("tape_key", "b29@القصة", -14),
 E("tape_rewind", "b29@القصة", -19, off=0.05, until="b29@لور", fade=0.15),
 E("tape_stop", "b29@لور", -15),
 E("drop", "b29@transfusion", -14),
 E("tape_key", "b29@impossible", -14), E("tape_key", "b29@impossible", -14, off=0.22),
 E("tape_key", "b29@ترجعها", -18),
 E("drop", "b29@ترجعها", -12, off=0.25),
 # l'affiche
 E("card_drop", "b29@end+2.7", -20),
 E("marker_hatch", "b29@end+2.8", -26, dur=0.7, fade=0.2),
]

# Compteur à rouleaux, horloge, déclics : synthétisés (son/mixage.py). (genre, repère début, repère fin, nombre ou cadence, gain dB)
C = [
 ("roll",  "b1+0.15", "b1@حبس", 40, -18), ("clac", "b1@حبس", None, 1, -12),
 ("roll",  "b3@نرجعو", "i1-0.1", 40, -24),
 ("roll",  "b4", "b6@شي", 40, -26), ("clac", "b6@شي", None, 1, -12),
 ("count", "b6@شي+0.05", "b6@وحدة-0.05", 63, -20), ("clac", "b6@وحدة", None, 1, -11),
 ("idle",  "b6@وحدة", "b9", 2, -30),
 ("relay", "b8+0.35", None, 1, -24), ("relay", "b8@دوزات", None, 1, -24), ("relay", "b8@الطبيبة", None, 1, -24),
 ("count", "b8@دوزات", "b8@7-0.05", 12, -18), ("clac", "b8@7", None, 1, -12),
 ("idle",  "b13", "b16", 2, -30), ("idle", "b16", "FLAT-0.9", 2, -25),
 ("last",  "FLAT-0.9", None, 1, -25),                # les intervalles s'allongent, dernier clic juste avant la ligne plate
 ("tick",  "b13", "FLAT+0.15", 1, -27),              # la trotteuse s'arrête avec la ligne plate
 ("relay", "b22@Organisationsverschulden", None, 1, -16), ("clac", "b22@Organisationsverschulden+0.6", None, 1, -12),
 ("roll",  "b29@القصة", "b29@لور", 40, -22),
]
SILENCE = ("FLAT-0.3", "b17-0.25")   # aucune musique (la mort) ; FLAT = ligne plate du moniteur (window.ECG04, son/ecg_times.mjs)

# Retours en arrière (demande de l'auteur) : la musique elle-même est « rembobinée » comme une cassette —
# les secondes qui précèdent, jouées à l'envers et accélérées (×3 → ×5, la hauteur monte), puis la touche stop.
REWIND = [("b3@نرجعو", "i1-0.1"), ("b29@القصة", "b29@لور")]

# Stéréo (v2) : position gauche (−1) / droite (+1) de chaque son, d'après l'endroit de l'image ; « sweep » = il traverse l'image.
PAN = {"weight_drop": -0.4, "pin_cork": -0.45, "church_bell": 0.35, "roller_shutter": 0.2, "tray_slide": 0.25, "iv_hook": 0.35, "bed_creak": -0.2,
       "steth_drop": -0.45, "cloth_wall": -0.45, "door_open": 0.3, "leather_chair": 0.35, "pen_sign": -0.1, "cart": 0.4, "stone_set": 0.4,
       "brass_clink": -0.3, "pencil_tick": 0.12, "marker_x": 0.1, "iv_bags": 0.05, "marker_hatch": 0.1, "paper_slide": -0.05}
SWEEP = {"page_turn": (0.7, -0.7), "page_back": (-0.7, 0.7), "footsteps": (-0.35, 0.35)}
WIDE = {"court_room", "hosp_night", "wind_window", "tape_rewind", "tape_rewind_l"}     # ambiances et bande : larges (G et D décorrélés)
# Moniteur (v2) : un bip par battement de window.ECG04 (synthèse, 930 Hz × hauteur), puis le bip CONTINU de la ligne plate
MONITOR = dict(f0=930, night=-23, react=-20, sunday=-16, flat_g=-15, flat_end="b16@end+2.95", pan=0.12)
# Accents plus forts (retour de l'auteur : « ça doit attirer ») : + 3 dB pour les sons au-dessus de −20 dB, + 1 dB pour les autres
BOOST = (3.0, 1.0)
