#!/usr/bin/env python3
"""Feuille d'enregistrement de la saison : une page HTML avec, pour chaque épisode, le texte EXACT à dire
(scenario.md, section « TEXTE À ENREGISTRER »), la traduction française de chaque phrase (« Détail par beat »),
les silences, et les points à savoir avant d'enregistrer.

    python3 tools/scripts_page.py            -> serie/saison-2-scripts.html

Les phrases viennent des scenario.md : relancer après chaque changement de texte. Les notes (NOTES ci-dessous)
sont écrites à la main à partir des sections « Points pour l'auteur ».
"""
import html
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "serie" / "saison-2-scripts.html"

EPISODES = [
    dict(n="04", slug="akte-koeln-transfusion", lieu="Köln · 2011", duree="≈ 96 s",
         pitch="Une Assistenzärztin épuisée accroche la mauvaise poche de sang. Coupable, mais aucune peine : le tribunal met en cause l'organisation de l'hôpital.",
         source="Amtsgericht Köln, 16.05.2012, 613 Ls 3/12 — jugement lu en entier.",
         notes=[
             "On ne sait pas si le jugement est définitif : la phrase 25 doit rester.",
             "Phrase 21 : les 90 Tagessätze sont une demande du parquet, pas une peine. Si tu préfères ne citer aucune peine non prononcée, dis seulement « دابا نرجعو للمحكمة. »",
             "Ne dis ni « الغد ليه » ni « بزز » pour la feuille signée : le jugement dit seulement qu'elle a été convoquée et qu'on lui a fait signer.",
             "Phrase 2 : dure, mais c'est le verdict. Version plus douce : « مريض مات من بعد غلطة ديالها ».",
             "Phrase 12 : garde « وحسب الحكم » (on répète le jugement, on ne l'affirme pas nous-mêmes).",
         ],
         mots="Organisationsverschulden · Blutführerschein · Tagessätze · genug bestraft · Assistenzärztin · Köln",
         silences={"16": "Silence, environ 3 secondes : scène muette."}),
    dict(n="05", slug="akte-krefeld-nacht", lieu="Krefeld · 2008", duree="≈ 95 s",
         pitch="Deux Assistenzärzte seuls la nuit pour plus de 100 patients. Un patient diabétique meurt : elle est condamnée à 7 500 €, son collègue est acquitté.",
         source="Une seule source : une brève de l'Ärzte Zeitung du 01.10.2010. Aucun jugement publié.",
         notes=[
             "Une seule source, en partie au conditionnel : garde les trois « حسب الصحافة » (phrases 5, 13 et 16) et la phrase 20.",
             "Le titre a changé : « بوحدهم » (ils étaient deux cette nuit-là), et non « بوحدها ».",
             "Phrase 2 : 32 ans, c'est son âge au jugement (2010), pas la nuit des faits.",
             "Phrase 4, « كنديروه كاملين كل نهار » : c'est ta phrase de médecin, pas un fait du dossier. À garder seulement si tu l'assumes.",
             "Phrase 16 : le reproche est de ne pas avoir fait ASSEZ. Si tu changes les mots, ne dis pas « rien ».",
             "Phrases 6 à 14 au présent, sans s'arrêter.",
         ],
         mots="schweres Organisationsverschulden · Überlastungsanzeige · fahrlässige Tötung · Assistenzärzte · Intensivstation · Schnelltest · Freispruch · Krefeld",
         silences={"14": "Silence, environ 3 secondes : scène muette."}),
    dict(n="06", slug="akte-lehrte-mtx", lieu="Lehrte · 2013", duree="≈ 91 s",
         pitch="Un seul mot faux dans une lettre de sortie : Methotrexat chaque jour au lieu de chaque semaine. Quatre médecins l'écrivent, le signent ou le recopient sans le voir.",
         source="Presse seulement : Ärzte Zeitung et dépêche dpa (2016–2017). Aucun jugement.",
         notes=[
             "Personne n'a été condamné. Les amendes de 9 000 à 13 500 € ont été refusées ; le dossier a été classé contre 2 000 à 6 000 € versés à une association. La phrase 2 « وما قبلوهاش » rend l'accroche honnête : garde-la.",
             "Garde « حسب النيابة والصحافة » (phrase 17) et la phrase 25.",
             "Phrase 10 : ne dis ni « هو » ni « هي », les sources se contredisent sur ce médecin.",
             "Phrase 14, « سبع مرات la dose » : c'est un calcul. Ne dis ni « 21 comprimés » ni « trois semaines de traitement ».",
             "Si c'est trop long : la phrase 20 (vorbestraft) peut rester seulement à l'écran.",
         ],
         mots="Entlassungsbrief · Stationsärztin · Methotrexat · Strafbefehl · fahrlässige Tötung · vorbestraft · Einspruch · eingestellt · Lehrte",
         silences={"16": "Silence, environ 3 secondes : scène muette."}),
    dict(n="07", slug="akte-siegburg-whatsapp", lieu="Siegburg · 2026", duree="≈ 70 s",
         pitch="Une Stationsärztin écrit les diagnostics d'un collègue malade dans le groupe WhatsApp du service. Le tribunal du travail : 1 000 € de dommages.",
         source="Arbeitsgericht Siegburg, 22.05.2026, 1 Ca 1741/25 — jugement lu en entier.",
         notes=[
             "Phrase 10 : à dire avec tes mots, en gardant « غير ». Sens : « Autrement dit, juste un gaz coincé. » Proposition : « يعني: غير شي ريح حاصل ليه. »",
             "Le jugement n'était pas définitif en juillet 2026 et on n'a rien trouvé depuis : la phrase 17 doit rester.",
             "Phrases 6 et 7 : tu parles à sa place (« خديت… خلصت… »). C'est un résumé fidèle de son message. Version à la 3e personne : « خدات les gardes ديالو، وخلصات 549 أورو على ويكاند، ومشى فيها. »",
             "Ne nomme jamais les diagnostics, même en improvisant.",
             "N'ajoute rien sur les réactions des collègues ni sur le jour où il est sorti du groupe : rien n'est publié.",
         ],
         mots="Vielleicht sitzt aber ein Pups quer (« quer » se dit « kvér ») · Arbeitsgericht · Siegburg (« Zîg-bourg ») · krank",
         silences={"10": "Petit silence, environ 1 seconde."}),
    dict(n="08", slug="akte-duesseldorf-titel", lieu="Düsseldorf · 2019", duree="≈ 77 s",
         pitch="Un médecin au doctorat étranger écrit « Dr. » : 15 000 € d'amende en première instance. Et la règle pour le Doctorat en médecine du Maroc.",
         source="Amtsgericht Düsseldorf, 02.08.2019, 119 Cs 426/19 ; Landgericht Düsseldorf, 16.11.2021 ; BGH, 02.11.2022.",
         notes=[
             "Les 15 000 € viennent de la première instance et ne sont jamais devenus définitifs. Ne dis ni « خلص » ni « نهائي » à côté du chiffre.",
             "Le même médecin a été condamné plus tard, dans un autre procès, à de la prison pour des faits bien plus graves, sans rapport avec le titre. Le script le dit en une phrase neutre (15) et s'arrête là, pour qu'on ne croie pas qu'on va en prison pour un titre. N'ajoute rien en improvisant.",
             "Ton pseudo @dr.aguilo : dans cette affaire, le tribunal a compté des noms de compte Instagram commençant par « dr » comme port du titre. La question viendra en commentaire : à vérifier pour toi (Ärztekammer ou avocat) avant de publier cet épisode.",
             "Phrase 7 : l'outil n'a pas pu relire la fiche anabin du Maroc. Ouvre-la une fois (anabin.kmk.org → Hochschulabschlüsse → Marokko → Doctorat en Médecine). Si le mot « Berufsdoktorat » n'y est pas, dis : « والدبلوم ديالك، وخا فيه thèse، عندهم ماشي Promotion، يعني ماشي «Dr.». »",
             "Phrase 19 : c'est un conseil, pas une loi. Ne dis jamais que l'Ärztekammer « autorise ».",
             "« Promotion » se dit à l'allemande (« pro-mo-tsi-ôn ») : en français le mot veut dire autre chose.",
         ],
         mots="Promotion · Berufsdoktorat · Ärztekammer · Tagessätze · Dr. med. (ir) : les lettres i, r bien détachées · Düsseldorf",
         silences={}),
    dict(n="09", slug="akte-friedrichshafen-nacht", lieu="Friedrichshafen · 2023", duree="≈ 102 s",
         pitch="Un jeune de 18 ans, ivre après une chute à vélo, est gardé en observation sans scanner. La médecin de garde : 15 mois avec sursis.",
         source="Presse seulement, presque tout d'un seul journal (mai 2026). Amtsgericht Tettnang ; aucun jugement publié.",
         notes=[
             "Le jugement n'était pas définitif en mai 2026 et on n'a rien trouvé depuis. À publier après avoir vérifié, ou en gardant la phrase 27.",
             "Ne dis ni « مات » ni un délai : la presse donne deux versions. La phrase 19 s'arrête à « 8:40… » et la mort est montrée.",
             "Phrase 13 : l'heure où elle a demandé l'avis de l'anesthésiste n'est écrite nulle part. Dis « فديك الليلة », jamais une heure.",
             "Phrase 14 : « خليوه ينعس » est un propos rapporté à l'audience. Garde « حسب الصحافة » dans la même phrase.",
             "Ne dis ni « Assistenzärztin » ni « jeune » : la presse se contredit sur son statut.",
             "Ton plus posé que les autres épisodes. Les phrases « من الداخل » : un petit souffle avant, voix plus basse.",
             "Probablement 3 à 4 secondes de trop : trois coupes sont proposées à la fin de scenario.md.",
         ],
         mots="Anästhesist · Strafbefehl · auf Bewährung · Friedrichshafen · Tettnang · Bodensee",
         silences={"16": "Petite respiration, presque une seconde.", "19": "Silence, environ 3 secondes : scène muette."}),
]


def parse(slug):
    s = (ROOT / "videos" / slug / "scenario.md").read_text(encoding="utf-8")
    titre = re.search(r"^# AKTE \d+ — « (.+?) »", s, re.M).group(1)
    a, b = s.index("## TEXTE À ENREGISTRER"), s.index("## Détail par beat")
    lignes = [(m.group(1), m.group(2).strip()) for m in re.finditer(r"^(\d+)\.\s+(.*)$", s[a:b], re.M)]
    intro = [re.sub(r"^\(i\d\)\s*", "", m.group(1).strip()) for m in re.finditer(r"^- (.*[؀-ۿ].*)$", s[a:b], re.M)]
    fr = {}
    for line in s[b:s.index("## Phrases [FR]")].splitlines():
        if line.startswith("| b"):
            c = [x.strip() for x in line.split("|")]
            fr[re.match(r"b(\d+)", c[1]).group(1)] = c[3]
    assert len(lignes) == len(fr), (slug, len(lignes), len(fr))
    assert len(intro) == 3, (slug, intro)
    return titre, lignes, intro, fr


def e(x):
    return html.escape(x, quote=True)


def note(x):
    """Texte français d'une note : chaque passage entre « » qui contient de l'arabe est isolé (sens de lecture droite-gauche)."""
    out, depth, start = [], 0, 0
    for i, ch in enumerate(x):
        if ch == "«":
            if depth == 0:
                out.append(e(x[start:i + 1])); start = i + 1
            depth += 1
        elif ch == "»" and depth:
            depth -= 1
            if depth == 0:
                seg = x[start:i]
                out.append(f' <bdi dir="rtl" lang="ar" class="ar-in">{e(seg.strip())}</bdi> ' if re.search(r"[\u0600-\u06FF]", seg) else e(seg))
                start = i
    out.append(e(x[start:]))
    return "".join(out)


def section(ep):
    titre, lignes, intro, fr = parse(ep["slug"])
    out = [f'<section class="ep" data-id="akte-{ep["n"]}" data-ep="{ep["n"]}">',
           '<header class="ep-head">',
           f'<p class="ep-no">AKTE {ep["n"]}</p>',
           f'<h2 class="ep-title" dir="rtl" lang="ar">{e(titre)}</h2>',
           f'<p class="ep-meta">{e(ep["lieu"])} · {len(lignes)} phrases · {e(ep["duree"])} avec ta voix à ×1,3</p>',
           f'<p class="ep-pitch">{e(ep["pitch"])}</p>',
           f'<p class="ep-source"><span>Source</span> {e(ep["source"])}</p>',
           '</header>',
           '<div class="notes"><h3>À savoir avant d\'enregistrer</h3><ul>']
    out += [f"<li>{note(n)}</li>" for n in ep["notes"]]
    out += ["</ul>", f'<p class="mots"><span>Mots à bien prononcer</span> {e(ep["mots"])}</p>', "</div>",
            '<div class="sheet"><ol class="lines">']
    # l'intro vient après la dernière phrase de l'accroche : c'est la phrase qui précède celle où le numéro continue
    # (repérée dans le scénario par la position du bloc d'intro)
    s = (ROOT / "videos" / ep["slug"] / "scenario.md").read_text(encoding="utf-8")
    bloc = s[s.index("## TEXTE À ENREGISTRER"):s.index("## Détail par beat")]
    pos_intro = bloc.index(intro[0])
    avant = [n for n, t in lignes if bloc.index(f"\n{n}. ") < pos_intro]
    dernier_accroche = avant[-1]
    for n, t in lignes:
        txt = t.replace("[FR] ", "")
        est_fr = t.startswith("[FR]")
        out.append(f'<li class="line{" fr-line" if est_fr else ""}" data-k="{ep["n"]}-{n}">'
                   f'<button class="num" type="button" aria-pressed="false" aria-label="Phrase {n} enregistrée">{n}</button>'
                   f'<div class="txt">'
                   + (f'<p class="say" lang="fr">{e(txt)}</p><p class="tr">À dire en darija, avec tes mots (voir la note plus haut).</p>' if est_fr else
                      f'<p class="say" dir="rtl" lang="ar">{e(txt)}</p><p class="tr" lang="fr">{e(fr[n])}</p>')
                   + '</div></li>')
        if n == dernier_accroche:
            out.append('<li class="intro"><p class="tag">Intro — déjà enregistrée, à ne pas redire</p>'
                       + "".join(f'<p dir="rtl" lang="ar">{e(x)}</p>' for x in intro) + "</li>")
        if n in ep["silences"]:
            out.append(f'<li class="silence"><span>{e(ep["silences"][n])}</span></li>')
    out += ["</ol></div>", "</section>"]
    return "\n".join(out), titre


CSS = """
/* Mise en page : une feuille d'enregistrement par épisode. Onglets collants en haut ; sous l'en-tête de l'épisode,
   les points à savoir, puis la feuille : une phrase par ligne, l'arabe en grand, le français dessous. */
:root {
  --paper: #F7F7F1; --sheet: #FFFFFF; --ink: #1C1A1C; --soft: #57544C; --line: #CDCDC6; --shadow: #D2D2CB;
  --mark: #F8CE4E; --on-mark: #1C1A1C; --mute: #ECECE4; --done: #8A877E;
  --f-ui: "IBM Plex Sans", "Segoe UI", system-ui, sans-serif;
  --f-ar: "IBM Plex Sans Arabic", "Noto Sans Arabic", "Geeza Pro", Tahoma, sans-serif;
  --f-hand: "Kalam", "Comic Sans MS", cursive;
  --f-title: "Lalezar", "IBM Plex Sans Arabic", Tahoma, sans-serif;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --paper: #1A191B; --sheet: #242226; --ink: #F3F2EB; --soft: #BAB7AD; --line: #4A474E; --shadow: #0E0D0F;
  --mark: #F8CE4E; --on-mark: #1C1A1C; --mute: #2E2C31; --done: #7C7972; color-scheme: dark } }
:root[data-theme="dark"] {
  --paper: #1A191B; --sheet: #242226; --ink: #F3F2EB; --soft: #BAB7AD; --line: #4A474E; --shadow: #0E0D0F;
  --mark: #F8CE4E; --on-mark: #1C1A1C; --mute: #2E2C31; --done: #7C7972; color-scheme: dark }
body { background: var(--paper); color: var(--ink); font-family: var(--f-ui); font-size: 16px; line-height: 1.5; }
body::before { content: ""; position: fixed; inset: 0 0 auto; height: env(safe-area-inset-top, 0px); z-index: 10; background: var(--paper); }
.wrap { max-width: 46rem; margin: 0 auto; padding-block: 1.25rem 4rem;
  padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
.top { display: flex; flex-direction: column; gap: .35rem; margin-bottom: 1rem; }
.top h1 { font-family: var(--f-hand); font-size: 1.9rem; line-height: 1.15; margin: 0; text-wrap: balance; }
.top h1 span { box-shadow: inset 0 -0.42em 0 var(--mark); }
:root[data-theme="dark"] .top h1 span { box-shadow: inset 0 -0.16em 0 var(--mark); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .top h1 span { box-shadow: inset 0 -0.16em 0 var(--mark); } }
.top p { margin: 0; color: var(--soft); max-width: 62ch; }
nav.tabs { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 5; background: var(--paper); margin: 0 -4px 1.25rem;
  padding: .5rem 4px; overflow-x: auto; border-bottom: 2px solid var(--ink); }
nav.tabs ul { display: flex; gap: .5rem; list-style: none; margin: 0; padding: 0; width: max-content; }
nav.tabs a { display: flex; align-items: baseline; gap: .45rem; padding: .35rem .7rem; border: 2px solid var(--ink); border-radius: 999px;
  color: var(--ink); text-decoration: none; background: var(--sheet); white-space: nowrap; }
nav.tabs a b { font-family: var(--f-hand); font-size: 1.05rem; }
nav.tabs a span { font-family: var(--f-ar); font-weight: 600; font-size: .95rem; }
nav.tabs a[aria-current="true"] { background: var(--mark); color: var(--on-mark); }
nav.tabs a:focus-visible, .num:focus-visible, .opts button:focus-visible { outline: 3px solid var(--mark); outline-offset: 3px; }
.opts { display: flex; flex-wrap: wrap; gap: .5rem 1rem; align-items: center; margin-bottom: 1.5rem; color: var(--soft); font-size: .9rem; }
.opts button { font: inherit; color: var(--ink); background: none; border: 2px solid var(--line); border-radius: 8px; padding: .3rem .65rem; cursor: pointer; }
.opts button[aria-pressed="true"] { border-color: var(--ink); }
.ep { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 3.5rem; }
.ep-head { display: flex; flex-direction: column; gap: .3rem; }
.ep-no { font-family: var(--f-hand); font-size: 1.05rem; letter-spacing: .06em; margin: 0; color: var(--soft); }
.ep-title { font-family: var(--f-title); font-weight: 400; font-size: clamp(2.4rem, 11vw, 3.6rem); line-height: 1.25; margin: 0; text-align: right; }
.ep-meta { margin: 0; color: var(--soft); font-size: .9rem; font-variant-numeric: tabular-nums; }
.ep-pitch { margin: .35rem 0 0; font-size: 1.05rem; max-width: 60ch; }
.ep-source, .mots { margin: 0; color: var(--soft); font-size: .88rem; }
.ep-source span, .mots span { text-transform: uppercase; letter-spacing: .08em; font-size: .72rem; font-weight: 600; color: var(--ink); margin-right: .4rem; }
.notes h3, .sheet-h { font-size: .78rem; text-transform: uppercase; letter-spacing: .1em; font-weight: 600; margin: 0 0 .6rem; }
.notes ul { margin: 0 0 .9rem; padding: 0; list-style: none; display: flex; flex-direction: column; gap: .55rem; }
.notes li { padding-left: 1.15rem; position: relative; max-width: 66ch; }
.notes li::before { content: ""; position: absolute; left: 0; top: .55em; width: .5rem; height: .5rem; background: var(--mark); border: 1.5px solid var(--ink); }
.sheet { background: var(--sheet); border: 2.5px solid var(--ink); border-radius: 14px; box-shadow: 6px 8px 0 var(--shadow); padding: .4rem 0; }
.lines { list-style: none; margin: 0; padding: 0; }
.line { display: grid; grid-template-columns: 2.6rem minmax(0, 1fr); gap: .75rem; padding: .85rem 1rem; border-bottom: 1.5px dashed var(--line); align-items: start; }
.lines > li:last-child { border-bottom: 0; }
.num { font-family: var(--f-hand); font-size: 1.05rem; line-height: 1; width: 2.4rem; height: 2.4rem; border-radius: 50%; border: 2px solid var(--ink);
  background: var(--sheet); color: var(--ink); cursor: pointer; font-variant-numeric: tabular-nums; padding-top: .2rem; }
.num[aria-pressed="true"] { background: var(--mark); color: var(--on-mark); }
.txt { min-width: 0; }
.say { margin: 0; font-family: var(--f-ar); font-weight: 600; font-size: clamp(1.3rem, 5.2vw, 1.62rem); line-height: 1.75; }
.fr-line .say { font-family: var(--f-ui); font-style: italic; font-weight: 500; font-size: 1.2rem; line-height: 1.5; }
.tr { margin: .25rem 0 0; color: var(--soft); font-size: .93rem; max-width: 62ch; }
.line.done .say, .line.done .tr { color: var(--done); }
.no-tr .tr { display: none; }
.ar-in { font-family: var(--f-ar); font-weight: 600; color: var(--ink); }
.intro { background: var(--mute); padding: .8rem 1rem; border-bottom: 1.5px dashed var(--line); display: flex; flex-direction: column; gap: .2rem; }
.intro .tag { margin: 0 0 .2rem; font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; font-weight: 600; color: var(--soft); }
.intro p[dir] { margin: 0; font-family: var(--f-ar); font-weight: 500; font-size: 1.02rem; color: var(--soft); line-height: 1.7; }
.silence { padding: .7rem 1rem; border-bottom: 1.5px dashed var(--line); display: flex; justify-content: center; }
.silence span { font-family: var(--f-hand); font-size: 1rem; background: var(--mark); color: var(--on-mark); border: 2px solid var(--ink); border-radius: 8px; padding: .2rem .7rem .05rem; text-align: center; }
.foot { color: var(--soft); font-size: .9rem; border-top: 2px solid var(--ink); padding-top: 1rem; display: flex; flex-direction: column; gap: .5rem; }
.foot p { margin: 0; max-width: 66ch; }
@media (max-width: 420px) { .line { grid-template-columns: 2.3rem minmax(0, 1fr); gap: .55rem; padding: .8rem .7rem; } .num { width: 2.1rem; height: 2.1rem; font-size: .95rem; } }
"""

JS = """
(function () {
  var eps = [].slice.call(document.querySelectorAll('.ep')), tabs = [].slice.call(document.querySelectorAll('nav.tabs a'));
  var nav = document.querySelector('nav.tabs');
  function show() {
    var id = (location.hash || '').slice(1), ok = eps.some(function (s) { return s.getAttribute('data-id') === id; });
    if (!ok) id = eps[0].getAttribute('data-id');
    eps.forEach(function (s) { s.hidden = s.getAttribute('data-id') !== id; });
    tabs.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id; a.setAttribute('aria-current', on ? 'true' : 'false');
      if (on) nav.scrollLeft = Math.max(0, a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2);
    });
  }
  window.addEventListener('hashchange', function () { show(); window.scrollTo(0, 0); }); show();
  var store = {}; try { store = JSON.parse(localStorage.getItem('akte-s2-faites') || '{}') || {}; } catch (e) {}
  function save() { try { localStorage.setItem('akte-s2-faites', JSON.stringify(store)); } catch (e) {} }
  [].forEach.call(document.querySelectorAll('.line'), function (li) {
    var b = li.querySelector('.num'), k = li.getAttribute('data-k');
    function paint() { b.setAttribute('aria-pressed', store[k] ? 'true' : 'false'); li.classList.toggle('done', !!store[k]); }
    b.addEventListener('click', function () { if (store[k]) delete store[k]; else store[k] = 1; save(); paint(); }); paint();
  });
  var t = document.getElementById('opt-tr'), noTr = false; try { noTr = localStorage.getItem('akte-s2-sans-fr') === '1'; } catch (e) {}
  function paintTr() { document.body.classList.toggle('no-tr', noTr); t.setAttribute('aria-pressed', noTr ? 'false' : 'true'); }
  t.addEventListener('click', function () { noTr = !noTr; try { localStorage.setItem('akte-s2-sans-fr', noTr ? '1' : '0'); } catch (e) {} paintTr(); }); paintTr();
  document.getElementById('opt-raz').addEventListener('click', function () {
    var id = (eps.filter(function (s) { return !s.hidden; })[0] || eps[0]).getAttribute('data-ep');
    Object.keys(store).forEach(function (k) { if (k.indexOf(id + '-') === 0) delete store[k]; }); save();
    [].forEach.call(document.querySelectorAll('.line'), function (li) { var on = !!store[li.getAttribute('data-k')]; li.classList.toggle('done', on); li.querySelector('.num').setAttribute('aria-pressed', on ? 'true' : 'false'); });
  });
})();
"""


def main():
    secs, tabs = [], []
    for ep in EPISODES:
        sec, titre = section(ep)
        secs.append(sec)
        tabs.append(f'<li><a href="#akte-{ep["n"]}"><b>{ep["n"]}</b><span dir="rtl" lang="ar">{e(titre)}</span></a></li>')
    page = f"""<title>Scripts AKTE Saison 2</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,500&family=IBM+Plex+Sans+Arabic:wght@500;600;700&family=Kalam:wght@700&family=Lalezar&display=swap">
<style>{CSS}</style>
<div class="wrap">
<div class="top">
<h1><span>AKTE · saison 2</span> — les six textes à enregistrer</h1>
<p>Une phrase par ligne, dans l'ordre. Lis la phrase arabe ; le français dessous est seulement sa traduction. L'intro est déjà enregistrée : ne la redis pas. Touche le numéro quand une phrase est dans la boîte.</p>
</div>
<nav class="tabs" aria-label="Épisodes"><ul>
{chr(10).join(tabs)}
</ul></nav>
<div class="opts">
<button type="button" id="opt-tr" aria-pressed="true">Traduction française</button>
<button type="button" id="opt-raz">Décocher cet épisode</button>
</div>
{chr(10).join(secs)}
<div class="foot">
<p>Si tu changes un mot en enregistrant, ce n'est pas grave : dis-le-moi, les sous-titres suivront ta voix.</p>
<p>Les numéros d'épisode sont provisoires. Ordre de publication conseillé pour éloigner les histoires qui se ressemblent : 04, 07, 06, 08, 05, 09.</p>
</div>
</div>
<script>{JS}</script>
"""
    OUT.write_text(page, encoding="utf-8")
    print(f"OK -> {OUT} ({len(page) // 1024} Ko)")


if __name__ == "__main__":
    main()
