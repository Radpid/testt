// Minutage de MAQUETTE, sans voix. Le vrai timings.js, chargé ensuite s'il
// existe, remplace ces estimations après alignement ou génération de la voix.
(() => {
  const lengths = [3.4, 2.9, 3.5, 3.2, 2.8, 3.3, 3.5, 2.5, 3.2, 3.0, 3.5,
    2.8, 3.6, 2.9, 2.8, 2.4, 3.6, 2.7, 3.1, 3.1, 3.3, 2.6];
  let t = 0.5;
  const beats = window.BEATS.map(([id, text], i) => {
    const start = t, d = lengths[i], words = text.split(/\s+/);
    const total = words.reduce((n, word) => n + word.length, 0);
    let n = 0;
    const timing = words.map(word => {
      const a = start + d * .9 * n / total;
      n += word.length;
      return [a, start + d * .9 * n / total];
    });
    t += d + .08;
    return { id, start, end: start + d, words: timing };
  });
  window.TIMINGS = { source: "storyboard-estimate", duration: t + 4, beats };
})();
