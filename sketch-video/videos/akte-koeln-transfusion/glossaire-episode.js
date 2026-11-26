/* AKTE 04 — termes allemands propres à l'épisode (s'ajoutent à serie/glossaire.js, qu'on ne modifie pas ici).
 * Clé = mot allemand tel qu'il apparaît dans beats.js ou sur une pastille ; valeur = traduction arabe courte (scenario.md,
 * « Mots allemands à l'écran », recopiée lettre pour lettre ; storyboard, annexe A). Les sous-titres l'appliquent aux mots DITS.
 * Déjà dans serie/glossaire.js avec la même traduction (donc absents ici) : fahrlässige Tötung, Amtsgericht, Assistenzärztin,
 *   Tagessätze, Hämolyse, laut Urteil, Rekonstruktion.
 * Ne PAS traduire les mots français de la voix (poche, garde, formation, groupe, labo, j'aime, abonne).
 * Gloses à relire par l'auteur (scenario.md). */
window.GLOSSARY = Object.assign(window.GLOSSARY || {}, {
  // mots DITS (sous-titres)
  "Köln": "كولونيا",
  "Blutführerschein": "« رخصة » ديال الدم",
  "Organisationsverschulden": "غلطة فالتنظيم",
  "genug bestraft": "اللي داز عليها كافي",
  "Bedside-Test": "اختبار الفصيلة حدا الفراش",
  // la série a « SCHULDIG » → « مُدان » (masculin, AKTE 01) : ici c'est une femme, et c'est le mot que la voix dit
  "schuldig": "مذنبة", "SCHULDIG": "مذنبة",
  // pastilles (écrites, non dites)
  "§ 60 StGB · Absehen von Strafe": "الإعفاء من العقوبة",
  "Amtsgericht Köln · 16.05.2012": "المحكمة الابتدائية ديال Köln",
  "63-Stunden-Woche": "سيمانة ديال 63 ساعة",
  "24-Stunden-Notdienst": "مداومة ديال 24 ساعة",
  "mehr als 12 Stunden": "كثر من 12 ساعة",
  "mehr oder weniger allein": "تقريبا بوحدها",
  "Berufsanfängerin": "عاد بدات",
  "Labor": "المختبر",
  "quasi identisch": "بحال بحال",
  "Begleitdokument": "الورقة اللي مع الكيس",
  "Blutgruppe": "فصيلة الدم",
  "Blutkonserven": "أكياس الدم",
  "nervlich zusammengebrochen": "انهيار عصبي",
  "Klinikverwaltung": "الإدارة ديال السبيطار",
  "unzutreffende Erklärung": "ورقة ماشي صحيحة",
  "über Monate … psychotherapeutische Behandlung": "شهور ديال العلاج",
  "Staatsanwaltschaft": "النيابة العامة",
  "90 Tagessätze · beantragt": "غرامة بالأيام · طلب، ماشي حكم",
  "Rechtskraft nicht veröffentlicht": "ما معروفش واش نهائي",
});
