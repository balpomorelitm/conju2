const specificInfoData = {
  infiniteMode: {
    title: "♾️ Infinite Mode",
    html: `<p>Play without time or life limits. Ideal for practicing at your own pace.</p>
           <p><strong class="modal-subtitle">Goal:</strong> Achieve the highest score and longest streak possible!</p>
           <p><strong class="modal-subtitle">Bonuses:</strong> Awarded for speed and accuracy.</p>`
  },
  timerMode: {
    title: "⏱️ Timer Mode (4 Minutes)",
    html: `You have <strong>4 minutes</strong> to score as many points as possible.<br>
           <strong class="modal-subtitle">Time Mechanics:</strong><br>
           - Start with 4:00 minutes.<br>
           - Correct answers ✅ add time based on your streak (<span class="emphasis-mechanic">+5s to +10s</span>). Max time is 4:00.<br>
           - Incorrect/Skipped answers ❌ deduct <span class="emphasis-mechanic">3 seconds</span>.<br><br>
           <strong class="modal-subtitle">Time UI:</strong><br>
           - ⏳ Remaining Time: Main clock (turns <span class="text-red">red</span> and pulses in the last 10s).<br>
           - ➕➖ Time Change: Brief notes like "<span class="text-green">+5s</span>" or "<span class="text-red">-3s</span>".<br>
           - 🏁 Total Time Played: Shows your current session duration.<br><br>
           <strong class="modal-subtitle">Scoring Bonuses (per question):</strong><br>
           - Streak Bonus: Multiplies points for consecutive correct answers.<br>
           - Speed Bonus: Answering in under 5 seconds gives an additional score multiplier (up to <span class="points-value">x2.0</span>).<br><br>
           <strong class="modal-subtitle">Goal:</strong> Maximize your score before time runs out!`
  },
  livesMode: {
    title: "💖 Lives Mode",
    html: `Survive as long as you can! You start with <strong>5 lives</strong> (❤️).<br>
           Each incorrect or skipped answer costs one life.<br><br>
           <strong class="modal-subtitle">Gaining Extra Lives:</strong><br>
           1. <strong>Accumulated Correct Answers:</strong> Earn a life by getting a specific total number of correct answers (e.g., <code>🎯 X to get 1❤️</code>). The target increases each time.<br>
           2. <strong>Streaks:</strong> Achieve specific streaks of consecutive correct answers (e.g., <code>🔥 Y in a row for 1❤️</code>). This target also increases.<br>
           3. <strong class="emphasis-mechanic">🎁 Prize Verbs:</strong>
              - Appear randomly in "<span class="difficulty-normal">Conjugate</span>" (⚙️) and "<span class="difficulty-hard">Produce</span>" (⌨️) difficulties if the verb is irregular or reflexive.<br>
              - Chance: Approx. <span class="emphasis-mechanic">1 in 30</span> for "Conjugate", approx. <span class="emphasis-mechanic">1 in 20</span> for "Produce".<br>
              - Correctly conjugating a prize verb (marked with 🎁) grants an <span class="emphasis-mechanic">extra life!</span><br>
           <br><strong class="modal-subtitle">Goal:</strong> Stay alive and get the highest score!`
  },
  receptiveConfig: {
    title: "💭 Recall Mode",
    html: `<strong>Difficulty:</strong> <span class="difficulty-easy">Easy to Medium</span><br>
           You'll see a conjugated Spanish verb and its tense. Your task is to provide the correct <strong>English subject pronoun AND the conjugated English verb</strong>.<br><br>
           <strong class="modal-subtitle">Quick Tense Translation Guide (Spanish to English):</strong><br>
             <li><strong>Present (Presente):</strong> Usually like "<span class="tense-example">I eat</span>", "<span class="tense-example">he eats</span>".</li>
             <li><strong>Simple Past (Pretérito):</strong> Usually "<span class="tense-example">I ate</span>", "<span class="tense-example">he ate</span>".</li>
             <li><strong>Present Perfect (Pret. Perfecto):</strong> "<span class="tense-example">I have eaten</span>", "<span class="tense-example">he has eaten</span>".</li>
             <li><strong>Imperfect (Imperfecto):</strong> Often "<span class="tense-example">I was eating</span>" (ongoing past) or "<span class="tense-example">I used to eat</span>" (habitual past). Context is key!</li>
             <li><strong>Future (Futuro):</strong> "<span class="tense-example">I will eat</span>", "<span class="tense-example">he will eat</span>".</li>
             <li><strong>Conditional (Condicional):</strong> "<span class="tense-example">I would eat</span>", "<span class="tense-example">he would eat</span>".</li>
           </ul>
           <em>Example:</em> <span class="example-prompt-text">SIMPLE PAST: comí</span> You type:
           <div class="typing-animation-container"><div class="typing-animation" id="recall-example-anim"></div></div>
           <strong>Base Points:</strong> <span class="points-value">+5</span> per correct answer.<br>
           While this is the easiest mode, translation can be tricky! Some Spanish verbs don't have a single, direct English equivalent, and tenses can translate in multiple ways.`
  },
  productiveEasyConfig: {
    title: "⚙️ Conjugate Mode",
    html: `<strong>Difficulty:</strong> <span class="difficulty-normal">Normal</span><br>
           This mode is a direct test of your Spanish conjugation skills. You'll be given a Spanish verb infinitive, a Spanish pronoun, and the tense.<br><br>
           Your mission is to type the correctly conjugated Spanish verb form. Focus on standard conjugation rules and irregularities.<br>
           <em>Example:</em> <span class="example-prompt-text">Presente: conjugar – nosotros</span> You type:
           <div class="typing-animation-container"><div class="typing-animation" id="conjugate-example-anim"></div></div>
           <strong>Base Points:</strong> <span class="points-value">+10</span> per correct answer.<br>
           <strong class="emphasis-mechanic">💖 Lives Mode Bonus:</strong> When playing in "Lives Mode", irregular or reflexive verbs in "Conjugate" have a <span class="emphasis-mechanic">~1 in 30</span> chance of being a 🎁 Prize Verb for an extra life!`
  },
  productiveConfig: {
    title: "⌨️ Produce Mode",
    html: `<strong>Difficulty:</strong> <span class="difficulty-hard">Hard</span><br>
           The most challenging mode! You'll get an English verb infinitive, a Spanish pronoun, and the tense.<br><br>
           You need to:<br>
             <li>Know the correct Spanish infinitive for the English verb.</li>
             <li>Correctly conjugate that Spanish verb according to the pronoun and tense, including irregularities.</li>
           </ol>
           This truly tests your ability to think in Spanish.<br>
           <em>Example:</em> <span class="example-prompt-text">Present: to love – yo</span> You type:
           <div class="typing-animation-container"><div class="typing-animation" id="produce-example-anim"></div></div>
           <strong>Base Points:</strong> <span class="points-value">+15</span> per correct answer.<br>
          <strong class="emphasis-mechanic">💖 Lives Mode Bonus:</strong> When playing in "Lives Mode", irregular or reflexive verbs in "Produce" have a <span class="emphasis-mechanic">~1 in 20</span> chance of being a 🎁 Prize Verb for an extra life!`
  },
  accentHelp: {
    title: "Ignore Accents",
    html: `When this option is <strong>ON</strong>, you don't need to type accent marks to be correct.<br>
           Leaving it <strong>OFF</strong> grants a <span class="points-value">+8</span> bonus each time you include the correct accents.`
  },
  presentInfo: {
    title: "Present Tense (Presente de Indicativo)",
    html: `<p>Use the present tense for habitual actions, universal truths, current events and the near future.</p>
           <table class="tense-tooltip-table">
             <tr><th>Pronoun</th><th>-ar</th><th>-er</th><th>-ir</th></tr>
             <tr><td>yo</td><td>-o</td><td>-o</td><td>-o</td></tr>
             <tr><td>tú</td><td>-as</td><td>-es</td><td>-es</td></tr>
             <tr><td>él/ella/ud.</td><td>-a</td><td>-e</td><td>-e</td></tr>
             <tr><td>nosotros</td><td>-amos</td><td>-emos</td><td>-imos</td></tr>
             <tr><td>vosotros</td><td>-áis</td><td>-éis</td><td>-ís</td></tr>
             <tr><td>ellos/ellas/uds.</td><td>-an</td><td>-en</td><td>-en</td></tr>
           </table>
           <p><strong>Common Irregular Verbs:</strong> ser, estar, ir, and "yo-go" verbs like tener (<em>tengo</em>) or hacer (<em>hago</em>).</p>
           <p><strong>Common Stem Changes:</strong> querer → quiero, poder → puedo, pedir → pido, jugar → juego.</p>`
  },
  pastSimpleInfo: {
    title: "Simple Past / Preterite (Pretérito)",
    html: `<p>This tense expresses actions completed at a specific point in the past.</p>
           <table class="tense-tooltip-table">
             <tr><th>Pronoun</th><th>-ar</th><th>-er/-ir</th></tr>
             <tr><td>yo</td><td>-é</td><td>-í</td></tr>
             <tr><td>tú</td><td>-aste</td><td>-iste</td></tr>
             <tr><td>él/ella/ud.</td><td>-ó</td><td>-ió</td></tr>
             <tr><td>nosotros</td><td>-amos</td><td>-imos</td></tr>
             <tr><td>vosotros</td><td>-asteis</td><td>-isteis</td></tr>
             <tr><td>ellos/ellas/uds.</td><td>-aron</td><td>-ieron</td></tr>
           </table>
           <p><strong>Common Irregular Roots:</strong> estar → estuv-, tener → tuv-, poder → pud-, etc.</p>
           <p><strong>Stem & Spelling Changes:</strong> sentir → sintió, buscar → busqué, leer → leyó.</p>`
  },
  presentPerfectInfo: {
    title: "Present Perfect (Pretérito Perfecto)",
    html: `<p>This tense links past actions to the present. It uses <em>haber</em> + past participle.</p>
           <table class="tense-tooltip-table">
             <tr><th>Pronoun</th><th>Haber</th></tr>
             <tr><td>yo</td><td>he</td></tr>
             <tr><td>tú</td><td>has</td></tr>
             <tr><td>él/ella/ud.</td><td>ha</td></tr>
             <tr><td>nosotros</td><td>hemos</td></tr>
             <tr><td>vosotros</td><td>habéis</td></tr>
             <tr><td>ellos/ellas/uds.</td><td>han</td></tr>
           </table>
           <p><strong>Regular Participles:</strong> hablar → hablado, comer → comido.</p>
           <p><strong>Irregular Participles:</strong> abrir → abierto, decir → dicho, ver → visto, volver → vuelto.</p>`
  },
  imperfectInfo: {
    title: "Imperfect (Pretérito Imperfecto)",
    html: `<p>Describes ongoing or repeated past actions and sets the scene.</p>
           <table class="tense-tooltip-table">
             <tr><th>Pronoun</th><th>-ar</th><th>-er/-ir</th></tr>
             <tr><td>yo</td><td>-aba</td><td>-ía</td></tr>
             <tr><td>tú</td><td>-abas</td><td>-ías</td></tr>
             <tr><td>él/ella/ud.</td><td>-aba</td><td>-ía</td></tr>
             <tr><td>nosotros</td><td>-ábamos</td><td>-íamos</td></tr>
             <tr><td>vosotros</td><td>-abais</td><td>-íais</td></tr>
             <tr><td>ellos/ellas/uds.</td><td>-aban</td><td>-ían</td></tr>
           </table>
           <p><strong>Irregular Verbs:</strong> Only ir, ser and ver.</p>`
  },
  futureInfo: {
    title: "Future (Futuro Simple)",
    html: `<p>Used to talk about what <em>will</em> happen or to express probability.</p>
           <table class="tense-tooltip-table">
             <tr><th>Pronoun</th><th>Ending</th></tr>
             <tr><td>yo</td><td>-é</td></tr>
             <tr><td>tú</td><td>-ás</td></tr>
             <tr><td>él/ella/ud.</td><td>-á</td></tr>
             <tr><td>nosotros</td><td>-emos</td></tr>
             <tr><td>vosotros</td><td>-éis</td></tr>
             <tr><td>ellos/ellas/uds.</td><td>-án</td></tr>
           </table>
           <p><strong>Irregular Stems:</strong> decir → dir-, hacer → har-, tener → tendr-, venir → vendr-, etc.</p>`
  },
  conditionalInfo: {
    title: "Conditional (Condicional Simple)",
    html: `<p>Expresses what would happen under certain conditions or in polite requests.</p>
           <table class="tense-tooltip-table">
             <tr><th>Pronoun</th><th>Ending</th></tr>
             <tr><td>yo</td><td>-ía</td></tr>
             <tr><td>tú</td><td>-ías</td></tr>
             <tr><td>él/ella/ud.</td><td>-ía</td></tr>
             <tr><td>nosotros</td><td>-íamos</td></tr>
             <tr><td>vosotros</td><td>-íais</td></tr>
             <tr><td>ellos/ellas/uds.</td><td>-ían</td></tr>
           </table>
           <p><strong>Irregular Stems:</strong> Same as the future tense: decir → dir-, poner → pondr-, querer → querr-, etc.</p>`
  },
  regularInfo: {
    title: "Regular Verbs",
    html: `<p>Regular verbs keep their stem and use predictable endings.</p>
           <table class="tense-tooltip-table irregular-tooltip-table">
             <tr><th>-ar (hablar)</th><th>-er (comer)</th><th>-ir (vivir)</th></tr>
             <tr><td>hablo, hablas...</td><td>como, comes...</td><td>vivo, vives...</td></tr>
           </table>
           <div class="conjugation-boxes">
             <table class="conjugation-box">
               <caption>hablar (pres.)</caption>
               <tr><td>yo</td><td>hablo</td></tr>
               <tr><td>tú</td><td>hablas</td></tr>
               <tr><td>él</td><td>habla</td></tr>
               <tr><td>nosotros</td><td>hablamos</td></tr>
               <tr><td>vosotros</td><td>habláis</td></tr>
               <tr><td>ellos</td><td>hablan</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>beber (pres.)</caption>
               <tr><td>yo</td><td>bebo</td></tr>
               <tr><td>tú</td><td>bebes</td></tr>
               <tr><td>él</td><td>bebe</td></tr>
               <tr><td>nosotros</td><td>bebemos</td></tr>
               <tr><td>vosotros</td><td>bebéis</td></tr>
               <tr><td>ellos</td><td>beben</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>vivir (pres.)</caption>
               <tr><td>yo</td><td>vivo</td></tr>
               <tr><td>tú</td><td>vives</td></tr>
               <tr><td>él</td><td>vive</td></tr>
               <tr><td>nosotros</td><td>vivimos</td></tr>
               <tr><td>vosotros</td><td>vivís</td></tr>
               <tr><td>ellos</td><td>viven</td></tr>
             </table>
           </div>
           <p><strong>Examples:</strong> comer, hablar, vivir, estudiar, trabajar</p>`
  },
  firstPersonInfo: {
    title: "1st Person Irregular (Present)",
    html: `<p>Only the <em>yo</em> form changes.</p>
           <table class="tense-tooltip-table irregular-tooltip-table">
             <tr><th>Regular</th><th>Irregular</th></tr>
             <tr><td>hablar → hablo</td><td>salir → salgo</td></tr>
           </table>
           <div class="conjugation-boxes">
             <table class="conjugation-box">
               <caption>dar (pres.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">doy</td></tr>
               <tr><td>tú</td><td>das</td></tr>
               <tr><td>él</td><td>da</td></tr>
               <tr><td>nosotros</td><td>damos</td></tr>
               <tr><td>vosotros</td><td>dais</td></tr>
               <tr><td>ellos</td><td>dan</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>conocer (pres.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">conozco</td></tr>
               <tr><td>tú</td><td>conoces</td></tr>
               <tr><td>él</td><td>conoce</td></tr>
               <tr><td>nosotros</td><td>conocemos</td></tr>
               <tr><td>vosotros</td><td>conocéis</td></tr>
               <tr><td>ellos</td><td>conocen</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>salir (pres.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">salgo</td></tr>
               <tr><td>tú</td><td>sales</td></tr>
               <tr><td>él</td><td>sale</td></tr>
               <tr><td>nosotros</td><td>salimos</td></tr>
               <tr><td>vosotros</td><td>salís</td></tr>
               <tr><td>ellos</td><td>salen</td></tr>
             </table>
           </div>
           <p><strong>Verbs:</strong> caber, caer, componer, conducir, conocer, dar, parecer, poner, ponerse, saber, salir, suponer, traer, valer, ver, verse</p>`
  },
  stemChangingInfo: {
    title: "Stem Changing (Present)",
    html: `<p>The stem vowel changes in all forms except nosotros/vosotros.</p>
           <table class="tense-tooltip-table irregular-tooltip-table">
             <tr><th>Regular</th><th>Irregular</th></tr>
             <tr><td>vivir → vivo</td><td>dormir → duermo</td></tr>
           </table>
           <div class="conjugation-boxes">
             <table class="conjugation-box">
               <caption>jugar (pres.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">juego</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">juegas</td></tr>
               <tr><td>él</td><td class="irregular-highlight">juega</td></tr>
               <tr><td>nosotros</td><td>jugamos</td></tr>
               <tr><td>vosotros</td><td>jugáis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">juegan</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>perder (pres.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">pierdo</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">pierdes</td></tr>
               <tr><td>él</td><td class="irregular-highlight">pierde</td></tr>
               <tr><td>nosotros</td><td>perdemos</td></tr>
               <tr><td>vosotros</td><td>perdéis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">pierden</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>dormir (pres.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">duermo</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">duermes</td></tr>
               <tr><td>él</td><td class="irregular-highlight">duerme</td></tr>
               <tr><td>nosotros</td><td>dormimos</td></tr>
               <tr><td>vosotros</td><td>dormís</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">duermen</td></tr>
             </table>
           </div>
           <p><strong>Verbs:</strong> acostarse, arrepentirse, conseguir, convertirse, divertirse, dormir, dormirse, empezar, encontrar, jugar, mentir, morir, pedir, perder, poder, querer, recordar, repetir, reírse, seguir, sentarse, sentir, sentirse, volver</p>`
  },
  multipleIrregularInfo: {
    title: "Multiple Irregularities (Present)",
    html: `<p>These verbs combine several changes.</p>
           <table class="tense-tooltip-table irregular-tooltip-table">
             <tr><th>Regular</th><th>Irregular</th></tr>
             <tr><td>comer → como</td><td>tener → tengo, tienes</td></tr>
           </table>
           <div class="conjugation-boxes">
             <table class="conjugation-box">
               <caption>estar (pres.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">estoy</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">estás</td></tr>
               <tr><td>él</td><td class="irregular-highlight">está</td></tr>
               <tr><td>nosotros</td><td>estamos</td></tr>
               <tr><td>vosotros</td><td>estáis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">están</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>tener (pres.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">tengo</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">tienes</td></tr>
               <tr><td>él</td><td class="irregular-highlight">tiene</td></tr>
               <tr><td>nosotros</td><td>tenemos</td></tr>
               <tr><td>vosotros</td><td>tenéis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">tienen</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>decir (pres.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">digo</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">dices</td></tr>
               <tr><td>él</td><td class="irregular-highlight">dice</td></tr>
               <tr><td>nosotros</td><td>decimos</td></tr>
               <tr><td>vosotros</td><td>decís</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">dicen</td></tr>
             </table>
           </div>
           <p><strong>Verbs:</strong> decir, estar, hacer, ir, irse, obtener, ser, tener, venir</p>`
  },
  yChangeInfo: {
    title: "Y Change",
    html: `<p>Spelling changes to a 'y' in certain forms.</p>
           <table class="tense-tooltip-table irregular-tooltip-table">
             <tr><th>Regular</th><th>Irregular</th></tr>
             <tr><td>leer → leí</td><td>leer → leyó</td></tr>
           </table>
           <div class="conjugation-boxes">
             <table class="conjugation-box">
               <caption>leer (pret.)</caption>
               <tr><td>yo</td><td>leí</td></tr>
               <tr><td>tú</td><td>leíste</td></tr>
               <tr><td>él</td><td class="irregular-highlight">leyó</td></tr>
               <tr><td>nosotros</td><td>leímos</td></tr>
               <tr><td>vosotros</td><td>leísteis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">leyeron</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>oír (pret.)</caption>
               <tr><td>yo</td><td>oí</td></tr>
               <tr><td>tú</td><td>oíste</td></tr>
               <tr><td>él</td><td class="irregular-highlight">oyó</td></tr>
               <tr><td>nosotros</td><td>oímos</td></tr>
               <tr><td>vosotros</td><td>oísteis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">oyeron</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>construir (pres.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">construyo</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">construyes</td></tr>
               <tr><td>él</td><td class="irregular-highlight">construye</td></tr>
               <tr><td>nosotros</td><td>construimos</td></tr>
               <tr><td>vosotros</td><td>construís</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">construyen</td></tr>
             </table>
           </div>
           <p><strong>Verbs:</strong> caer, construir, creer, leer, oír</p>`
  },
  irregularRootInfo: {
    title: "Irregular Root (Preterite)",
    html: `<p>The stem changes completely in the simple past.</p>
           <table class="tense-tooltip-table irregular-tooltip-table">
             <tr><th>Regular</th><th>Irregular</th></tr>
             <tr><td>hablar → hablé</td><td>estar → estuve</td></tr>
           </table>
           <div class="conjugation-boxes">
             <table class="conjugation-box">
               <caption>estar (pret.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">estuve</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">estuviste</td></tr>
               <tr><td>él</td><td class="irregular-highlight">estuvo</td></tr>
               <tr><td>nosotros</td><td class="irregular-highlight">estuvimos</td></tr>
               <tr><td>vosotros</td><td class="irregular-highlight">estuvisteis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">estuvieron</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>poder (pret.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">pude</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">pudiste</td></tr>
               <tr><td>él</td><td class="irregular-highlight">pudo</td></tr>
               <tr><td>nosotros</td><td class="irregular-highlight">pudimos</td></tr>
               <tr><td>vosotros</td><td class="irregular-highlight">pudisteis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">pudieron</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>venir (pret.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">vine</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">viniste</td></tr>
               <tr><td>él</td><td class="irregular-highlight">vino</td></tr>
               <tr><td>nosotros</td><td class="irregular-highlight">vinimos</td></tr>
               <tr><td>vosotros</td><td class="irregular-highlight">vinisteis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">vinieron</td></tr>
             </table>
           </div>
           <p><strong>Verbs:</strong> andar, caber, componer, conducir, decir, estar, hacer, obtener, poder, poner, ponerse, querer, reírse, saber, suponer, tener, traer, venir</p>`
  },
  stemChange3rdInfo: {
    title: "3rd Person Stem Change (Preterite)",
    html: `<p>-ir verbs change stem only in third person forms.</p>
           <table class="tense-tooltip-table irregular-tooltip-table">
             <tr><th>Regular</th><th>Irregular</th></tr>
             <tr><td>vivir → vivió</td><td>dormir → durmió</td></tr>
           </table>
           <div class="conjugation-boxes">
             <table class="conjugation-box">
               <caption>pedir (pret.)</caption>
               <tr><td>yo</td><td>pedí</td></tr>
               <tr><td>tú</td><td>pediste</td></tr>
               <tr><td>él</td><td class="irregular-highlight">pidió</td></tr>
               <tr><td>nosotros</td><td>pedimos</td></tr>
               <tr><td>vosotros</td><td>pedisteis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">pidieron</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>dormir (pret.)</caption>
               <tr><td>yo</td><td>dormí</td></tr>
               <tr><td>tú</td><td>dormiste</td></tr>
               <tr><td>él</td><td class="irregular-highlight">durmió</td></tr>
               <tr><td>nosotros</td><td>dormimos</td></tr>
               <tr><td>vosotros</td><td>dormisteis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">durmieron</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>morir (pret.)</caption>
               <tr><td>yo</td><td>morí</td></tr>
               <tr><td>tú</td><td>moriste</td></tr>
               <tr><td>él</td><td class="irregular-highlight">murió</td></tr>
               <tr><td>nosotros</td><td>morimos</td></tr>
               <tr><td>vosotros</td><td>moristeis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">murieron</td></tr>
             </table>
           </div>
           <p><strong>Verbs:</strong> arrepentirse, conseguir, convertirse, divertirse, dormir, dormirse, mentir, morir, pedir, repetir, seguir, sentir, sentirse</p>`
  },
  totallyIrregularInfo: {
    title: "Totally Irregular (Preterite)",
    html: `<p>Unique forms not derived from the infinitive.</p>
           <table class="tense-tooltip-table irregular-tooltip-table">
             <tr><th>Regular</th><th>Irregular</th></tr>
             <tr><td>hablar → hablé</td><td>ser → fui</td></tr>
           </table>
           <div class="conjugation-boxes">
             <table class="conjugation-box">
               <caption>ser (pret.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">fui</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">fuiste</td></tr>
               <tr><td>él</td><td class="irregular-highlight">fue</td></tr>
               <tr><td>nosotros</td><td class="irregular-highlight">fuimos</td></tr>
               <tr><td>vosotros</td><td class="irregular-highlight">fuisteis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">fueron</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>ir (pret.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">fui</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">fuiste</td></tr>
               <tr><td>él</td><td class="irregular-highlight">fue</td></tr>
               <tr><td>nosotros</td><td class="irregular-highlight">fuimos</td></tr>
               <tr><td>vosotros</td><td class="irregular-highlight">fuisteis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">fueron</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>dar (pret.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">di</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">diste</td></tr>
               <tr><td>él</td><td class="irregular-highlight">dio</td></tr>
               <tr><td>nosotros</td><td class="irregular-highlight">dimos</td></tr>
               <tr><td>vosotros</td><td class="irregular-highlight">disteis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">dieron</td></tr>
             </table>
           </div>
           <p><strong>Verbs:</strong> dar, ir, irse, ser</p>`
  },
  irregularParticipleInfo: {
    title: "Irregular Participle",
    html: `<p>Past participle has an unexpected form.</p>
           <table class="tense-tooltip-table irregular-tooltip-table">
             <tr><th>Regular</th><th>Irregular</th></tr>
             <tr><td>hablar → hablado</td><td>ver → visto</td></tr>
           </table>
           <div class="conjugation-boxes">
             <table class="conjugation-box">
               <caption>ver (pres. perf.)</caption>
               <tr><td>yo</td><td>he <span class="irregular-highlight">visto</span></td></tr>
               <tr><td>tú</td><td>has <span class="irregular-highlight">visto</span></td></tr>
               <tr><td>él</td><td>ha <span class="irregular-highlight">visto</span></td></tr>
               <tr><td>nosotros</td><td>hemos <span class="irregular-highlight">visto</span></td></tr>
               <tr><td>vosotros</td><td>habéis <span class="irregular-highlight">visto</span></td></tr>
               <tr><td>ellos</td><td>han <span class="irregular-highlight">visto</span></td></tr>
             </table>
             <table class="conjugation-box">
               <caption>escribir (pres. perf.)</caption>
               <tr><td>yo</td><td>he <span class="irregular-highlight">escrito</span></td></tr>
               <tr><td>tú</td><td>has <span class="irregular-highlight">escrito</span></td></tr>
               <tr><td>él</td><td>ha <span class="irregular-highlight">escrito</span></td></tr>
               <tr><td>nosotros</td><td>hemos <span class="irregular-highlight">escrito</span></td></tr>
               <tr><td>vosotros</td><td>habéis <span class="irregular-highlight">escrito</span></td></tr>
               <tr><td>ellos</td><td>han <span class="irregular-highlight">escrito</span></td></tr>
             </table>
             <table class="conjugation-box">
               <caption>poner (pres. perf.)</caption>
               <tr><td>yo</td><td>he <span class="irregular-highlight">puesto</span></td></tr>
               <tr><td>tú</td><td>has <span class="irregular-highlight">puesto</span></td></tr>
               <tr><td>él</td><td>ha <span class="irregular-highlight">puesto</span></td></tr>
               <tr><td>nosotros</td><td>hemos <span class="irregular-highlight">puesto</span></td></tr>
               <tr><td>vosotros</td><td>habéis <span class="irregular-highlight">puesto</span></td></tr>
               <tr><td>ellos</td><td>han <span class="irregular-highlight">puesto</span></td></tr>
             </table>
           </div>
           <p><strong>Verbs:</strong> componer, decir, escribir, hacer, leer, morir, oír, poner, ponerse, ver, verse, volver</p>`
  },
  irregularFutureInfo: {
    title: "Irregular Future/Conditional",
    html: `<p>Future and conditional use a modified stem.</p>
           <table class="tense-tooltip-table irregular-tooltip-table">
             <tr><th>Regular</th><th>Irregular</th></tr>
             <tr><td>comer → comeré</td><td>tener → tendré</td></tr>
           </table>
           <div class="conjugation-boxes">
             <table class="conjugation-box">
               <caption>tener (fut.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">tendré</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">tendrás</td></tr>
               <tr><td>él</td><td class="irregular-highlight">tendrá</td></tr>
               <tr><td>nosotros</td><td class="irregular-highlight">tendremos</td></tr>
               <tr><td>vosotros</td><td class="irregular-highlight">tendréis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">tendrán</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>salir (fut.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">saldré</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">saldrás</td></tr>
               <tr><td>él</td><td class="irregular-highlight">saldrá</td></tr>
               <tr><td>nosotros</td><td class="irregular-highlight">saldremos</td></tr>
               <tr><td>vosotros</td><td class="irregular-highlight">saldréis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">saldrán</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>decir (fut.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">diré</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">dirás</td></tr>
               <tr><td>él</td><td class="irregular-highlight">dirá</td></tr>
               <tr><td>nosotros</td><td class="irregular-highlight">diremos</td></tr>
               <tr><td>vosotros</td><td class="irregular-highlight">diréis</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">dirán</td></tr>
             </table>
           </div>
           <p><strong>Verbs:</strong> caber, componer, decir, hacer, obtener, poder, poner, ponerse, querer, saber, suponer, tener, valer, venir</p>`
  },
  irregularImperfectInfo: {
    title: "Irregular Imperfect",
    html: `<p>Only three verbs have irregular imperfect forms.</p>
           <table class="tense-tooltip-table irregular-tooltip-table">
             <tr><th>Regular</th><th>Irregular</th></tr>
             <tr><td>hablar → hablaba</td><td>ir → iba</td></tr>
           </table>
           <div class="conjugation-boxes">
             <table class="conjugation-box">
               <caption>ir (impf.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">iba</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">ibas</td></tr>
               <tr><td>él</td><td class="irregular-highlight">iba</td></tr>
               <tr><td>nosotros</td><td class="irregular-highlight">íbamos</td></tr>
               <tr><td>vosotros</td><td class="irregular-highlight">ibais</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">iban</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>ser (impf.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">era</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">eras</td></tr>
               <tr><td>él</td><td class="irregular-highlight">era</td></tr>
               <tr><td>nosotros</td><td class="irregular-highlight">éramos</td></tr>
               <tr><td>vosotros</td><td class="irregular-highlight">erais</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">eran</td></tr>
             </table>
             <table class="conjugation-box">
               <caption>ver (impf.)</caption>
               <tr><td>yo</td><td class="irregular-highlight">veía</td></tr>
               <tr><td>tú</td><td class="irregular-highlight">veías</td></tr>
               <tr><td>él</td><td class="irregular-highlight">veía</td></tr>
               <tr><td>nosotros</td><td class="irregular-highlight">veíamos</td></tr>
               <tr><td>vosotros</td><td class="irregular-highlight">veíais</td></tr>
               <tr><td>ellos</td><td class="irregular-highlight">veían</td></tr>
             </table>
           </div>
           <p><strong>Verbs:</strong> irse, ser, ver, verse</p>`
  },
  reflexiveInfo: {
    title: "Reflexive Verbs",
    html: `<p>The subject performs the action on itself. Use reflexive pronouns before the verb.</p>
           <table class="tense-tooltip-table irregular-tooltip-table">
             <tr><th>Pronoun</th><th>Reflexive</th></tr>
             <tr><td>yo</td><td>me</td></tr>
             <tr><td>tú</td><td>te</td></tr>
             <tr><td>él/ella/ud.</td><td>se</td></tr>
             <tr><td>nosotros</td><td>nos</td></tr>
             <tr><td>vosotros</td><td>os</td></tr>
             <tr><td>ellos/ellas/uds.</td><td>se</td></tr>
           </table>
           <p><strong>Verbs:</strong> aburrirse, acercarse, acostarse, alejarse, arrepentirse, comunicarse, convertirse, divertirse, dormirse, ducharse, enfermarse, irse, levantarse, llamarse, mudarse, olvidarse, ponerse, quedarse, quitarse, reírse, sentarse, sentirse, verse</p>`
  },
};
