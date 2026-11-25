# Bruitages d'AKTE 03 — sons NATURELS uniquement (pas de pop / whoosh / chime / buzzer / reveal / swell / boom).
# (son, repère, décalage s, gain dB, fondu de sortie s, durée max s)
P = [
 ("steps", "0", 0.05, -20, 0.3, 1.1),                       # elle entre au tribunal
 ("murmur", "0", 0.0, -28, 0.6, 1.6),                      # salle d'audience
 ("gavel", "b2@مسؤولة", 0.08, -7, None, None),             # la juge frappe
 ("stamp", "b2@شخصيا", 0.32, -7, None, None),              # HAFTET PERSÖNLICH
 ("tape_stick", "b3@سكتات", 0.05, -12, 0.2, 0.9),          # le scotch sur sa bouche
 ("padlock_rattle", "b4@الآخر", -0.05, -14, 0.2, 0.8),     # le cadenas du mot caché
 ("steps", "b5", 0.1, -20, 0.3, 1.4),                      # la patiente arrive
 ("icu", "b7", 0.0, -30, 1.0, 14.0),                       # bloc : respiration / appareils, très bas
 ("monitor", "b7", 0.0, -24, None, None),                  # moniteur : bips → alarme 11:30 → reprise → ligne plate
 ("steps", "b8", 0.1, -20, 0.3, 1.0),                      # Dr. K entre
 ("iv_drip", "b9@destilliertes", 0.3, -20, 0.5, 3.0),      # l'eau distillée coule
 ("tape_stick", "b11@والو", 0.05, -13, 0.2, 0.9),          # le scotch, encore
 ("heartbeat", "b14", 0.0, -18, 0.6, 3.0),                 # le sang, le cœur
 ("ticktock", "b15", 0.0, -18, 0.3, 1.6),                  # l'horloge avance jusqu'à 11:30
 ("cpr", "b16", 0.1, -16, 0.3, 2.3),                       # massage cardiaque
 ("icu", "b16@فاقتش", 0.0, -24, 1.0, 5.0),                 # respirateur
 ("murmur", "b17", 0.0, -26, 0.5, 1.5),                    # le tribunal
 ("steps", "b17", 0.1, -20, 0.3, 1.2),                     # le mari marche vers l'OLG
 ("stamp", "b18@شخصيا", 0.3, -8, None, None),              # HAFTET PERSÖNLICH (carte)
 ("padlock_open", "b19@واجب", -0.1, -10, None, None),      # le cadenas s'ouvre
 ("stamp", "b21@والمصحة", 0.58, -9, None, None),           # HAFTEN
 ("cash", "b21@بالتعويض", 0.0, -14, 0.3, 1.6),             # les billets vont à la famille
 ("steps", "b22@بصوت", -0.2, -19, 0.2, 0.5),               # elle monte les marches
 ("steps", "b22@سول", -0.1, -19, 0.2, 0.5),
 ("steps", "b22@طلع", -0.1, -19, 0.2, 0.5),
 ("door", "b22@Chefarzt", -0.1, -16, 0.3, 1.2),            # la porte du Chefarzt
 ("tape_rip", "b23@السكوت", 0.35, -11, 0.2, 0.9),          # elle arrache le scotch
]
