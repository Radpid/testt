# AKTE 01 — script à lire (enregistrement de l'auteur)

Principe : tu parles comme à un collègue, avec TES mots. Les phrases en darija ci-dessous ne sont qu'une base :
change-les librement. Ce qui doit rester exact : les **chiffres**, les **mots allemands en gras**, l'ordre des scènes.
Durée totale visée : 75–90 s.

## Comment enregistrer

- Téléphone (dictaphone), pièce calme avec des tissus (rideaux, armoire ouverte), micro à 15–20 cm, sans écouteurs-micro.
- Un seul fichier, scène par scène, **2 secondes de silence entre deux scènes**.
- Si tu te trompes : 2 s de silence et tu redis la phrase entière (on coupe après).
- Les deux phrases allemandes (infirmière, juge) : dis-les aussi ; on décidera ensuite si on garde ta voix ou une autre.

## Les scènes

| # | durée max | Idée à faire passer | À dire exactement |
|---|---|---|---|
| 1 | 7 s | Une seringue sans étiquette, blanche comme du lait, a tué un bébé ; l'étudiant qui l'a injectée a été condamné. | **Spritze**, **fahrlässige Tötung** |
| 2 | 4 s | Histoire vraie ; quatre mots allemands auraient suffi (réponse à la fin). | « quatre mots » |
| 3 | 10 s | Bielefeld, 2011. Bébé de 10 mois, leucémie, chimio. Un étudiant en PJ, sur la station depuis une semaine. | **2011**, **10 mois**, **PJ**, **une semaine** |
| 4 | 6 s | L'infirmière lui demande seulement le sang ; lui comprend qu'il doit aussi donner la Refobacin. | **Spiegel**, **Refobacin** |
| 5 | 9 s | Il a le dos tourné ; elle pose une seringue de sirop à côté du bébé et dit à la mère : | **Hier ist das orale Antibiotikum.** |
| 6 | 8 s | Il revient, la voit, pense que c'est la Refobacin. STOP : toi, à sa place, tu fais quoi ? | **Refobacin**, « STOP » |
| 7 | 11 s | Il l'injecte dans le cathéter. Un sirop pour la bouche, dans le sang. Quelques minutes après, le bébé devient bleu. 3 h 30 de réanimation, il décède. | **Katheter**, **3 h 30**, **Reanimation** |
| 8 | 4 s | Le lendemain, l'hôpital change toutes les seringues pour les médicaments oraux. | « le lendemain » |
| 9 | 14 s | 2012 : condamné pour fahrlässige Tötung. En appel, le juge dit que l'hôpital a aussi une part de responsabilité, mais : … Les parents quittent la salle, ils voulaient la prison. | **2012**, **Berufung**, **Da hätte der Angeklagte zumindest nachfragen müssen.** |
| 10 | 11 s | L'Approbation, il l'a eue, mais la condamnation reste inscrite. Les quatre mots : … Pas préparée par toi, pas étiquetée : tu n'injectes pas, tu demandes. | **Approbation**, **Was ist da drin?** |
| 11 | 6 s | Et toi, tu as déjà donné un médicament que tu n'as pas préparé ? Écris-le en commentaire. Akte 02 arrive. | **comments**, **Akte 02** |

## Base en darija (à modifier librement)

1. شوف هاد الـSpritze. ما مكتوب عليها والو، و فيها واحد الحاجة بيضا بحال الحليب. هاد الـSpritze قتلات بيبي… و الطالب لي دارها، تحكم عليه بـfahrlässige Tötung.
2. القصة حقيقية. و غادي تشوف بلي كان كافي يقول غير أربع كلمات.
3. Bielefeld، ألفين و حداش. بيبي عندو عشرة د الشهور، مسكين عندو Leukämie و كيدير الكيميو. و واحد الطالب ف الـPJ، عاد سيمانة و هو ف هاد السيرفيس.
4. الفرملية قالت ليه ياخد الدم ديال الـSpiegel. و هو فهم بلي خاصو حتى يعطيه الـRefobacin.
5. و هو مدير ظهرو، دخلات الفرملية، حطات واحد الـSpritze حدا البيبي، و قالت للأم: Hier ist das orale Antibiotikum.
6. رجع، شافها، و قال ف خاطرو: هادي هي الـRefobacin. — STOP. لو كنتي نتا ف بلاصتو، شنو كنتي غادي دير؟
7. دفعها ف الـKatheter. و داك الـsirop راه ديال الفم، ماشي ديال العرق. من بعد شي دقايق، البيبي ولى زرق. تلت سوايع و نص و هوما كيديرو ليه الـReanimation… و ما بقاش.
8. و النهار لي من موراه، السبيطار بدل الـSpritzen ديال الفم كاملين.
9. ف ألفين و طناش، تحكم عليه بـfahrlässige Tötung. ف الـBerufung، القاضي قال حتى السبيطار عندو نصيب ف الغلط… ولكن زاد قال: Da hätte der Angeklagte zumindest nachfragen müssen. الواليدين ناضو خرجو من القاعة… كانو باغيينو يدخل للحبس.
10. و الـApprobation؟ خداها عادي. ولكن الحكم بقى مسجل عليه. و الأربع كلمات لي كانو غادي يبدلو كلشي: Was ist da drin? Spritze ما عمرتيهاش بيدك، و ما مكتوب عليها والو؟ ما تدخلهاش. سول.
11. و نتا، واش عمرك عطيتي شي دوا ما عمرتيهش بيدك؟ كتب ليا ف الـcomments. و تسنا Akte 02.

## Après l'enregistrement

1. Transcription de ton audio → tu corriges le texte → il devient `beats.js` (les sous-titres = tes mots exacts).
2. Voix finale, au choix après écoute :
   - **ta voix réelle**, nettoyée et mise à -14 LUFS (`tools/align.py`) ;
   - **ta voix passée dans ElevenLabs Speech-to-Speech** avec ton clone : même intonation, mêmes mots, son studio.
3. Minutage mot par mot (alignement forcé), puis animation calée sur ta voix.
4. Une phrase ratée : tu réenregistres seulement elle, ou on la génère avec tes mots exacts.
