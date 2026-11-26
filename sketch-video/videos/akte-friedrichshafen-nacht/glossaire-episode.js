/* AKTE 09 — termes allemands propres à l'épisode (s'ajoutent à serie/glossaire.js, qu'on ne modifie pas ici).
 * Source : scenario.md, tableau « Mots allemands à l'écran » — chaînes arabes recopiées lettre pour lettre.
 * Clé = texte allemand de la pastille ; valeur = traduction arabe courte affichée dessous.
 *
 * IMPORTANT (storyboard, annexe A et risque R11) : la boîte des sous-titres doit rester sur UNE ligne.
 * Le moteur met une traduction sous chaque mot latin d'un sous-titre qui a une clé EXACTE ici. Les mots allemands
 * DITS par la voix (Bodensee, Friedrichshafen, Anästhesist, Tettnang, Strafbefehl, auf Bewährung) n'ont donc
 * AUCUNE clé exacte dans ce fichier : ils sont expliqués par la voix (« يعني … ») et par une pastille.
 *   – « Bodensee » → « بحيرة » et « Anästhesist » → « طبيب البنج » : volontairement absents (ne pas les ajouter) ;
 *   – « Strafbefehl » et « auf Bewährung » n'existent ici que dans le texte complet de leur pastille.
 * Contrôlé : aucun mot latin de beats.js ne correspond à une clé de ce fichier ni de serie/glossaire.js.
 *
 * Diffèrent de serie/glossaire.js pour cet épisode : Pflegekraft (« الفرملية », son mot), Intensivstation
 * (« الإنعاش », comme il le dit), Angeklagte (une femme), fahrlässige Tötung (écrit comme il le dit).
 * Déjà dans serie/glossaire.js, inchangés : Amtsgericht, Eltern, Rekonstruktion.
 * « à valider » = glose proposée dans le scénario, à relire par l'auteur. */
window.GLOSSARY = Object.assign(window.GLOSSARY || {}, {
  // accroche, statut du jugement
  "Strafbefehl · 41.250 €": "غرامة مكتوبة بلا جلسة",
  "Einspruch": "ما قبلاتش",
  "15 Monate auf Bewährung": "حبس موقوف التنفيذ",
  "Urteil 04.05.2026 · nicht rechtskräftig (Stand 05.05.2026)": "الحكم ما كانش نهائي",
  "nicht rechtskräftig": "الحكم ما كانش نهائي",
  "laut Presse": "حسب الصحافة",
  // la nuit
  "diensthabende Ärztin": "الطبيبة ديال la garde",
  "September 2023 · nach Mitternacht": "من بعد نص الليل",
  "nach Mitternacht": "من بعد نص الليل",
  "mehr als 1,9 Promille": "كثر من 1,9 ‰ فالدم",
  "Schädelbruch": "هرس فعظم الراس",
  "Notaufnahme": "المستعجلات",
  "„nur ein Prellpunkt\"": "غير علامة ديال ضربة",
  "Verdacht": "الشك",
  "Beobachtung": "المراقبة",
  "CT (Computertomographie)": "Scanner",
  "CT": "Scanner",
  "Blutung zwischen Schädelknochen und Hirnhaut": "الدم تحت عظم الراس",
  "Pflegekraft": "الفرملية ديال الليل",
  "„verstärkte Unruhe\"": "ولى agité كثر",
  "Uhrzeit: nicht berichtet": "الساعة ما معروفاش",
  "Intensivstation": "الإنعاش",
  "„ausschlafen lassen\"": "خليوه ينعس",
  "Pupillen: —": "الخانة خاوية",
  "„Wenn der Monitor … warnt, ist es zu spät.\"": "ملي كيصوني الـMonitor، كيكون فات الحال",   // à valider
  "Herzalarm": "alarme ديال Réanimation",
  "Beatmung": "التنفس الاصطناعي",
  "Hubschrauber alarmiert": "عيطو على hélicoptère",
  "OP · 8:40 Uhr": "البلوك",
  // le tribunal
  "Amtsgericht Tettnang": "المحكمة الابتدائية",
  "§ 411 Abs. 4 StPO": "من بعد Einspruch، المحكمة ماشي مربوطة بالغرامة",                       // à valider
  "Angeklagte": "المتهمة",
  "Eltern · Nebenkläger": "الوالدين",
  "Gutachter: „… die einzige Möglichkeit …\"": "غير Scanner كيفرق بين الشراب والضربة فالراس",
  "„Spätestens um 3 Uhr … zwingend\"": "مع 3 بالكثير: Scanner ضروري",
  "fahrlässige Tötung": "القتل غير العمد",
  "Schmerzensgeld · 20.000 €": "تعويض للوالدين",
  // la règle
  "Schädel-Hirn-Trauma (SHT)": "ضربة فالراس",
  "„in Zweifelsfällen\" → CT": "إلا شكيتي: Scanner",
  "engmaschige neurologische Überwachung": "مراقبة كل شوية",                                    // à valider
  "Bewusstsein · Pupillen · Motorik": "واش فايق · les pupilles · الحركة",
  "Bewusstsein": "واش فايق",
  "Pupillen": "les pupilles",
  "Motorik": "الحركة",
  "„mit Uhrzeit dokumentiert\"": "مكتوب مع الساعة",
  "AWMF-Leitlinie 008/001 (Stand 2015)": "القواعد الطبية",
  "„… nicht von ihrer Verantwortung enthoben\"": "ما حيدش عليها المسؤولية",
  "Verantwortung": "المسؤولية",
  // le dispositif
  "betrunken": "سكران",
  "Schema": "رسم توضيحي",                                                                       // à valider
});
