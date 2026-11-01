# MasriGo 🇪🇬🌸

Game belajar **bahasa Arab Mesir (Masri)** untuk pemula dari Indonesia.
10 pelajaran, 5 game, kartu kosakata, latihan percakapan, lencana, dan streak harian.
Dibuat dengan HTML, CSS, dan JavaScript murni. Tanpa backend, database, login, atau API berbayar.

## Cara menjalankan

**Paling mudah:** buka `index.html` dengan dobel-klik (Chrome, Edge, atau Safari).

**Lebih stabil (disarankan):** jalankan server lokal sederhana lalu buka alamatnya.

```bash
cd MasriGo
python3 -m http.server 8000
# buka http://localhost:8000
```

Internet hanya dipakai untuk memuat font (Baloo 2, Nunito, Cairo). Tanpa internet, aplikasi tetap berjalan dengan font bawaan perangkat.

## Suara / pengucapan

- Suara memakai **Web Speech API** bawaan browser, jadi kualitasnya bergantung pada suara Arab yang terpasang di perangkat. Aplikasi mencari suara `ar-EG` (Mesir) lebih dulu, lalu suara Arab lain.
- Jika perangkat belum punya suara Arab, aplikasi memberi tahu dan **Pengaturan** menjelaskan cara memasangnya (Android, Windows, iPhone/Mac).
- Tombol 🔊 normal, 🐢 pelan, dan 🔁 ulangi suara tersedia untuk setiap kata, kalimat, dan dialog.
- Tombol 🎤 (latihan berbicara) **hanya muncul jika browser mendukung pengenalan suara** (umumnya Chrome/Edge). Hasilnya perkiraan dan perlu izin mikrofon. Tidak ada fitur palsu.

## Struktur proyek

```
MasriGo/
  index.html
  css/style.css
  js/
    lessons.js    isi 10 pelajaran (kata, kalimat, dialog, penjelasan, soal)
    audio.js      suara (speech synthesis) + pengenalan suara opsional
    progress.js   localStorage, poin, bintang, level, streak, lencana, target harian
    games.js      5 game + mesin permainan (juga dipakai kuis pelajaran)
    app.js        router, 8 halaman, semua aksi tombol
  assets/images/mascot.svg
  assets/icons/favicon.svg, star.svg
  README.md
```

## Fitur

- **8 halaman:** Beranda, Peta Pelajaran, Detail Pelajaran, Pusat Game, Kartu Kosakata, Percakapan, Prestasi, Pengaturan.
- **10 pelajaran** (sapaan, perkenalan, kata ganti, angka & umur, keluarga, makanan, rumah & aktivitas, perasaan, pertanyaan, percakapan lengkap). Tiap pelajaran: tujuan belajar, 7-8 kata (tulisan Arab, transliterasi Latin, arti Indonesia, audio), 4 contoh kalimat, dialog, penjelasan Indonesia + tips pengucapan, kuis 5 soal, mini-game, layar selesai.
- **Bahasa Mesir asli**, bukan Arab baku. Bentuk perempuan dipakai untuk si pelajar (mis. `كويسة`, `عايزة`, `إنتِ`), dengan catatan bentuk laki-lakinya.
- **5 game:** A Pilih Artinya, B Pasangkan Kata, C Dengar & Pilih, D Susun Kalimat, E Lengkapi Percakapan. Semuanya memberi umpan balik langsung, poin (10 per jawaban benar), jawaban benar ditampilkan, bisa diulang, dan punya layar hasil.
- **Gamifikasi:** poin, bintang, 6 level, streak harian, 13 lencana, target harian (30/50/100 poin), bar progres, notifikasi prestasi, pelajaran terbuka berurutan.
- **Kuis:** minimal 3 dari 5 benar untuk membuka mini-game. Menyelesaikan mini-game menamatkan pelajaran.
- **Progres tersimpan** di `localStorage` (kunci `masrigo.progress.v1`). Refresh tidak menghilangkan progres. Tombol hapus ada di Pengaturan.
- **Responsif**, mobile-first (navigasi bawah di ponsel), mendukung RTL untuk teks Arab dan LTR untuk Indonesia, mengikuti `prefers-reduced-motion`.

## Catatan

- Progres tersimpan per browser dan per perangkat. Mode privat bisa menghapusnya saat ditutup.
- Isi pelajaran sebaiknya diperiksa penutur asli Mesir sebelum dipakai untuk pengajaran formal. Transliterasi memakai ejaan sederhana (H = ح, S = ص, T = ط, D = ض, ‘ = ع, ’ = ء).
