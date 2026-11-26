/* AKTE 06 — termes allemands propres à l'épisode (s'ajoutent à serie/glossaire.js, qu'on ne modifie pas ici).
 * Clé = mot allemand tel qu'il apparaît dans beats.js ou sur une pastille ; valeur = traduction arabe courte.
 * Source : scenario.md, tableau « Mots allemands à l'écran » — recopié lettre pour lettre. Les lignes marquées
 * « à valider » sont des gloses dont la darija n'est pas certaine : à montrer à l'auteur avant le rendu.
 * Les sous-titres (engine/runtime.js) posent la traduction sous chaque mot allemand DIT (première partie de la liste).
 */
window.GLOSSARY = Object.assign(window.GLOSSARY || {}, {
  // ── mots DITS dans la voix (sous-titres)
  "Entlassungsbrief": "ورقة الخروج",
  "Stationsärztin": "طبيبة الـservice",
  "Methotrexat": "دوا",
  "Oberarzt": "الطبيب اللي فوقها",                 // remplace la traduction de la série (« الطبيب المسؤول ») : ici il est dit « الطبيب اللي فوقها » (b13)
  "Strafbefehl": "عقوبة مكتوبة بلا جلسة",
  "fahrlässige Tötung": "القتل غير العمد",          // remplace « القتل غير العمدي » de la série : texte dit en b19
  "vorbestraft": "عندو سوابق",
  "Einspruch": "ما قبلوش",
  "eingestellt": "تسد بلا حكم",                     // pas de ligne propre dans le tableau : ce sont les mots de l'auteur en b23 (« eingestellt، يعني تسد بلا حكم »)
  "einmal pro Woche": "مرة فالسيمانة",              // b27 ; tableau : « 1 × pro Woche » = « مرة فالسيمانة »

  // ── pastilles et textes à l'écran (tableau du scénario, dans l'ordre des beats)
  "Strafbefehl · Juli 2016 · Einspruch": "عقوبة مكتوبة، وما قبلوهاش",
  "9 000 – 13 500 € pro Arzt": "من 9000 حتى 13500 أورو لكل طبيب",
  "täglich": "كل نهار",
  "wöchentlich": "كل سيمانة",
  "Verlegung · Ende Oktober 2013": "تحويل لسبيطار آخر",
  "Methotrexat (MTX)": "دوا",
  "15 mg · 1 × wöchentlich": "15 ميليغرام، مرة فالسيمانة",
  "gegengezeichnet": "سنية ثانية",
  "andere Klinik · Region Hannover": "سبيطار آخر",
  "aufnehmende Ärztin": "الطبيبة ديال l'admission",
  "Medikation übernommen": "تبعو الورقة",
  "7 × Wochendosis": "سبع مرات la dose",
  "Knochenmark": "المعمل ديال الدم",
  "allgemein · laut Fachinformation": "بصفة عامة",                                   // à valider
  "3 Wochen": "تلت سيمانات",
  "Drei Wochen später starb der Patient.": "المريض ما عاشش · 79 عام",
  "laut Staatsanwaltschaft · laut Presse": "حسب النيابة والصحافة",
  "Amtsgericht Lehrte": "المحكمة ديال Lehrte",
  "über 90 Tagessätze": "كثر من 90 نهار ديال الغرامة",                               // à valider
  "Damit wären die Beschuldigten vorbestraft.": "بهادشي كانو غادي يوليو بالسوابق",
  "Hauptverhandlung · 24.01.2017": "الجلسة",
  "jeder der vier Ärzte habe Verantwortung zu tragen": "كل واحد من الربعة مسؤول",
  "keine extrem seltene Angelegenheit": "ماشي حاجة نادرة بزاف",
  "gegen Geldauflagen eingestellt": "تسد بشرط الخلاص",                               // à valider
  "keine Verurteilung": "حتى واحد ما تحكم عليه",
  "2 000 – 6 000 € · gemeinnützige Einrichtung": "من 2000 حتى 6000 أورو لجمعية",
  "ob endgültig: nicht veröffentlicht": "ما معروفش واش نهائي",
  "bei Autoimmunerkrankungen: nur einmal wöchentlich": "فالروماتيزم: مرة فالسيمانة",
  "1 × pro Woche · montags": "مرة فالسيمانة · نهار الاثنين",
  "1-0-0-0": "ماشي هاكا",
  "Schnittstellen: Aufnahme · Verlegung · Entlassung": "الدخول، التحويل، الخروج",
});
