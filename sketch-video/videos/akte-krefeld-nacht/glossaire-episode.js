/* AKTE 05 (Krefeld) — termes allemands propres à l'épisode (s'ajoutent à serie/glossaire.js, qu'on ne modifie pas ici).
 * Clé = mot allemand tel qu'il apparaît dans beats.js ou sur une pastille (casse et ponctuation ignorées par le moteur) ;
 * valeur = traduction arabe courte, recopiée lettre pour lettre de scenario.md (« Mots allemands à l'écran ») et de
 * storyboard.md § 5.
 * NE PAS y mettre Krefeld, coma, normal, joignable, laboratoire, garde : l'auteur les dit tels quels (pas de glose).
 * Déjà dans le glossaire commun avec la même traduction (donc absents ici) : Oberarzt, Chefarzt.
 * Gloses « à valider » par l'auteur, volontairement ABSENTES (les scènes passent leur texte arabe à k.chip) :
 *   „nicht mehr zu erreichen“ · Hirn- und Lungenödem · „unverzüglich melden“.
 */
window.GLOSSARY = Object.assign(window.GLOSSARY || {}, {
  // ── mots DITS (sous-titres) : storyboard § 5
  "Assistenzärzte": "أطباء فطور الاختصاص",                 // le glossaire commun n'a que le singulier « طبيب مقيم »
  "Assistenzarzt": "طبيب فطور الاختصاص",                   // remplace « طبيب مقيم »
  "Assistenzärztin": "طبيبة فطور الاختصاص",                // remplace « طبيبة مقيمة »
  "Intensivstation": "الإنعاش",                            // le glossaire commun écrit « العناية المركزة »
  "Insulin": "الأنسولين",
  "Schnelltest": "التيست السريع",
  "schweres Organisationsverschulden": "غلط كبير فالتنظيم",
  "fahrlässige Tötung": "القتل غير العمد",                 // le glossaire commun écrit « العمدي »
  "Freispruch": "براءة",
  "Überlastungsanzeige": "ورقة للإدارة",
  // ── pastilles ÉCRITES seulement : scenario.md, « Mots allemands à l'écran »
  "Geldstrafe": "غرامة",
  "32 Jahre · Urteil 2010": "32 عام نهار الحكم",
  "Nachtdienst": "الخدمة ديال الليل",
  "über 100 Patienten": "كثر من 100 مريض",
  "Notfallambulanz": "المستعجلات",
  "Diabetiker": "فيه السكر",
  "Blutzucker „extrem erhöht“": "السكر طالع بزاف",
  "hyperglykämisches Koma": "كوما ديال السكر",
  "nur rund alle zwei Stunden": "غير كل جوج سوايع تقريبا",
  "nicht normalisiert": "ما رجعش normal",
  "ungenau": "ماشي دقيق",
  "Labor": "المختبر",
  "Laboranalyse": "المختبر",
  "Der Patient verstarb kurz darauf.": "مات شوية من بعد",
  "zwei Angeklagte": "جوج متهمين",
  "nicht ausreichend gehandelt": "ما دارتش اللي خاص",
  "Gutachter": "الخبير",
  "Rechtskraft unbekannt": "ما معروفش واش الحكم نهائي",
  "Regel von heute": "القواعد الطبية ديال اليوم",
  "mindestens stündlich": "كل ساعة على الأقل",
  "Hintergrunddienst": "الطبيب المسؤول",
});
