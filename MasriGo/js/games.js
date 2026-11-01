/* MasriGo — five games (A–E) plus a shared runner used by lesson quizzes too.
   Every run gives instant feedback, awards points, shows correct answers,
   can be retried, and ends with a completion screen. */
(function () {
  const MG = (window.MG = window.MG || {});
  const U = MG.util, esc = U.esc;
  const say = (t) => MG.Audio.speak(t);

  const TYPES = {
    choose: { key: 'A', emoji: '🎯', name: 'Pilih Artinya', desc: 'Lihat kata Arab, pilih terjemahan Indonesia yang benar.', color: 'pink' },
    match: { key: 'B', emoji: '🧩', name: 'Pasangkan Kata', desc: 'Cocokkan kata Arab dengan artinya.', color: 'lav' },
    listen: { key: 'C', emoji: '🎧', name: 'Dengar & Pilih', desc: 'Dengarkan suara, lalu pilih kata yang kamu dengar.', color: 'mint' },
    build: { key: 'D', emoji: '🧱', name: 'Susun Kalimat', desc: 'Urutkan kata-kata Arab menjadi kalimat yang benar.', color: 'peach' },
    convo: { key: 'E', emoji: '💬', name: 'Lengkapi Percakapan', desc: 'Pilih balasan yang pas untuk percakapan.', color: 'pink' }
  };

  // ---------- pools & question factories ----------
  function pools(ids) {
    const p = { vocab: [], sentences: [], replies: [] };
    ids.forEach((id) => {
      const L = MG.LESSONS[id - 1];
      L.vocab.forEach((v, i) => p.vocab.push(Object.assign({ lesson: id, key: id + ':' + i }, v)));
      L.sentences.forEach((s) => p.sentences.push(Object.assign({ lesson: id }, s)));
      L.replies.forEach((r) => p.replies.push(Object.assign({ lesson: id }, r)));
    });
    return p;
  }
  const arHtml = (v) => `<span class="ar" lang="ar" dir="rtl">${esc(v.ar)}</span><small class="tr">${esc(v.tr)}</small>`;
  const distract = (pool, v, n) => U.sample(pool.filter((x) => x.id !== v.id && x.ar !== v.ar), n);

  function qChoose(pool, v) {
    const opts = U.shuffle([v].concat(distract(pool, v, 2))).map((o) => ({ html: esc(o.id), correct: o === v }));
    return { kind: 'choice', say: v.say, promptHtml: `<div class="prompt-ar">${arHtml(v)}</div><p class="ask">Apa artinya?</p>`, options: opts, answerHtml: esc(v.id) };
  }
  function qReverse(pool, v) {
    const opts = U.shuffle([v].concat(distract(pool, v, 2))).map((o) => ({ html: arHtml(o), correct: o === v, cls: 'ar-opt' }));
    return { kind: 'choice', say: v.say, promptHtml: `<div class="prompt-id">${esc(v.id)}</div><p class="ask">Mana kata Arabnya?</p>`, options: opts, answerHtml: arHtml(v) };
  }
  function qListen(pool, v) {
    const opts = U.shuffle([v].concat(distract(pool, v, 2))).map((o) => ({ html: `<span class="ar" lang="ar" dir="rtl">${esc(o.ar)}</span>`, after: arHtml(o), correct: o === v, cls: 'ar-opt' }));
    return { kind: 'choice', listen: true, say: v.say, autoplay: true, promptHtml: '<p class="ask">Dengarkan, lalu pilih yang kamu dengar</p>', options: opts, answerHtml: arHtml(v) };
  }
  function qConvo(r) {
    const all = [{ ar: r.a.ar, tr: r.a.tr, correct: true }, { ar: r.w[0].ar, tr: r.w[0].tr }, { ar: r.w[1].ar, tr: r.w[1].tr }];
    return {
      kind: 'choice', say: r.q.ar,
      promptHtml: `<div class="chat"><div class="bub them"><div class="ar" lang="ar" dir="rtl">${esc(r.q.ar)}</div><div class="tr">${esc(r.q.tr)}</div><div class="id">${esc(r.q.id)}</div></div><div class="bub me blank"><div class="ar" dir="rtl">؟؟؟</div></div></div><p class="ask">Balasan apa yang paling pas?</p>`,
      options: U.shuffle(all).map((o) => ({ html: `<span class="ar" lang="ar" dir="rtl">${esc(o.ar)}</span><small class="tr">${esc(o.tr)}</small>`, correct: !!o.correct, cls: 'ar-opt' })),
      answerHtml: `<span class="ar" lang="ar" dir="rtl">${esc(r.a.ar)}</span> <small>(${esc(r.a.id)})</small>`,
      sayAnswer: r.a.ar
    };
  }
  function qBuild(s) {
    const tokens = s.ar.split(' ');
    return { kind: 'build', tokens, say: s.ar, meaning: s.id, tr: s.tr, target: tokens.join(' ') };
  }
  function qMatch(list) {
    return { kind: 'match', weight: list.length, pairs: list.map((v) => ({ ar: v.ar, tr: v.tr, id: v.id, say: v.say })) };
  }

  const buildable = (p) => p.sentences.filter((s) => s.ar.split(' ').length >= 3);

  function make(type, ids, n) {
    const p = pools(ids);
    switch (type) {
      case 'choose': return U.sample(p.vocab, n || 8).map((v) => qChoose(p.vocab, v));
      case 'listen': return U.sample(p.vocab, n || 8).map((v) => qListen(p.vocab, v));
      case 'convo': return U.sample(p.replies, n || 5).map(qConvo);
      case 'build': return U.sample(buildable(p), n || 5).map(qBuild);
      case 'match': {
        const boards = Math.max(1, Math.min(2, Math.floor(p.vocab.length / 5)));
        const picked = U.sample(p.vocab, boards * 5);
        const out = [];
        for (let i = 0; i < boards; i++) out.push(qMatch(picked.slice(i * 5, i * 5 + 5)));
        return out;
      }
    }
    return [];
  }

  // lesson quiz: 5 mixed questions that always include a conversation reply
  function lessonQuiz(id) {
    const p = pools([id]);
    const v = U.sample(p.vocab, 4);
    const q = [qChoose(p.vocab, v[0]), qChoose(p.vocab, v[1]), qReverse(p.vocab, v[2]), qListen(p.vocab, v[3])];
    q.push(qConvo(U.sample(p.replies, 1)[0]));
    return U.shuffle(q);
  }

  // ---------- runner ----------
  function stars(pct) { return pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.5 ? 1 : 0; }

  function run(root, cfg) {
    let qs, i, earned, total;
    function start() {
      qs = cfg.make(); i = 0; earned = 0;
      total = qs.reduce((a, q) => a + (q.weight || 1), 0);
      if (!qs.length) { root.innerHTML = '<div class="card"><p>Belum ada soal untuk game ini.</p></div>'; return; }
      show();
    }
    const head = () => `<div class="gh"><button class="btn ghost small" data-g="exit">✕ Keluar</button><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${qs.length}" aria-valuenow="${i}"><i style="width:${(i / qs.length) * 100}%"></i></div><span class="gcount">${i + 1}/${qs.length}</span></div>`;
    const nextBtn = () => `<button class="btn primary big next" data-g="next">${i + 1 >= qs.length ? '🏁 Lihat hasil' : 'Lanjut ➜'}</button>`;

    function show() {
      root.dataset.done = '';
      const q = qs[i];
      if (q.kind === 'choice') return showChoice(q);
      if (q.kind === 'build') return showBuild(q);
      return showMatch(q);
    }

    function showChoice(q) {
      root.innerHTML = head() + `<div class="card q">${q.listen ? `<button class="bigsound" data-say="${esc(q.say)}" aria-label="Putar suara">🔊</button><button class="btn ghost small" data-say="${esc(q.say)}" data-slow="1">🐢 Pelan</button>` : ''}${q.promptHtml}<div class="opts">${q.options.map((o, k) => `<button class="opt ${o.cls || ''}" data-g="pick" data-k="${k}">${o.html}</button>`).join('')}</div><div class="fb" id="fb" aria-live="polite"></div></div>`;
      if (q.autoplay) say(q.say);
    }

    function showBuild(q) {
      const st = { bank: U.shuffle(q.tokens.map((t, k) => ({ t, k }))), placed: [], done: false };
      root._b = st;
      const draw = () => {
        const bankHtml = st.bank.map((x) => `<button class="chip" data-g="bank" data-k="${x.k}" lang="ar">${esc(x.t)}</button>`).join('');
        const placedHtml = st.placed.map((x) => `<button class="chip placed" data-g="unplace" data-k="${x.k}" lang="ar" ${st.done ? 'disabled' : ''}>${esc(x.t)}</button>`).join('');
        root.innerHTML = head() + `<div class="card q"><p class="ask">Susun kalimat ini dalam bahasa Arab:</p><div class="prompt-id">${esc(q.meaning)}</div><div class="slots" dir="rtl" id="slots">${placedHtml || '<span class="hint">Ketuk kata di bawah</span>'}</div><div class="bank" dir="rtl">${st.done ? '' : bankHtml}</div><div class="row"><button class="btn ghost" data-g="reset" ${st.done ? 'disabled' : ''}>↺ Ulangi susunan</button><button class="btn primary" data-g="check" ${st.bank.length || st.done ? 'disabled' : ''}>Periksa ✓</button></div><div class="fb" id="fb" aria-live="polite"></div></div>`;
      };
      root._draw = draw;
      draw();
    }

    function showMatch(q) {
      const st = { left: U.shuffle(q.pairs.map((p, k) => ({ p, k }))), right: U.shuffle(q.pairs.map((p, k) => ({ p, k }))), sel: null, hit: {}, miss: 0 };
      root._m = st;
      root.innerHTML = head() + `<div class="card q"><p class="ask">Pasangkan kata Arab dengan artinya. Ketuk kiri lalu kanan.</p><div class="match"><div class="col">${st.left.map((x) => `<button class="opt ar-opt" data-g="ml" data-k="${x.k}"><span class="ar" lang="ar" dir="rtl">${esc(x.p.ar)}</span><small class="tr">${esc(x.p.tr)}</small></button>`).join('')}</div><div class="col">${st.right.map((x) => `<button class="opt" data-g="mr" data-k="${x.k}">${esc(x.p.id)}</button>`).join('')}</div></div><div class="fb" id="fb" aria-live="polite"></div></div>`;
    }

    const fb = (html, ok) => { const f = root.querySelector('#fb'); f.className = 'fb ' + (ok ? 'ok' : 'bad'); f.innerHTML = html; };
    const lock = () => { root.dataset.done = '1'; };
    const addNext = () => root.querySelector('.card.q').insertAdjacentHTML('beforeend', nextBtn());

    function finish() {
      const pct = total ? earned / total : 0;
      const pts = Math.round(earned * 10);
      const st = stars(pct);
      MG.Progress.addPoints(pts);
      if (cfg.countGame !== false) MG.Progress.recordGame(pct);
      const extra = (cfg.after ? cfg.after(pct, pts) : []).filter(Boolean);
      cfg._extra = extra;
      const msg = pct >= 0.9 ? 'Luar biasa! Kamu hebat 🎉' : pct >= 0.7 ? 'Bagus sekali! Sedikit lagi sempurna ✨' : pct >= 0.5 ? 'Lumayan! Ayo coba lagi untuk skor lebih tinggi 💪' : 'Tidak apa-apa, belajar butuh proses. Coba lagi ya 🌱';
      root.innerHTML = `<div class="card done"><img class="mascot" src="assets/images/mascot.svg" alt=""><h2>${esc(cfg.title || 'Selesai')}</h2><div class="stars big" aria-label="${st} dari 3 bintang">${[1, 2, 3].map((n) => `<span class="${n <= st ? 'on' : ''}" style="--d:${n * 0.18}s">★</span>`).join('')}</div><p class="score">Skor <b>${Math.round(earned * 10) / 10}</b> dari <b>${total}</b> · +${pts} poin</p><p>${msg}</p><div class="row center"><button class="btn primary" data-g="again">🔁 Main lagi</button>${extra.map((x, k) => `<button class="btn ${x.cls || 'soft'}" data-g="extra" data-k="${k}">${x.label}</button>`).join('')}<button class="btn ghost" data-g="exit">Keluar</button></div></div>`;
      if (cfg.onFinish) cfg.onFinish({ earned, total, pct, points: pts, stars: st });
    }

    root.onclick = function (e) {
      const b = e.target.closest('[data-g]');
      if (!b || b.disabled) return;
      const act = b.dataset.g, k = Number(b.dataset.k), q = qs && qs[i];
      if (act === 'exit') { MG.Audio.stop(); return cfg.onExit && cfg.onExit(); }
      if (act === 'again') return start();
      if (act === 'extra') return cfg._extra[k].run();
      if (act === 'next') { i++; return i >= qs.length ? finish() : show(); }

      if (act === 'pick' && !root.dataset.done) {
        lock();
        const o = q.options[k], btns = root.querySelectorAll('.opt');
        btns.forEach((x, n) => { x.disabled = true; if (q.options[n].correct) x.classList.add('ok'); if (n === k && !o.correct) x.classList.add('bad'); if (q.options[n].after) x.insertAdjacentHTML('beforeend', q.options[n].after.replace(/<span class="ar"[^>]*>.*?<\/span>/, '')); });
        if (o.correct) { earned += 1; fb('✅ Benar! +10 poin', true); } else fb('💡 Jawaban yang benar: ' + q.answerHtml, false);
        say(q.sayAnswer || q.say);
        addNext();
      }

      if (['bank', 'unplace', 'reset', 'check'].includes(act)) {
        const st = root._b;
        if (st.done) return;
        if (act === 'bank') { const x = st.bank.find((y) => y.k === k); st.bank = st.bank.filter((y) => y.k !== k); st.placed.push(x); }
        if (act === 'unplace') { const x = st.placed.find((y) => y.k === k); st.placed = st.placed.filter((y) => y.k !== k); st.bank.push(x); }
        if (act === 'reset') { st.bank = U.shuffle(st.bank.concat(st.placed)); st.placed = []; }
        if (act === 'check') {
          st.done = true; lock(); root._draw();
          const ok = st.placed.map((x) => x.t).join(' ') === q.target;
          const slots = root.querySelector('#slots');
          if (ok) { earned += 1; slots.classList.add('ok'); fb('✅ Benar! +10 poin<br><small class="tr">' + esc(q.tr) + '</small>', true); }
          else { slots.classList.add('bad'); fb('💡 Susunan yang benar:<br><span class="ar big" lang="ar" dir="rtl">' + esc(q.target) + '</span><br><small class="tr">' + esc(q.tr) + '</small>', false); }
          say(q.say); addNext();
        } else root._draw();
      }

      if (act === 'ml' || act === 'mr') {
        const st = root._m;
        if (root.dataset.done || st.hit[k] !== undefined && b.classList.contains('ok')) return;
        if (act === 'ml') {
          st.sel = k;
          root.querySelectorAll('[data-g="ml"]').forEach((x) => x.classList.toggle('sel', Number(x.dataset.k) === k));
          say(q.pairs[k].say);
        } else if (st.sel !== null) {
          const L = root.querySelector(`[data-g="ml"][data-k="${st.sel}"]`);
          if (st.sel === k) {
            st.hit[k] = true;
            [L, b].forEach((x) => { x.classList.remove('sel'); x.classList.add('ok'); x.disabled = true; });
            st.sel = null;
            if (Object.keys(st.hit).length === q.pairs.length) {
              const got = Math.max(0, q.pairs.length - st.miss);
              earned += got; lock();
              fb(st.miss ? `🌟 Selesai! ${st.miss} kali salah, dapat ${got} dari ${q.pairs.length}.` : '✅ Sempurna! Semua pasangan benar.', !st.miss || got > 0);
              addNext();
            }
          } else {
            st.miss++;
            L.classList.add('shake'); b.classList.add('shake');
            setTimeout(() => { L.classList.remove('shake'); b.classList.remove('shake'); }, 450);
            fb('Belum cocok, coba pasangan lain.', false);
          }
        }
      }
    };

    start();
  }

  MG.Games = { TYPES, make, lessonQuiz, run, pools, stars };
})();
