# AKTE 04 — bruitages générés par ElevenLabs (sound-generation) : uniquement de VRAIS bruits d'objets.
# Jamais de whoosh, pop, ding, riser, swell, boom, son inversé (= sons « typiques IA »).
# Le rembobinage (demande de l'auteur) = une vraie cassette qu'on rembobine + la touche du magnétophone.
# Usage : python3 son/sons.py out/son        (ne régénère pas un son déjà présent ; clé lue dans $ELEVEN_KEY_FILE)
import json, os, sys, subprocess, concurrent.futures as cf

OUT = sys.argv[1]; os.makedirs(OUT, exist_ok=True)
KEY = open(os.environ["ELEVEN_KEY_FILE"]).read().strip()
REAL = (" Realistic foley recording, close microphone, dry small room, one natural acoustic sound only."
        " No music, no whoosh, no synth, no sci-fi, no cinematic effect, no added reverb.")
S = {  # nom : (durée s, description)
 "tape_rewind":   (3.0, "A real 1980s cassette tape deck in fast rewind: the small motor whirs and the tape spools very fast with the typical rising high-pitched tape squeal, mechanical and fluttery."),
 "tape_rewind_l": (5.5, "A real portable cassette recorder rewinding a tape at high speed for several seconds: steady motor whir, spinning reels, light tape flutter and squeal."),
 "tape_stop":     (0.7, "The chunky mechanical clunk of the stop key on an old cassette deck: the rewinding reels stop at once, plastic and metal click."),
 "tape_key":      (0.6, "One heavy piano-style key pressed down on an old cassette recorder, single mechanical clack."),
 "court_room":    (8.0, "Steady quiet room tone of an empty wood-panelled courtroom: constant faint air only, no events, no creaks, no clinks, no movement."),
 "weight_drop":   (1.6, "A heavy iron block dropped onto the brass pan of an old balance scale, the thin metal chains rattle and swing."),
 "stamp":         (0.7, "A rubber stamp pressed hard onto a sheet of paper on a wooden desk, one firm thud."),
 "typewriter":    (3.0, "An old mechanical typewriter typing fast, crisp individual key strikes, no bell, no carriage return."),
 "card_drop":     (0.8, "A thick paper card falls flat onto a wooden table, soft slap."),
 "page_turn":     (0.8, "One stiff cardboard page of a wall planner flipped over quickly by hand, short paper flap."),
 "page_back":     (0.8, "A stiff cardboard page folded back quickly by hand, dry short paper snap."),
 "pin_cork":      (0.5, "A push pin pressed into a cork board, small tight click."),
 "church_bell":   (4.0, "One single strike of a big cathedral bell far away over a city, long natural decay."),
 "iv_bags":       (1.2, "Two soft plastic blood bags hanging side by side gently bump together, soft plastic crinkle."),
 "marker_hatch":  (2.5, "A felt-tip marker quickly hatching short lines on paper pinned to a board, scratchy strokes."),
 "footsteps":     (3.0, "Tired footsteps of one person in hospital clogs walking on a linoleum floor."),
 "hosp_night":    (8.0, "Hospital corridor at night, low ventilation hum and a faint fluorescent light buzz, very quiet."),
 "roller_shutter":(1.5, "A small metal roller shutter of a hospital lab hatch rolls up quickly."),
 "tray_slide":    (1.0, "A stainless steel tray slides across a metal counter."),
 "iv_hook":       (0.7, "A plastic IV bag hung onto the metal hook of an IV pole, small metallic clink."),
 "bed_creak":     (1.0, "A hospital bed mattress and metal frame creak as a patient moves."),
 "cloth_wall":    (1.3, "Clothes rubbing against a wall as a person slowly slides down to sit on the floor."),
 "steth_drop":    (0.8, "A stethoscope falls onto a linoleum floor, small rubber and metal bounce."),
 "door_open":     (1.5, "A door handle pressed down and a heavy office door opens at the end of a corridor."),
 "leather_chair": (1.0, "An office leather armchair creaks as someone leans back."),
 "pen_sign":      (1.2, "A ballpoint pen quickly signing a signature on paper on a desk."),
 "paper_slide":   (0.8, "A sheet of paper slid across a wooden desk."),
 "wind_window":   (6.0, "Wind blowing dry autumn leaves outside a closed window, muffled from inside a quiet room."),
 "cart":          (1.5, "A small cart with metal wheels rolls a short distance on a wooden floor and stops."),
 "brass_clink":   (0.6, "A tiny brass weight dropped into a brass scale pan, delicate clink."),
 "stone_set":     (0.8, "A flat stone slab set down onto a metal cart, solid knock."),
 "folder_drop":   (0.8, "A cardboard case file folder set down on a wooden bench."),
 "pencil_tick":   (0.5, "A pencil quickly ticks a checkbox on paper, one short stroke."),
 "drop":          (0.6, "One single drop of liquid falling into a small pool, clear and close."),
 "marker_x":      (0.7, "A thick felt marker draws one big X across paper, two quick strokes."),
}

def gen(name):
    f = os.path.join(OUT, name + ".mp3")
    if os.path.exists(f) and os.path.getsize(f) > 1000: return name, "déjà là"
    d, txt = S[name]
    body = json.dumps({"text": txt + REAL, "duration_seconds": max(0.5, d), "prompt_influence": 0.6})
    r = subprocess.run(["curl", "-sS", "-o", f, "-w", "%{http_code}", "-X", "POST", "https://api.elevenlabs.io/v1/sound-generation",
                        "-H", "xi-api-key: " + KEY, "-H", "Content-Type: application/json", "-d", body, "--max-time", "180"],
                       capture_output=True, text=True)
    return name, r.stdout.strip()

if __name__ == "__main__":
    with cf.ThreadPoolExecutor(4) as ex:   # 4 requêtes en parallèle au plus
        for name, st in ex.map(gen, S): print(f"{name:15} {st}")
