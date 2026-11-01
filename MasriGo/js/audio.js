/* MasriGo — pronunciation: browser speech synthesis (+ optional speech recognition).
   Nothing here pretends to work when the browser can't do it. */
(function () {
  const MG = (window.MG = window.MG || {});
  const synth = window.speechSynthesis || null;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  let voices = [];
  let last = null;
  let token = 0;
  let warned = false;

  function load() { voices = synth ? synth.getVoices() : []; }
  if (synth) {
    load();
    if (synth.addEventListener) synth.addEventListener('voiceschanged', load);
    else synth.onvoiceschanged = load;
  }

  const arVoices = () => voices.filter((v) => /^ar([-_]|$)/i.test(v.lang));
  const settings = () => (MG.Progress ? MG.Progress.get().settings : { rate: 0.9, voice: '' });

  function pickVoice() {
    const list = arVoices();
    const pref = settings().voice;
    if (pref) {
      const v = list.find((x) => x.name === pref);
      if (v) return v;
    }
    return list.find((v) => /^ar[-_]EG/i.test(v.lang)) || list[0] || null;
  }

  const clean = (t) => String(t).replace(/[….؟?!،,:]/g, ' ').replace(/\s+/g, ' ').trim();

  function showRepeat() {
    const b = document.getElementById('repeatBtn');
    if (b) b.hidden = !last;
  }

  function speak(text, opts) {
    opts = opts || {};
    if (!synth) {
      MG.toast && MG.toast('Browser-mu belum mendukung suara. Coba Chrome, Edge, atau Safari.', { icon: '🔇' });
      return false;
    }
    last = { text, slow: !!opts.slow };
    showRepeat();
    token++;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(clean(text));
    const v = pickVoice();
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'ar-EG'; }
    u.rate = opts.slow ? 0.55 : Number(settings().rate) || 0.9;
    u.pitch = 1.05;
    const done = () => { if (opts.onend) opts.onend(); };
    u.onend = done;
    u.onerror = (e) => { if (e.error !== 'interrupted' && e.error !== 'canceled') done(); };
    if (!v && !warned) {
      warned = true;
      MG.toast && MG.toast('Suara Arab belum terpasang di perangkatmu. Lihat Pengaturan untuk caranya.', { icon: '🔈', ms: 5000 });
    }
    synth.speak(u);
    return true;
  }

  // play several lines one after another; returns a stop function
  function sequence(texts, opts) {
    opts = opts || {};
    const my = ++token;
    let i = 0;
    function next() {
      if (my !== token || i >= texts.length) { if (my === token && opts.ondone) opts.ondone(); return; }
      const idx = i++;
      if (opts.onstep) opts.onstep(idx);
      const ok = speak(texts[idx], { slow: opts.slow, onend: () => { setTimeout(next, 250); } });
      token = my; // speak() bumps the token; keep ours so the chain continues
      if (!ok) return;
    }
    next();
    return () => { if (token === my) { token++; stop(); } };
  }

  function stop() { token++; if (synth) synth.cancel(); }
  function repeat() { if (last) speak(last.text, { slow: last.slow }); }

  // ---- optional speaking practice ----
  function norm(s) {
    return String(s).normalize('NFKD')
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/[إأآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه')
      .replace(/[^\u0600-\u06FF\s]/g, '').replace(/\s+/g, ' ').trim();
  }
  function similarity(a, b) {
    a = norm(a); b = norm(b);
    if (!a.length || !b.length) return 0;
    const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return 1 - dp[a.length][b.length] / Math.max(a.length, b.length);
  }
  function listen(target, cb) {
    if (!SR) return cb({ ok: false, error: 'unsupported' });
    stop();
    const r = new SR();
    let finished = false;
    const fin = (x) => { if (!finished) { finished = true; cb(x); } };
    r.lang = 'ar-EG';
    r.interimResults = false;
    r.maxAlternatives = 3;
    r.onresult = (e) => {
      const alts = Array.from(e.results[0]).map((a) => a.transcript);
      const best = Math.max.apply(null, alts.map((t) => similarity(t, target)));
      fin({ ok: true, heard: alts[0], score: best });
    };
    r.onerror = (e) => fin({ ok: false, error: e.error });
    r.onend = () => fin({ ok: false, error: 'no-speech' });
    try { r.start(); } catch (e) { fin({ ok: false, error: 'start-failed' }); }
  }

  MG.Audio = {
    speak, sequence, stop, repeat, listen,
    canListen: !!SR,
    supported: !!synth,
    voices: () => { load(); return arVoices(); },
    status: () => { load(); return { supported: !!synth, arabic: arVoices().length, total: voices.length }; },
    hasArabic: () => { load(); return arVoices().length > 0; }
  };
})();
