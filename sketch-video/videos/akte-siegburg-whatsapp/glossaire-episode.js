/* AKTE 07 — termes allemands propres à l'épisode (s'ajoutent à serie/glossaire.js, qu'on ne modifie pas ici).
 * Clé = texte allemand tel qu'il est ÉCRIT à l'écran (sans les « ») ; valeur = glose arabe courte posée sous la pastille.
 * Source : scenario.md, tableau « Mots allemands à l'écran » (gloses à relire par l'auteur), recopié lettre pour lettre.
 * Lecture dans une scène : Stage.gloss("Stationsärztin") → "طبيبة القسم".
 *
 * RÈGLE DE CET ÉPISODE (storyboard § 7, R13) : AUCUN mot DIT à voix haute n'a d'entrée ici. Le moteur pose la glose sous
 * chaque mot latin du sous-titre qu'il trouve dans le glossaire ; le sous-titre monterait alors sur le menton du
 * téléphone. Restent donc volontairement ABSENTS : « Arbeitsgericht », « Siegburg », « krank », « WhatsApp », « privé »,
 * et la phrase de b9 (« Vielleicht sitzt aber ein Pups quer. ») — la voix les explique elle-même
 * (« يعني محكمة الشغل », « يعني مريض », b10). Ne jamais ajouter une clé d'UN seul mot qui figure dans beats.js.
 * Déjà dans serie/glossaire.js avec la même glose (non répétés) : « laut Urteil », « Rekonstruktion », « Berufung ».
 */
window.GLOSSARY = Object.assign(window.GLOSSARY || {}, {
  // le tribunal, la somme, le statut
  "Arbeitsgericht Siegburg · 22.05.2026": "محكمة الشغل ديال Siegburg",
  "Schadensersatz · 1.000,00 EUR": "تعويض",
  "Schadensersatz": "تعويض",
  "verurteilt, … zu zahlen": "المحكمة حكمات: تخلص",
  "Stand Juli 2026: nicht rechtskräftig": "يوليوز 2026: مازال ماشي نهائي",   // mention du menton (storyboard) : forme courte « مازال ماشي نهائي »
  "erste Instanz": "حكم ابتدائي",
  "Berufung möglich · LAG Köln": "الاستئناف ممكن",
  "78 % der Kosten": "78% ديال مصاريف المحكمة",
  "ab sofort zu unterlassen": "ممنوع تعاودها",
  // les personnes
  "Stationsärztin": "طبيبة القسم",
  "Arzt in Weiterbildung": "طبيب فطور الاختصاص",
  "eine Kollegin aus der Notaufnahme": "زميلة من المستعجلات",
  // le groupe
  "Ärzte-AC": "گروپ أطباء الجراحة",
  "9 Mitglieder": "9 ديال الأعضاء",
  "Dienst": "la garde",
  "Urlaub": "الكونجي",
  "Geburtstagsgeschenk": "كادو ديال عيد الميلاد",
  "… hat die Gruppe verlassen": "خرج من الگروپ",
  // jeudi : l'arrêt de travail
  "Notaufnahme": "المستعجلات",
  "Arbeitsunfähigkeitsbescheinigung · bis 02.06.2025": "شهادة طبية حتى 02.06",
  "Vertretung": "شكون ياخد بلاصتو",
  // samedi : son message à elle (extraits du jugement)
  "Nur zu Jedermanns Info …": "غير باش كلشي يعرف",
  "… seinen Dienst am Freitag übernommen": "خديت la garde ديال الجمعة وديال الأحد",
  "Auch diesen Dienst am Sonntag Tag habe ich übernommen": "خديت la garde ديال الجمعة وديال الأحد",
  "zum wiederholten Male": "ماشي أول مرة",
  "Wochenendausflug für 549 €": "خرجة ديال الويكاند: 549 أورو",
  "… mein WE eh im Arsch war …": "الويكاند ديالي مشى فيها",
  "Diagnosen": "التشخيصات",
  "Laborwerte": "التحاليل",
  "Diagnosen · Laborwerte": "التشخيصات · التحاليل",
  "… um den Kläger in der Abteilung bloßzustellen": "باش تحشمو قدام السرفيس",
  "an jedenfalls sieben Mitglieder … übermittelt": "وصل لـ7 ديال الزملاء",
  // l'été, la plainte, le départ
  "Unterlassungserklärung · 25.07.2025": "التزام مكتوب: ما نعاودش",
  "erfolglos": "بلا نتيجة",
  "Klage · 10.09.2025": "دعوى",
  "gefordert: 2.000 €": "طلب 2000 أورو",
  "mitursächlich": "واحد من الأسباب",
  // l'audience
  "zu 70% privat und lediglich zu 30 % dienstbezogen": "70% privé · 30% خدمة",
  "uneinsichtig": "ما اعترفات بوالو",
  "zu mindestens 30% arbeitsbezogene Inhalte": "30% خدمة",
  "nicht ausschließlich persönlichen Zwecken": "ماشي privé 100%",
  // la règle
  "krank bis Montag": "مريض حتى للإثنين",
  "Gesundheitsdaten": "المعطيات الصحية",
  "Gesundheitsdaten eines Kollegen": "المعطيات الصحية ديال زميل",
  "ohne seine Einwilligung": "بلا الإذن ديالو",
  "DSGVO Art. 9": "قانون حماية المعطيات",
  "im Urteil zitiert · Rn. 8": "مكتوب فالحكم",
  // mentions de source
  "laut Gericht": "حسب المحكمة",
  "laut ihrer Nachricht": "حسب الميساج ديالها",
});
