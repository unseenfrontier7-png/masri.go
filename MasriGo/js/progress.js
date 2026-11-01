/* MasriGo — progress, gamification and small shared helpers.
   Everything is saved in localStorage so a refresh never loses progress. */
(function () {
  const MG = (window.MG = window.MG || {});

  // ---------- shared helpers ----------
  const U = (MG.util = {
    esc: (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])),
    shuffle: (a) => {
      const r = a.slice();
      for (let i = r.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [r[i], r[j]] = [r[j], r[i]];
      }
      return r;
    },
    sample: (a, n) => U.shuffle(a).slice(0, n)
  });

  const KEY = 'masrigo.progress.v1';
  const pad = (n) => String(n).padStart(2, '0');
  const dayStr = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const today = () => dayStr(new Date());
  const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dayStr(d); };

  const LEVELS = [
    { at: 0, name: 'Pemula Baru', emoji: '🌱' },
    { at: 100, name: 'Pencari Kata', emoji: '🌸' },
    { at: 250, name: 'Pembicara Kecil', emoji: '💬' },
    { at: 450, name: 'Teman Mesir', emoji: '🐪' },
    { at: 700, name: 'Bintang Masri', emoji: '🌟' },
    { at: 1000, name: 'Ratu Masri', emoji: '👑' }
  ];

  function fresh() {
    return {
      v: 1, points: 0, stars: 0, streak: 0, lastDay: null,
      lessons: {}, quiz: {}, badges: {}, known: {}, last: null,
      daily: { day: today(), points: 0, notified: false },
      stats: { games: 0, perfect: 0, goalDays: 0 },
      settings: { name: '', rate: 0.9, showTr: true, goal: 50, voice: '' }
    };
  }
  function merge(base, saved) {
    Object.keys(saved || {}).forEach((k) => {
      const b = base[k], s = saved[k];
      if (b && typeof b === 'object' && !Array.isArray(b) && s && typeof s === 'object') Object.assign(b, s);
      else base[k] = s;
    });
    return base;
  }

  let S;
  try {
    const raw = window.localStorage.getItem(KEY);
    S = raw ? merge(fresh(), JSON.parse(raw)) : fresh();
  } catch (e) { S = fresh(); }

  function save() {
    try { window.localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* private mode: keep in memory */ }
    if (MG.onProgress) MG.onProgress();
  }
  function rollDay() {
    if (S.daily.day !== today()) S.daily = { day: today(), points: 0, notified: false };
  }
  const toast = (m, o) => { if (MG.toast) MG.toast(m, o); };

  // ---------- badges ----------
  const doneCount = () => Object.keys(S.lessons).length;
  const knownCount = () => Object.keys(S.known).filter((k) => S.known[k]).length;
  const BADGES = [
    { id: 'first', icon: '👣', name: 'Langkah Pertama', desc: 'Selesaikan 1 pelajaran', test: () => doneCount() >= 1 },
    { id: 'three', icon: '🌸', name: 'Mekar Tiga', desc: 'Selesaikan 3 pelajaran', test: () => doneCount() >= 3 },
    { id: 'five', icon: '⭐', name: 'Separuh Jalan', desc: 'Selesaikan 5 pelajaran', test: () => doneCount() >= 5 },
    { id: 'ten', icon: '👑', name: 'Lulus Pemula', desc: 'Selesaikan semua 10 pelajaran', test: () => doneCount() >= 10 },
    { id: 'p100', icon: '💯', name: '100 Poin', desc: 'Kumpulkan 100 poin', test: () => S.points >= 100 },
    { id: 'p500', icon: '💎', name: '500 Poin', desc: 'Kumpulkan 500 poin', test: () => S.points >= 500 },
    { id: 'stars10', icon: '✨', name: 'Sepuluh Bintang', desc: 'Kumpulkan 10 bintang', test: () => S.stars >= 10 },
    { id: 'streak3', icon: '🔥', name: 'Api Kecil', desc: 'Belajar 3 hari berturut-turut', test: () => P.streak() >= 3 },
    { id: 'streak7', icon: '🌈', name: 'Seminggu Penuh', desc: 'Belajar 7 hari berturut-turut', test: () => P.streak() >= 7 },
    { id: 'perfect', icon: '🎯', name: 'Tepat Sasaran', desc: 'Raih nilai sempurna di sebuah game', test: () => S.stats.perfect >= 1 },
    { id: 'gamer', icon: '🎮', name: 'Gamer Cilik', desc: 'Selesaikan 10 game', test: () => S.stats.games >= 10 },
    { id: 'cards', icon: '🃏', name: 'Kolektor Kartu', desc: 'Kuasai 20 kartu kosakata', test: () => knownCount() >= 20 },
    { id: 'goal', icon: '🎁', name: 'Target Tercapai', desc: 'Capai target belajar harian', test: () => S.stats.goalDays >= 1 }
  ];
  function checkBadges() {
    BADGES.forEach((b) => {
      if (!S.badges[b.id] && b.test()) {
        S.badges[b.id] = Date.now();
        toast('Lencana baru: ' + b.name, { icon: b.icon, kind: 'badge', ms: 4500 });
      }
    });
  }

  // ---------- public API ----------
  const P = (MG.Progress = {
    get: () => S,
    save,
    levelInfo() {
      let i = 0;
      LEVELS.forEach((l, k) => { if (S.points >= l.at) i = k; });
      const cur = LEVELS[i], nxt = LEVELS[i + 1] || null;
      const pct = nxt ? Math.round(((S.points - cur.at) / (nxt.at - cur.at)) * 100) : 100;
      return { n: i + 1, name: cur.name, emoji: cur.emoji, next: nxt, pct, toNext: nxt ? nxt.at - S.points : 0 };
    },
    streak() { return S.lastDay === today() || S.lastDay === yesterday() ? S.streak : 0; },
    touch() {
      const t = today();
      if (S.lastDay === t) return;
      S.streak = S.lastDay === yesterday() ? S.streak + 1 : 1;
      S.lastDay = t;
    },
    addPoints(n, quiet) {
      if (!n) return;
      rollDay();
      const before = P.levelInfo().n;
      S.points += n;
      S.daily.points += n;
      P.touch();
      const after = P.levelInfo();
      if (after.n > before) toast('Naik level! Kamu sekarang ' + after.name, { icon: after.emoji, kind: 'badge', ms: 4500 });
      if (!S.daily.notified && S.daily.points >= S.settings.goal) {
        S.daily.notified = true;
        S.stats.goalDays++;
        toast('Target belajar hari ini tercapai!', { icon: '🎯', kind: 'badge', ms: 4500 });
      }
      checkBadges();
      save();
    },
    daily() { rollDay(); return { got: S.daily.points, goal: S.settings.goal, pct: Math.min(100, Math.round((S.daily.points / S.settings.goal) * 100)) }; },
    isDone: (id) => !!S.lessons[id],
    isUnlocked: (id) => id === 1 || !!S.lessons[id - 1],
    doneCount,
    lessonStars: (id) => (S.lessons[id] ? S.lessons[id].stars : 0),
    quizBest: (id) => (S.quiz[id] ? S.quiz[id].best : 0),
    quizPassed: (id) => !!(S.quiz[id] && S.quiz[id].passed),
    recordQuiz(id, pct) {
      const q = S.quiz[id] || { best: 0, passed: false };
      q.best = Math.max(q.best, pct);
      q.passed = q.passed || pct >= 0.6;
      S.quiz[id] = q;
      save();
    },
    recordGame(pct) {
      S.stats.games++;
      if (pct >= 0.999) S.stats.perfect++;
      if (pct >= 0.8) S.stars++;
      P.touch();
      checkBadges();
      save();
    },
    completeLesson(id, stars) {
      const first = !S.lessons[id];
      const prev = first ? 0 : S.lessons[id].stars;
      if (stars > prev) S.stars += stars - prev;
      S.lessons[id] = { stars: Math.max(prev, stars), at: Date.now() };
      if (first) {
        toast('Pelajaran ' + id + ' selesai! +20 poin bonus', { icon: '🎉', kind: 'badge', ms: 4000 });
        P.addPoints(20);
      } else { checkBadges(); save(); }
    },
    setLast(id, step) { S.last = { id, step }; save(); },
    setKnown(key, v) { if (v) S.known[key] = true; else delete S.known[key]; P.touch(); checkBadges(); save(); },
    isKnown: (key) => !!S.known[key],
    knownCount,
    set(k, v) { S.settings[k] = v; save(); },
    badges: () => BADGES.map((b) => ({ id: b.id, icon: b.icon, name: b.name, desc: b.desc, at: S.badges[b.id] || 0 })),
    reset() { S = fresh(); save(); }
  });
})();
