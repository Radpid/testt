/* AKTE 08 — termes allemands propres à l'épisode (s'ajoutent à serie/glossaire.js, qu'on ne modifie pas ici).
 * Clé = mot allemand tel qu'il apparaît dans beats.js ou à l'écran ; valeur = traduction arabe courte affichée dessous.
 * Source de CHAQUE glose : scenario.md, tableau « Mots allemands à l'écran » (et, pour « Dr. med. » et « Düsseldorf »,
 * le tableau « Détail par beat », b9 et b2). Rien n'est inventé ici ; les gloses sont à relire par l'auteur.
 * Déjà dans le glossaire commun avec la même glose (donc absents ici) : Amtsgericht, Tagessätze, Berufung,
 * rechtskräftig, Approbation, laut Urteil, Rekonstruktion.
 */
window.GLOSSARY = Object.assign(window.GLOSSARY || {}, {
  // ── mots DITS (les sous-titres karaoké affichent la glose sous le mot)
  "Dr.": "دكتور",
  "Dr. med.": "دكتور فالطب",
  "Dr. med. (ir)": "(ir) = إيران",
  "Düsseldorf": "دوسلدورف",
  "Promotion": "دكتوراه ديال البحث",
  "Berufsdoktorat": "دكتوراه ديال المهنة",
  "Ärztekammer": "هيئة الأطباء",

  // ── glose DIFFÉRENTE du glossaire commun pour cet épisode
  // (commun : « محكمة الاستئناف » — faux ici : le Landgericht a jugé l'ensemble, pas seulement un appel)
  "Landgericht": "محكمة أعلى",
  "Landgericht Düsseldorf": "محكمة أعلى",

  // ── accroche (b1–b3)
  "Geldstrafe": "غرامة",
  "Amtsgericht Düsseldorf": "المحكمة الابتدائية",
  "1. Instanz": "الحكم الأول",
  "Missbrauch von Titeln": "استعمال لقب بلا حق",
  "Facharzt für Innere Medizin": "اختصاصي فالطب الباطني",

  // ── « toi » et l'explication (b4–b7)
  "Beispiel": "مثال",
  "Dissertation": "thèse ديال البحث",
  "anabin (KMK)": "القاعدة الرسمية ديال الدبلومات",
  "Ärztliche Prüfung": "الامتحان ديال الطب",

  // ── l'affaire (b9–b16)
  "Namensschild": "badge",
  "Ärztekammer Nordrhein": "هيئة الأطباء",
  "Preisliste": "لائحة الأثمنة",
  "Impressum": "معلومات مول الموقع",
  "angezeigt": "دارت بيه شكاية",
  "laut Presse": "حسب الصحافة",
  "Strafbefehl": "عقوبة مكتوبة بلا جلسة",
  "Einspruch": "ما قبلش",
  "nicht rechtskräftig": "ماشي نهائي",
  "BGH": "أعلى محكمة فألمانيا",
  "schuldig": "مذنب",

  // ── la règle (b17–b21)
  "Freiheitsstrafe bis zu einem Jahr oder Geldstrafe": "حبس حتى لعام ولا غرامة",
  "Gesetz": "القانون",
  "Landesrecht": "كل Land وقانونو",
  "Rechtsanwalt": "محامي",
  "schriftlich": "بالكتابة",
  "Keine Rechtsberatung — frag deine Ärztekammer": "ماشي استشارة قانونية — سول الهيئة ديالك",
  "Ärztin / Arzt": "طبيبة / طبيب",
});
