/* MasriGo — app shell: hash router, the 8 pages and all button actions. */
(function () {
  const MG = window.MG, P = MG.Progress, A = MG.Audio, G = MG.Games, U = MG.util, L = MG.LESSONS, esc = U.esc;
  const view = document.getElementById('view');
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const go = (h) => { if (location.hash === h) route(); else location.hash = h; };
  const short = (l) => l.title.id.split(':')[0];
  const unlockedIds = () => L.filter((l) => P.isUnlocked(l.id)).map((l) => l.id);

  // ---------- toast ----------
  MG.toast = function (msg, o) {
    o = o || {};
    const box = document.getElementById('toasts');
    const t = document.createElement('div');
    t.className = 'toast ' + (o.kind || '');
    t.innerHTML = `<span class="ti">${o.icon || '✨'}</span><p>${esc(msg)}</p>`;
    box.appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 400); }, o.ms || 3200);
  };

  // ---------- small builders ----------
  const aud = (t, mic) => `<span class="auds"><button class="aud" data-say="${esc(t)}" aria-label="Putar suara">🔊</button><button class="aud" data-say="${esc(t)}" data-slow="1" aria-label="Putar pelan">🐢</button>${mic && A.canListen ? `<button class="aud mic" data-mic="${esc(t)}" aria-label="Latihan berbicara">🎤</button>` : ''}</span>`;
  const starsRow = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);
  const bubbles = (l, mic) => l.dialogue.map((x) => `<div class="bub ${x.w === 'B' ? 'me' : 'them'}" data-micbox><span class="who">${x.w === 'B' ? 'Kamu' : esc(l.partner)}</span><div class="ar" lang="ar" dir="rtl">${esc(x.ar)}</div><div class="tr">${esc(x.tr)}</div><div class="id">${esc(x.id)}</div>${aud(x.ar, mic && x.w === 'B')}</div>`).join('');

  function mapHtml() {
    const off = [0, 24, 44, 24, 0, 24, 44, 24, 0, 24];
    const cur = L.find((l) => P.isUnlocked(l.id) && !P.isDone(l.id));
    return '<ol class="map">' + L.map((l, i) => {
      const done = P.isDone(l.id), open = P.isUnlocked(l.id), isCur = cur && cur.id === l.id;
      const cls = done ? 'done' : isCur ? 'current' : open ? 'open' : 'locked';
      return `<li style="--x:${off[i]}%"><a class="node ${cls}" href="${open ? '#/lesson/' + l.id + '/words' : '#/map'}" ${open ? '' : `data-locked="${l.id}"`} aria-label="Pelajaran ${l.id}: ${esc(short(l))}${open ? '' : ' (terkunci)'}"><span class="orb">${open ? l.emoji : '🔒'}</span><span class="nt"><b>${l.id}. ${esc(short(l))}</b><span class="ar" lang="ar" dir="rtl">${l.title.ar}</span>${done ? `<i class="starsrow" aria-label="${P.lessonStars(l.id)} bintang">${starsRow(P.lessonStars(l.id))}</i>` : ''}</span></a></li>`;
    }).join('') + '</ol>';
  }

  // ---------- pages ----------
  function pageHome() {
    const s = P.get(), lv = P.levelInfo(), d = P.daily(), st = P.streak(), nm = s.settings.name.trim();
    const next = L.find((l) => P.isUnlocked(l.id) && !P.isDone(l.id));
    const resume = next && s.last && s.last.id === next.id ? s.last.step : 'words';
    return `<section class="hero card lav"><img class="mascot bob" src="assets/images/mascot.svg" alt="Maskot MasriGo, piramida yang tersenyum"><div class="herotxt"><h1 class="ar-h" lang="ar" dir="rtl">أهلاً بيكي${nm ? ' يا <span dir="auto">' + esc(nm) + '</span>' : ''}! 🌸</h1><p class="lead">Halo${nm ? ', ' + esc(nm) : ''}! Siap belajar bahasa Arab Mesir hari ini?</p>${next ? `<a class="btn primary big" href="#/lesson/${next.id}/${resume}">▶ Lanjut belajar<small>Pelajaran ${next.id}: ${esc(short(next))}</small></a>` : '<p class="lead">🎉 Kamu sudah menamatkan semua pelajaran!</p><a class="btn primary big" href="#/games">🎮 Main game</a>'}</div></section>
    <section class="stats" aria-label="Statistik belajar">
      <div class="stat peach"><b>${s.points}</b><span>⭐ Poin</span></div>
      <div class="stat pink"><b>${s.stars}</b><span>🌟 Bintang</span></div>
      <div class="stat mint"><b>${P.doneCount()}/10</b><span>✅ Pelajaran selesai</span></div>
      <div class="stat lav"><b>${st}</b><span>🔥 Hari beruntun</span></div>
    </section>
    <section class="grid2">
      <div class="card"><h2>${lv.emoji} Level ${lv.n}: ${lv.name}</h2><div class="bar"><i style="width:${lv.pct}%"></i></div><p class="muted">${lv.next ? lv.toNext + ' poin lagi menuju ' + lv.next.name : 'Level tertinggi tercapai!'}</p></div>
      <div class="card"><h2>🎯 Target hari ini</h2><div class="bar"><i style="width:${d.pct}%"></i></div><p class="muted">${Math.min(d.got, d.goal)} dari ${d.goal} poin${d.pct >= 100 ? ' · tercapai! 🎉' : ''}</p></div>
    </section>
    <section><h2 class="sec">🗺️ Peta pelajaran</h2>${mapHtml()}</section>`;
  }

  function pageMap() { return `<h1>🗺️ Peta Pelajaran</h1><p class="muted">Selesaikan pelajaran satu per satu untuk membuka yang berikutnya.</p>${mapHtml()}`; }

  const STEPS = [['words', 'Kata', '🔤'], ['sentences', 'Kalimat', '💬'], ['dialogue', 'Dialog', '🗣️'], ['explain', 'Penjelasan', '📖'], ['quiz', 'Kuis', '📝'], ['game', 'Game', '🎮']];

  function pageLesson(id, step) {
    const l = L[id - 1];
    if (!l) return redirect('#/map');
    if (!P.isUnlocked(id)) { MG.toast('Selesaikan pelajaran ' + (id - 1) + ' dulu ya', { icon: '🔒' }); return redirect('#/map'); }
    if (!STEPS.some((s) => s[0] === step) && step !== 'done') step = 'words';
    if (step === 'game' && !P.quizPassed(id)) { MG.toast('Lulus kuis dulu (minimal 3 dari 5) untuk membuka game', { icon: '🔒' }); return redirect(`#/lesson/${id}/quiz`); }
    if (step === 'done' && !P.isDone(id)) return redirect(`#/lesson/${id}/words`);
    P.setLast(id, step === 'done' ? 'words' : step);
    const idx = STEPS.findIndex((s) => s[0] === step);
    const tabs = STEPS.map(([k, n, e]) => { const lk = k === 'game' && !P.quizPassed(id); return `<a class="tab ${step === k ? 'on' : ''} ${lk ? 'lock' : ''}" href="#/lesson/${id}/${k}" ${step === k ? 'aria-current="step"' : ''}><span>${lk ? '🔒' : e}</span>${n}</a>`; }).join('');
    let body = '', post = null;

    if (step === 'words') {
      body = `<div class="card goals"><h2>🎯 Tujuan belajar</h2><ul>${l.goals.map((g) => `<li>${esc(g)}</li>`).join('')}</ul></div><div class="words">${l.vocab.map((v) => `<div class="word card" data-micbox><div class="wem" aria-hidden="true">${v.e}</div><div class="wtxt"><div class="ar" lang="ar" dir="rtl">${esc(v.ar)}</div><div class="tr">${esc(v.tr)}</div><div class="id">${esc(v.id)}</div></div>${aud(v.say, true)}</div>`).join('')}</div>`;
    } else if (step === 'sentences') {
      body = `<div class="sents">${l.sentences.map((s) => `<div class="sent card" data-micbox><div class="ar" lang="ar" dir="rtl">${esc(s.ar)}</div><div class="tr">${esc(s.tr)}</div><div class="id">${esc(s.id)}</div>${aud(s.ar, true)}</div>`).join('')}</div>`;
    } else if (step === 'dialogue') {
      body = `<div class="card"><div class="row"><button class="btn soft" data-act="playall" data-id="${id}">▶ Putar semua</button><button class="btn soft" data-act="playall" data-id="${id}" data-slow="1">🐢 Putar pelan</button><button class="btn ghost" data-act="toggleid">🇮🇩 Terjemahan</button></div><div class="chat" id="chat">${bubbles(l, true)}</div></div><a class="btn mint" href="#/conversation/${id}/practice">🎭 Latihan peran dengan dialog ini</a>`;
    } else if (step === 'explain') {
      body = `<div class="card prose">${l.explain}</div><div class="card tip"><h2>💡 Tips pengucapan</h2><p>${l.tip}</p></div>`;
    } else if (step === 'quiz') {
      const best = P.quizBest(id);
      body = `<div id="stage"><div class="card center"><img class="mascot sm" src="assets/images/mascot.svg" alt=""><h2>📝 Kuis Pelajaran ${id}</h2><p>5 pertanyaan: arti kata, kata Arab, mendengar, dan percakapan.<br>Jawab benar minimal 3 untuk membuka mini-game.</p>${best ? `<p class="muted">Nilai terbaikmu: ${Math.round(best * 5)} dari 5</p>` : ''}<button class="btn primary big" data-act="startquiz" data-id="${id}">Mulai kuis</button></div></div>`;
    } else if (step === 'game') {
      const t = G.TYPES[l.game];
      body = `<div id="stage"><div class="card center"><div class="gem">${t.emoji}</div><h2>Mini-game: ${t.name}</h2><p>${t.desc}</p><button class="btn primary big" data-act="startgame" data-id="${id}">Mulai game</button></div></div>`;
    } else if (step === 'done') {
      const n = P.lessonStars(id);
      body = `<div class="card done"><img class="mascot" src="assets/images/mascot.svg" alt=""><h2>Pelajaran ${id} selesai! 🎉</h2><div class="stars big" aria-label="${n} dari 3 bintang">${[1, 2, 3].map((k) => `<span class="${k <= n ? 'on' : ''}" style="--d:${k * 0.18}s">★</span>`).join('')}</div><p>Kamu mempelajari ${l.vocab.length} kata baru dan ${l.sentences.length} kalimat.</p><div class="row center">${id < L.length ? `<a class="btn primary big" href="#/lesson/${id + 1}/words">Pelajaran ${id + 1} ➜</a>` : '<a class="btn primary big" href="#/achievements">🏆 Lihat prestasi</a>'}<a class="btn soft" href="#/lesson/${id}/words">🔁 Ulangi pelajaran</a><a class="btn ghost" href="#/map">🗺️ Peta</a></div></div>`;
    }
    const pager = step !== 'done' && idx < 3 ? `<div class="row between pager">${idx > 0 ? `<a class="btn ghost" href="#/lesson/${id}/${STEPS[idx - 1][0]}">⬅ ${STEPS[idx - 1][1]}</a>` : '<span></span>'}<a class="btn primary" href="#/lesson/${id}/${STEPS[idx + 1][0]}">${STEPS[idx + 1][1]} ➜</a></div>` : step === 'explain' ? '' : '';
    const pager2 = step === 'explain' ? `<div class="row between pager"><a class="btn ghost" href="#/lesson/${id}/dialogue">⬅ Dialog</a><a class="btn primary" href="#/lesson/${id}/quiz">Kuis ➜</a></div>` : '';
    return {
      html: `<div class="lhead"><a class="btn ghost small" href="#/map">← Peta</a><div><h1>${l.emoji} Pelajaran ${id}: ${esc(l.title.id)}</h1><p class="ar" lang="ar" dir="rtl">${l.title.ar}</p></div></div>${step === 'done' ? '' : `<nav class="tabs" aria-label="Langkah pelajaran">${tabs}</nav>`}${body}${pager}${pager2}`, post
    };
  }

  function startQuiz(id) {
    G.run($('#stage'), {
      title: 'Kuis selesai', countGame: false,
      make: () => G.lessonQuiz(id),
      onFinish: (r) => { P.recordQuiz(id, r.pct); if (r.pct < 0.6) MG.toast('Butuh minimal 3 benar. Pelajari lagi lalu coba ya!', { icon: '📖' }); },
      after: (pct) => (pct >= 0.6 ? [{ label: '🎮 Lanjut ke mini-game', cls: 'primary', run: () => go(`#/lesson/${id}/game`) }] : [{ label: '📖 Pelajari lagi', run: () => go(`#/lesson/${id}/words`) }]),
      onExit: () => route()
    });
  }
  function startLessonGame(id) {
    const t = L[id - 1].game;
    G.run($('#stage'), {
      title: G.TYPES[t].name + ' selesai',
      make: () => G.make(t, [id], 5),
      onFinish: (r) => { const avg = (P.quizBest(id) + r.pct) / 2; P.completeLesson(id, avg >= 0.9 ? 3 : avg >= 0.7 ? 2 : 1); },
      after: () => [{ label: '🏁 Hasil pelajaran', cls: 'primary', run: () => go(`#/lesson/${id}/done`) }],
      onExit: () => route()
    });
  }

  // games center
  let gscope = 'all';
  function pageGames() {
    const ul = L.filter((l) => P.isUnlocked(l.id));
    return `<h1>🎮 Pusat Game</h1><div class="card"><label class="field">Kata diambil dari<select id="scope">${'<option value="all">Semua pelajaran yang terbuka (' + ul.length + ')</option>'}${ul.map((l) => `<option value="${l.id}" ${String(gscope) === String(l.id) ? 'selected' : ''}>Pelajaran ${l.id}: ${esc(short(l))}</option>`).join('')}</select></label></div><div id="gstage"><div class="gamegrid">${Object.keys(G.TYPES).map((k) => { const t = G.TYPES[k]; return `<article class="card game ${t.color}"><div class="gem">${t.emoji}</div><h2>Game ${t.key}: ${t.name}</h2><p>${t.desc}</p><button class="btn primary" data-act="playgame" data-type="${k}">Main</button></article>`; }).join('')}</div></div>`;
  }
  function playGame(type) {
    gscope = $('#scope').value;
    const ids = gscope === 'all' ? unlockedIds() : [Number(gscope)];
    $('#scope').closest('.card').hidden = true;
    G.run($('#gstage'), { title: G.TYPES[type].name + ' selesai', make: () => G.make(type, ids), onExit: () => route() });
  }

  // flashcards
  const fc = { scope: 'all', idx: 0, flip: false, onlyNew: false, deck: [], init: false };
  function buildDeck(shuffle) {
    const ids = fc.scope === 'all' ? unlockedIds() : [Number(fc.scope)];
    let d = G.pools(ids).vocab;
    if (fc.onlyNew) d = d.filter((v) => !P.isKnown(v.key));
    fc.deck = shuffle ? U.shuffle(d) : d; fc.idx = 0; fc.flip = false;
  }
  function pageFlash() {
    buildDeck(false);
    const ul = L.filter((l) => P.isUnlocked(l.id));
    return `<h1>🃏 Kartu Kosakata</h1><div class="card row"><label class="field">Deck<select id="fcscope"><option value="all" ${fc.scope === 'all' ? 'selected' : ''}>Semua pelajaran terbuka</option>${ul.map((l) => `<option value="${l.id}" ${String(fc.scope) === String(l.id) ? 'selected' : ''}>Pelajaran ${l.id}: ${esc(short(l))}</option>`).join('')}</select></label><label class="check"><input type="checkbox" id="fcnew" ${fc.onlyNew ? 'checked' : ''}> Hanya yang belum dikuasai</label><button class="btn soft" data-act="fcshuffle">🔀 Acak</button></div><div id="fcbox"></div>`;
  }
  function drawCard() {
    const box = $('#fcbox'); if (!box) return;
    if (!fc.deck.length) { box.innerHTML = '<div class="card center"><p>🎉 Semua kartu di deck ini sudah kamu kuasai! Matikan filter untuk mengulang.</p></div>'; return; }
    fc.idx = (fc.idx + fc.deck.length) % fc.deck.length;
    const v = fc.deck[fc.idx], known = P.isKnown(v.key);
    box.innerHTML = `<p class="muted center">Kartu ${fc.idx + 1} dari ${fc.deck.length} · dikuasai: ${P.knownCount()}</p><button class="flip ${fc.flip ? 'flipped' : ''}" data-act="flip" aria-label="Balik kartu"><span class="inner"><span class="face front"><span class="wem">${v.e}</span><span class="ar xl" lang="ar" dir="rtl">${esc(v.ar)}</span><small>Ketuk untuk melihat arti</small></span><span class="face back"><span class="tr big">${esc(v.tr)}</span><span class="idm">${esc(v.id)}</span><small>Pelajaran ${v.lesson}</small></span></span></button><div class="row center" data-micbox>${aud(v.say, true)}</div><div class="row center"><button class="btn ghost" data-act="fcprev" aria-label="Kartu sebelumnya">⬅</button><button class="btn ${known ? 'mint' : 'soft'}" data-act="fcknown">${known ? '✅ Sudah kuasai' : 'Aku sudah tahu'}</button><button class="btn ghost" data-act="fcnext" aria-label="Kartu berikutnya">➡</button></div>`;
  }

  // conversation practice
  const cp = { id: 1, i: 0, score: 0, total: 0, first: true };
  function pageConvo(id, mode) {
    if (!id) {
      return `<h1>🗣️ Percakapan</h1><p class="muted">Dengarkan dialog atau berlatih memerankan dirimu.</p><div class="convlist">${L.map((l) => { const o = P.isUnlocked(l.id); return `<article class="card conv ${o ? '' : 'locked'}"><div class="gem">${o ? l.emoji : '🔒'}</div><div><h2>${l.id}. ${esc(short(l))}</h2><p class="ar" lang="ar" dir="rtl">${esc(l.dialogue[0].ar)}</p></div>${o ? `<div class="row"><a class="btn soft small" href="#/conversation/${l.id}">🎧 Dengar</a><a class="btn primary small" href="#/conversation/${l.id}/practice">🎭 Latihan</a></div>` : '<span class="muted">Terkunci</span>'}</article>`; }).join('')}</div>`;
    }
    const l = L[id - 1];
    if (!l || !P.isUnlocked(id)) { MG.toast('Percakapan ini belum terbuka', { icon: '🔒' }); return redirect('#/conversation'); }
    const head = `<div class="lhead"><a class="btn ghost small" href="#/conversation">← Daftar</a><div><h1>${l.emoji} ${esc(short(l))}</h1><p class="muted">Lawan bicara: ${esc(l.partner)}</p></div></div><nav class="tabs"><a class="tab ${mode !== 'practice' ? 'on' : ''}" href="#/conversation/${id}"><span>🎧</span>Dengar</a><a class="tab ${mode === 'practice' ? 'on' : ''}" href="#/conversation/${id}/practice"><span>🎭</span>Latihan peran</a></nav>`;
    if (mode === 'practice') return { html: head + '<div id="cbox"></div>', post: () => { Object.assign(cp, { id, i: 0, score: 0, total: l.dialogue.filter((x) => x.w === 'B').length, first: true }); drawPractice(); } };
    return `${head}<div class="card"><div class="row"><button class="btn soft" data-act="playall" data-id="${id}">▶ Putar semua</button><button class="btn soft" data-act="playall" data-id="${id}" data-slow="1">🐢 Putar pelan</button><button class="btn ghost" data-act="toggleid">🇮🇩 Terjemahan</button></div><div class="chat" id="chat">${bubbles(l, true)}</div></div>`;
  }
  function drawPractice() {
    const box = $('#cbox'); if (!box) return;
    const l = L[cp.id - 1], lines = l.dialogue;
    while (cp.i < lines.length && lines[cp.i].w === 'A') cp.i++;
    const shown = lines.slice(0, cp.i).map((x) => `<div class="bub ${x.w === 'B' ? 'me' : 'them'}"><span class="who">${x.w === 'B' ? 'Kamu' : esc(l.partner)}</span><div class="ar" lang="ar" dir="rtl">${esc(x.ar)}</div><div class="tr">${esc(x.tr)}</div><div class="id">${esc(x.id)}</div></div>`).join('');
    if (cp.i >= lines.length) {
      const pts = cp.score * 5; P.addPoints(pts); P.touch(); P.save();
      box.innerHTML = `<div class="card"><div class="chat">${shown}</div></div><div class="card done"><img class="mascot" src="assets/images/mascot.svg" alt=""><h2>Percakapan selesai! 🎭</h2><p class="score">Benar di percobaan pertama: <b>${cp.score}</b> dari <b>${cp.total}</b> · +${pts} poin</p><div class="row center"><a class="btn primary" href="#/conversation/${cp.id}/practice" data-act="again-practice">🔁 Ulangi</a><a class="btn ghost" href="#/conversation">Pilih percakapan lain</a></div></div>`;
      return;
    }
    const cur = lines[cp.i];
    const others = U.sample(L.reduce((a, x) => a.concat(x.dialogue.filter((d) => d.w === 'B' && d.ar !== cur.ar)), []), 2);
    cp.opts = U.shuffle([cur].concat(others));
    cp.cur = cur;
    const partnerLine = cp.i > 0 ? lines[cp.i - 1] : null;
    box.innerHTML = `<div class="card"><div class="chat" id="chat">${shown}<div class="bub me blank"><div class="ar" dir="rtl">؟؟؟</div></div></div><p class="ask">Kamu giliran bicara. Pilih ucapan yang pas:</p><div class="opts">${cp.opts.map((o, k) => `<button class="opt ar-opt" data-act="cpick" data-k="${k}"><span class="ar" lang="ar" dir="rtl">${esc(o.ar)}</span><small class="tr">${esc(o.tr)}</small></button>`).join('')}</div><div class="fb" id="fb" aria-live="polite"></div></div>`;
    if (partnerLine && partnerLine.w === 'A') A.speak(partnerLine.ar);
  }

  function pageAchievements() {
    const s = P.get(), lv = P.levelInfo(), b = P.badges(), got = b.filter((x) => x.at).length;
    return `<h1>🏆 Prestasi</h1><section class="stats"><div class="stat peach"><b>${s.points}</b><span>⭐ Poin</span></div><div class="stat pink"><b>${s.stars}</b><span>🌟 Bintang</span></div><div class="stat mint"><b>${lv.n}</b><span>${lv.emoji} Level: ${lv.name}</span></div><div class="stat lav"><b>${P.streak()}</b><span>🔥 Hari beruntun</span></div></section><h2 class="sec">Lencana (${got}/${b.length})</h2><div class="badges">${b.map((x) => `<article class="badge ${x.at ? 'on' : ''}"><div class="bi" aria-hidden="true">${x.at ? x.icon : '🔒'}</div><b>${esc(x.name)}</b><span>${esc(x.desc)}</span>${x.at ? `<em>${new Date(x.at).toLocaleDateString('id-ID')}</em>` : ''}</article>`).join('')}</div>`;
  }

  function pageSettings() {
    const s = P.get().settings, st = A.status(), vs = A.voices();
    const voiceMsg = !st.supported ? '❌ Browser-mu tidak mendukung suara. Gunakan Chrome, Edge, atau Safari.' : st.arabic ? `✅ Ditemukan ${st.arabic} suara Arab di perangkatmu.` : '⚠️ Belum ada suara Arab di perangkat ini, jadi pengucapan mungkin terdengar salah atau tidak keluar. Pasang suara Arab: Android → Setelan → Bahasa → Output text-to-speech; Windows → Pengaturan → Waktu & Bahasa → Ucapan → Tambah suara; iPhone/Mac → Pengaturan → Aksesibilitas → Konten yang Diucapkan → Suara.';
    return `<h1>⚙️ Pengaturan</h1><div class="card form"><label class="field">Nama panggilanmu<input id="setName" maxlength="20" value="${esc(s.name)}" placeholder="Contoh: Sara"></label><label class="field">Kecepatan suara normal<select id="setRate"><option value="0.9" ${s.rate == 0.9 ? 'selected' : ''}>Normal</option><option value="0.75" ${s.rate == 0.75 ? 'selected' : ''}>Agak pelan</option><option value="1" ${s.rate == 1 ? 'selected' : ''}>Cepat</option></select></label><label class="field">Target belajar harian<select id="setGoal">${[30, 50, 100].map((g) => `<option value="${g}" ${s.goal == g ? 'selected' : ''}>${g} poin</option>`).join('')}</select></label><label class="check"><input type="checkbox" id="setTr" ${s.showTr ? 'checked' : ''}> Tampilkan transliterasi Latin</label></div>
    <div class="card form"><h2>🔊 Suara</h2><p>${voiceMsg}</p>${vs.length ? `<label class="field">Pilih suara<select id="setVoice"><option value="">Otomatis (utamakan Mesir)</option>${vs.map((v) => `<option value="${esc(v.name)}" ${s.voice === v.name ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')}</select></label>` : ''}<div class="row"><button class="btn soft" data-act="testvoice">🔊 Tes suara</button><button class="btn ghost" data-act="refresh">↻ Segarkan daftar suara</button></div><p class="muted">${A.canListen ? 'Latihan berbicara 🎤 tersedia di browser ini. Hasilnya hanya perkiraan dan membutuhkan izin mikrofon.' : 'Latihan berbicara 🎤 tidak tersedia di browser ini, jadi tombolnya disembunyikan.'}</p></div>
    <div class="card form"><h2>🗑️ Data</h2><p class="muted">Progresmu tersimpan di browser ini saja.</p><button class="btn danger" data-act="reset">Hapus semua progres</button></div>`;
  }

  // ---------- router ----------
  function redirect(h) { setTimeout(() => go(h), 0); return { html: '', post: null }; }
  function render(r) {
    if (typeof r === 'string') r = { html: r };
    view.innerHTML = r.html;
    if (r.post) r.post();
    view.focus({ preventScroll: true });
  }
  function route() {
    A.stop();
    const parts = location.hash.replace(/^#\/?/, '').split('/');
    const page = parts[0] || 'home';
    document.body.classList.toggle('hide-tr', !P.get().settings.showTr);
    $$('#mainNav a').forEach((a) => { const on = a.dataset.page === page; a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    switch (page) {
      case 'home': render(pageHome()); break;
      case 'map': render(pageMap()); break;
      case 'lesson': render(pageLesson(Number(parts[1]), parts[2] || 'words')); break;
      case 'games': render(pageGames()); break;
      case 'flashcards': render({ html: pageFlash(), post: drawCard }); break;
      case 'conversation': render(pageConvo(Number(parts[1]) || 0, parts[2])); break;
      case 'achievements': render(pageAchievements()); break;
      case 'settings': render(pageSettings()); break;
      default: location.hash = '#/home'; return;
    }
    window.scrollTo(0, 0);
    updateHud();
  }
  function updateHud() {
    const h = document.getElementById('hud');
    if (h) h.innerHTML = `<span title="Poin">⭐ ${P.get().points}</span><span title="Hari beruntun">🔥 ${P.streak()}</span>`;
  }
  MG.onProgress = updateHud;

  // ---------- events ----------
  document.addEventListener('click', (e) => {
    const sy = e.target.closest('[data-say]');
    if (sy) { A.speak(sy.dataset.say, { slow: !!sy.dataset.slow }); return; }
    const lk = e.target.closest('[data-locked]');
    if (lk) { e.preventDefault(); MG.toast('Selesaikan pelajaran ' + (Number(lk.dataset.locked) - 1) + ' dulu ya', { icon: '🔒' }); return; }
    const mic = e.target.closest('[data-mic]');
    if (mic) return doMic(mic);
    const b = e.target.closest('[data-act]');
    if (b) act(b, e);
  });

  function doMic(btn) {
    const box = btn.closest('[data-micbox]') || btn.parentElement;
    let r = box.querySelector('.micres');
    if (!r) { r = document.createElement('div'); r.className = 'micres'; box.appendChild(r); }
    btn.classList.add('rec');
    r.textContent = '🎙️ Mendengarkan… ucapkan sekarang';
    A.listen(btn.dataset.mic, (res) => {
      btn.classList.remove('rec');
      if (!res.ok) {
        r.textContent = res.error === 'not-allowed' || res.error === 'service-not-allowed' ? 'Izin mikrofon ditolak. Aktifkan mikrofon untuk situs ini di pengaturan browser.' : res.error === 'no-speech' ? 'Tidak ada suara terdengar. Coba lagi lebih dekat ke mikrofon.' : 'Pengenalan suara belum bisa dipakai sekarang (' + res.error + ').';
        return;
      }
      const ok = res.score >= 0.7;
      r.innerHTML = (ok ? '✅ Bagus! ' : '🔁 Coba lagi. ') + 'Terdengar: <span class="ar" lang="ar" dir="rtl">' + esc(res.heard) + '</span> <small>(perkiraan)</small>';
      if (ok) P.addPoints(2);
    });
  }

  function act(b, e) {
    const a = b.dataset.act, id = Number(b.dataset.id);
    switch (a) {
      case 'startquiz': startQuiz(id); break;
      case 'startgame': startLessonGame(id); break;
      case 'playgame': playGame(b.dataset.type); break;
      case 'toggleid': { const c = $('#chat'); if (c) c.classList.toggle('hide-id'); break; }
      case 'playall': {
        const l = L[id - 1], items = $$('#chat .bub');
        A.sequence(l.dialogue.map((x) => x.ar), { slow: !!b.dataset.slow, onstep: (i) => items.forEach((x, k) => x.classList.toggle('speaking', k === i)), ondone: () => items.forEach((x) => x.classList.remove('speaking')) });
        break;
      }
      case 'flip': fc.flip = !fc.flip; $('.flip').classList.toggle('flipped', fc.flip); if (fc.flip) A.speak(fc.deck[fc.idx].say); break;
      case 'fcnext': fc.idx++; fc.flip = false; drawCard(); break;
      case 'fcprev': fc.idx--; fc.flip = false; drawCard(); break;
      case 'fcknown': { const v = fc.deck[fc.idx], now = !P.isKnown(v.key); P.setKnown(v.key, now); if (now) { fc.idx++; fc.flip = false; MG.toast('Kartu dikuasai!', { icon: '✅', ms: 1500 }); } drawCard(); break; }
      case 'fcshuffle': buildDeck(true); drawCard(); break;
      case 'cpick': {
        const o = cp.opts[Number(b.dataset.k)], fbx = $('#fb');
        if (o.ar === cp.cur.ar) {
          if (cp.first) cp.score++;
          cp.first = true; A.speak(cp.cur.ar); cp.i++;
          fbx.className = 'fb ok'; fbx.textContent = '✅ Tepat!';
          setTimeout(drawPractice, 700);
          $$('.opt').forEach((x) => { x.disabled = true; });
        } else {
          cp.first = false; b.disabled = true; b.classList.add('bad', 'shake');
          fbx.className = 'fb bad'; fbx.textContent = 'Belum pas. Coba pilihan lain.';
        }
        break;
      }
      case 'again-practice': e.preventDefault(); { const l = L[cp.id - 1]; Object.assign(cp, { i: 0, score: 0, total: l.dialogue.filter((x) => x.w === 'B').length, first: true }); drawPractice(); } break;
      case 'testvoice': A.speak('أهلاً بيكي، إزّيّك؟'); break;
      case 'refresh': A.voices(); setTimeout(route, 300); break;
      case 'reset': if (window.confirm('Hapus semua progres belajarmu? Ini tidak bisa dibatalkan.')) { P.reset(); MG.toast('Progres dihapus. Mulai dari awal ya!', { icon: '🌱' }); go('#/home'); } break;
    }
  }

  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t.id === 'setName') P.set('name', t.value.trim());
    if (t.id === 'setRate') P.set('rate', Number(t.value));
    if (t.id === 'setGoal') P.set('goal', Number(t.value));
    if (t.id === 'setVoice') P.set('voice', t.value);
    if (t.id === 'setTr') { P.set('showTr', t.checked); document.body.classList.toggle('hide-tr', !t.checked); }
    if (t.id === 'scope') gscope = t.value;
    if (t.id === 'fcscope') { fc.scope = t.value; buildDeck(false); drawCard(); }
    if (t.id === 'fcnew') { fc.onlyNew = t.checked; buildDeck(false); drawCard(); }
  });

  document.getElementById('repeatBtn').addEventListener('click', () => A.repeat());
  window.addEventListener('hashchange', route);
  route();
})();
