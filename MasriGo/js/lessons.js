/* MasriGo — lesson content (Egyptian Arabic for Indonesian speakers).
   The learner is a girl, so "you" forms are feminine (enti, -i endings). */
(function () {
  const MG = (window.MG = window.MG || {});

  // helpers keep the data compact
  const V = (ar, tr, id, e, say) => ({ ar, tr, id, e, say: say || ar });
  const S = (ar, tr, id) => ({ ar, tr, id });
  const D = (w, ar, tr, id) => ({ w, ar, tr, id });
  const R = (qa, qt, qi, aa, at, ai, w1, w2) => ({
    q: { ar: qa, tr: qt, id: qi },
    a: { ar: aa, tr: at, id: ai },
    w: [{ ar: w1[0], tr: w1[1] }, { ar: w2[0], tr: w2[1] }]
  });

  MG.LESSONS = [
    {
      id: 1, emoji: '👋', game: 'match', partner: 'Mona',
      title: { ar: 'السلام والتحية', id: 'Sapaan & Salam' },
      goals: [
        'Menyapa orang dengan sopan dalam bahasa Mesir',
        'Menanyakan kabar dan menjawabnya',
        'Mengucapkan terima kasih dan berpamitan'
      ],
      vocab: [
        V('أهلاً', 'ahlan', 'Halo / Selamat datang', '👋'),
        V('صباح الخير', 'SabaaH el-kheer', 'Selamat pagi', '🌅'),
        V('مساء الخير', 'masaa’ el-kheer', 'Selamat sore / malam', '🌆'),
        V('إزّيّك؟', 'ezzayyik?', 'Apa kabar? (kepada perempuan)', '💬'),
        V('الحمد لله', 'el-Hamdu lillaah', 'Alhamdulillah (aku baik)', '🤲'),
        V('شكراً', 'shukran', 'Terima kasih', '🙏'),
        V('العفو', 'el-‘afw', 'Sama-sama', '😊'),
        V('مع السلامة', 'ma‘a s-salaama', 'Sampai jumpa', '🚪')
      ],
      sentences: [
        S('صباح الخير، إزّيّك؟', 'SabaaH el-kheer, ezzayyik?', 'Selamat pagi, apa kabar?'),
        S('أنا كويسة، الحمد لله', 'ana kwayyesa, el-Hamdu lillaah', 'Aku baik-baik saja, alhamdulillah.'),
        S('أهلاً بيكي يا منى', 'ahlan beeki yaa Mona', 'Halo, Mona! (kepada perempuan)'),
        S('شكراً، مع السلامة', 'shukran, ma‘a s-salaama', 'Terima kasih, sampai jumpa.')
      ],
      dialogue: [
        D('A', 'صباح الخير!', 'SabaaH el-kheer!', 'Selamat pagi!'),
        D('B', 'صباح النور!', 'SabaaH en-noor!', 'Selamat pagi juga! (balasan, arti harfiah: pagi yang bercahaya)'),
        D('A', 'إزّيّك؟', 'ezzayyik?', 'Apa kabar?'),
        D('B', 'أنا كويسة، الحمد لله. وإنتِ؟', 'ana kwayyesa, el-Hamdu lillaah. w enti?', 'Aku baik, alhamdulillah. Kalau kamu?'),
        D('A', 'الحمد لله، تمام.', 'el-Hamdu lillaah, tamaam.', 'Alhamdulillah, baik.'),
        D('B', 'شكراً. مع السلامة!', 'shukran. ma‘a s-salaama!', 'Terima kasih. Sampai jumpa!')
      ],
      explain: '<p>Orang Mesir terkenal ramah. Saat bertemu, <b>أهلاً</b> (ahlan) cocok untuk semua situasi. Pagi hari ucapkan <b>صباح الخير</b>, dan jawabannya <b>صباح النور</b> (“pagi yang bercahaya”). Sore atau malam: <b>مساء الخير</b> dibalas <b>مساء النور</b>.</p><p><b>إزّيّك؟</b> artinya “apa kabar?”. Bahasa Mesir membedakan lawan bicara: kepada perempuan <b>ezzayyik</b>, kepada laki-laki <b>ezzayyak</b>. Karena kamu perempuan, kamu menjawab <b>أنا كويسة</b> (kwayyesa); laki-laki berkata <b>كويس</b> (kwayyes).</p><p><b>الحمد لله</b> sering dipakai sebagai “baik-baik saja”. Cara balas <b>شكراً</b> yang paling umum adalah <b>العفو</b>.</p>',
      tip: 'Huruf خ dibaca seperti “kh” pada kata “khusus”. Huruf ح (H besar) dibaca dari tenggorokan, lebih lembut daripada “h” biasa.',
      replies: [
        R('إزّيّك؟', 'ezzayyik?', 'Apa kabar?', 'أنا كويسة، الحمد لله', 'ana kwayyesa, el-Hamdu lillaah', 'Aku baik, alhamdulillah.', ['مع السلامة', 'ma‘a s-salaama'], ['شكراً', 'shukran']),
        R('صباح الخير', 'SabaaH el-kheer', 'Selamat pagi', 'صباح النور', 'SabaaH en-noor', 'Selamat pagi juga.', ['مساء الخير', 'masaa’ el-kheer'], ['مع السلامة', 'ma‘a s-salaama']),
        R('شكراً', 'shukran', 'Terima kasih', 'العفو', 'el-‘afw', 'Sama-sama.', ['صباح الخير', 'SabaaH el-kheer'], ['مع السلامة', 'ma‘a s-salaama'])
      ]
    },
    {
      id: 2, emoji: '🌸', game: 'convo', partner: 'Mona',
      title: { ar: 'بعرّف نفسي', id: 'Memperkenalkan Diri' },
      goals: [
        'Menyebutkan nama dan asalmu',
        'Menanyakan nama dan asal orang lain',
        'Mengatakan bahwa kamu sedang belajar bahasa Arab Mesir'
      ],
      vocab: [
        V('اسمي', 'ismi', 'Namaku', '🏷️'),
        V('اسمك إيه؟', 'ismik eeh?', 'Siapa namamu? (kepada perempuan)', '❓'),
        V('أنا من', 'ana min', 'Aku dari …', '📍', 'أنا من'),
        V('إندونيسيا', 'indonesya', 'Indonesia', '🌴'),
        V('مصر', 'maSr', 'Mesir', '🐪'),
        V('طالبة', 'Taaliba', 'Pelajar / mahasiswi (perempuan)', '🎓'),
        V('فرصة سعيدة', 'forSa sa‘eeda', 'Senang berkenalan', '🤝'),
        V('عربي', '‘arabi', 'Bahasa Arab', '📖')
      ],
      sentences: [
        S('اسمي سارة', 'ismi saara', 'Namaku Sara.'),
        S('أنا من إندونيسيا', 'ana min indonesya', 'Aku dari Indonesia.'),
        S('أنا طالبة وبتعلّم عربي مصري', 'ana Taaliba w batta‘allim ‘arabi maSri', 'Aku pelajar dan sedang belajar bahasa Arab Mesir.'),
        S('فرصة سعيدة يا منى', 'forSa sa‘eeda yaa Mona', 'Senang berkenalan, Mona.')
      ],
      dialogue: [
        D('A', 'أهلاً! اسمي منى. اسمك إيه؟', 'ahlan! ismi Mona. ismik eeh?', 'Halo! Namaku Mona. Siapa namamu?'),
        D('B', 'اسمي سارة. فرصة سعيدة!', 'ismi saara. forSa sa‘eeda!', 'Namaku Sara. Senang berkenalan!'),
        D('A', 'فرصة سعيدة. إنتِ منين؟', 'forSa sa‘eeda. enti mineen?', 'Senang berkenalan juga. Kamu dari mana?'),
        D('B', 'أنا من إندونيسيا. وإنتِ؟', 'ana min indonesya. w enti?', 'Aku dari Indonesia. Kalau kamu?'),
        D('A', 'أنا من مصر، من القاهرة.', 'ana min maSr, min el-qaahira.', 'Aku dari Mesir, dari Kairo.'),
        D('B', 'حلو أوي!', 'Helw awi!', 'Bagus sekali!')
      ],
      explain: '<p>Untuk menyebut nama, katakan <b>اسمي</b> + namamu. Untuk bertanya, <b>اسمك إيه؟</b> secara harfiah “namamu apa?”. Kata tanya <b>إيه</b> (apa) selalu ada di akhir kalimat dalam bahasa Mesir.</p><p><b>أنا من</b> + negara berarti “aku dari …”. Untuk bertanya asal, pakai <b>إنتِ منين؟</b> (kamu dari mana?). Kepada laki-laki: <b>إنتَ منين؟</b></p><p>Bentuk perempuan <b>طالبة</b> memakai akhiran <b>ـة</b>. Laki-laki berkata <b>طالب</b>. Kata <b>وبتعلّم</b> artinya “dan aku sedang belajar”, dan sama untuk laki-laki maupun perempuan.</p>',
      tip: 'Huruf ع (‘ain) bunyinya keluar dari tenggorokan yang agak ditekan, seperti bunyi pada “ma‘af” yang diucapkan pelan dan dalam. Latih dengan tombol 🐢.',
      replies: [
        R('اسمك إيه؟', 'ismik eeh?', 'Siapa namamu?', 'اسمي سارة', 'ismi saara', 'Namaku Sara.', ['أنا من مصر', 'ana min maSr'], ['مع السلامة', 'ma‘a s-salaama']),
        R('إنتِ منين؟', 'enti mineen?', 'Kamu dari mana?', 'أنا من إندونيسيا', 'ana min indonesya', 'Aku dari Indonesia.', ['اسمي سارة', 'ismi saara'], ['أنا كويسة', 'ana kwayyesa']),
        R('أنا منى، فرصة سعيدة!', 'ana Mona, forSa sa‘eeda!', 'Aku Mona, senang berkenalan!', 'فرصة سعيدة يا منى', 'forSa sa‘eeda yaa Mona', 'Senang berkenalan juga, Mona.', ['صباح النور', 'SabaaH en-noor'], ['مع السلامة', 'ma‘a s-salaama'])
      ]
    },
    {
      id: 3, emoji: '👭', game: 'build', partner: 'Ahmed',
      title: { ar: 'الضمائر', id: 'Kata Ganti: أنا، إنتَ، إنتِ، هو، هي' },
      goals: [
        'Mengenali kata ganti orang: aku, kamu (lk/pr), dia (lk/pr), kita, mereka',
        'Membedakan bentuk laki-laki dan perempuan',
        'Membuat kalimat sederhana dengan kata ganti'
      ],
      vocab: [
        V('أنا', 'ana', 'Aku / Saya', '🙋‍♀️'),
        V('إنتَ', 'enta', 'Kamu (laki-laki)', '👦'),
        V('إنتِ', 'enti', 'Kamu (perempuan)', '👧'),
        V('هو', 'huwwa', 'Dia (laki-laki)', '🧑'),
        V('هي', 'heyya', 'Dia (perempuan)', '👩'),
        V('إحنا', 'eHna', 'Kita / Kami', '👭'),
        V('همّ', 'humma', 'Mereka', '👥')
      ],
      sentences: [
        S('أنا طالبة', 'ana Taaliba', 'Aku seorang pelajar.'),
        S('هو مدرّس وهي مدرّسة', 'huwwa mudarris w heyya mudarrisa', 'Dia (lk) guru dan dia (pr) guru.'),
        S('إنتِ طالبة وأنا مدرّسة', 'enti Taaliba w ana mudarrisa', 'Kamu pelajar dan aku guru.'),
        S('هو وهي في مصر', 'huwwa w heyya fi maSr', 'Dia (lk) dan dia (pr) ada di Mesir.')
      ],
      dialogue: [
        D('A', 'إنتِ طالبة؟', 'enti Taaliba?', 'Kamu pelajar?'),
        D('B', 'أيوه، أنا طالبة. وإنتَ؟', 'aywa, ana Taaliba. w enta?', 'Ya, aku pelajar. Kalau kamu?'),
        D('A', 'أنا مدرّس.', 'ana mudarris.', 'Aku guru.'),
        D('B', 'وهي؟', 'w heyya?', 'Kalau dia (perempuan)?'),
        D('A', 'هي مدرّسة كمان.', 'heyya mudarrisa kamaan.', 'Dia juga guru.')
      ],
      explain: '<p>Dalam bahasa Mesir, “kamu” punya dua bentuk: <b>إنتَ</b> (enta) untuk laki-laki dan <b>إنتِ</b> (enti) untuk perempuan. Perbedaannya hanya harakat di huruf terakhir (fatha ـَ dan kasra ـِ), tetapi pengucapannya jelas berbeda. Kamu adalah <b>إنتِ</b>.</p><p>Begitu juga <b>هو</b> (dia laki-laki) dan <b>هي</b> (dia perempuan). Kata benda profesi ikut berubah: laki-laki <b>مدرّس</b>, perempuan <b>مدرّسة</b>.</p><p>Bahasa Mesir tidak memakai kata “adalah”: <b>أنا طالبة</b> langsung berarti “aku (adalah) pelajar”. <b>أيوه</b> berarti “ya”, dan <b>كمان</b> berarti “juga”.</p>',
      tip: 'Kata ganti إنتِ (enti) diakhiri bunyi “i”. Bandingkan dengan إنتَ (enta) yang diakhiri “a”. Dengarkan dua-duanya berurutan dan tebak mana yang untukmu.',
      replies: [
        R('إنتِ طالبة؟', 'enti Taaliba?', 'Kamu pelajar?', 'أيوه، أنا طالبة', 'aywa, ana Taaliba', 'Ya, aku pelajar.', ['أيوه، أنا طالب', 'aywa, ana Taaleb'], ['مع السلامة', 'ma‘a s-salaama']),
        R('هي مدرّسة؟', 'heyya mudarrisa?', 'Apakah dia (perempuan) guru?', 'أيوه، هي مدرّسة', 'aywa, heyya mudarrisa', 'Ya, dia guru.', ['أيوه، هو مدرّسة', 'aywa, huwwa mudarrisa'], ['صباح الخير', 'SabaaH el-kheer'])
      ]
    },
    {
      id: 4, emoji: '🔢', game: 'listen', partner: 'Mona',
      title: { ar: 'الأرقام والسن', id: 'Angka & Umur' },
      goals: [
        'Menghitung 1 sampai 5, 10, dan 20',
        'Menanyakan dan menyebutkan umur',
        'Menyebut jam dan jumlah uang dengan angka sederhana'
      ],
      vocab: [
        V('واحد', 'waaHed', 'Satu', '1️⃣'),
        V('اتنين', 'itneen', 'Dua', '2️⃣'),
        V('تلاتة', 'talaata', 'Tiga', '3️⃣'),
        V('أربعة', 'arba‘a', 'Empat', '4️⃣'),
        V('خمسة', 'khamsa', 'Lima', '5️⃣'),
        V('عشرة', '‘ashara', 'Sepuluh', '🔟'),
        V('عشرين', '‘eshreen', 'Dua puluh', '🎉'),
        V('سنة', 'sana', 'Tahun', '🎂')
      ],
      sentences: [
        S('عندي عشرين سنة', '‘andi ‘eshreen sana', 'Umurku dua puluh tahun.'),
        S('عندك كام سنة؟', '‘andik kaam sana?', 'Umurmu berapa tahun?'),
        S('الساعة خمسة', 'es-saa‘a khamsa', 'Jam lima.'),
        S('أنا عندي عشرة جنيه', 'ana ‘andi ‘ashara geneeh', 'Aku punya sepuluh pound.')
      ],
      dialogue: [
        D('A', 'عندك كام سنة؟', '‘andik kaam sana?', 'Umurmu berapa?'),
        D('B', 'عندي عشرين سنة. وإنتِ؟', '‘andi ‘eshreen sana. w enti?', 'Umurku dua puluh. Kalau kamu?'),
        D('A', 'وأنا عندي واحد وعشرين سنة.', 'w ana ‘andi waaHed w ‘eshreen sana.', 'Aku dua puluh satu tahun.'),
        D('B', 'يا سلام!', 'yaa salaam!', 'Wah, hebat!')
      ],
      explain: '<p>Untuk menyebut umur, bahasa Mesir memakai <b>عندي … سنة</b> (secara harfiah “aku punya … tahun”). Bertanya: <b>عندك كام سنة؟</b> (<b>كام</b> = berapa).</p><p>Angka belasan dan puluhan nanti dipelajari lebih lanjut. Dua puluh satu disusun dari “satu dan dua puluh”: <b>واحد وعشرين</b>. Angka <b>اتنين</b> (dua) dan <b>تلاتة</b> (tiga) sering terdengar berbeda dari bahasa Arab baku, itu normal di Mesir.</p><p><b>يا سلام!</b> adalah seruan “wah!” yang sangat Mesir. Mata uang Mesir adalah <b>جنيه</b> (geneeh, pound).</p>',
      tip: 'Huruf ث di bahasa Arab baku (tsalaatsa) berubah menjadi “t” di Mesir: talaata. Jadi tidak perlu menjulurkan lidah.',
      replies: [
        R('عندك كام سنة؟', '‘andik kaam sana?', 'Umurmu berapa?', 'عندي عشرين سنة', '‘andi ‘eshreen sana', 'Umurku dua puluh tahun.', ['أنا من إندونيسيا', 'ana min indonesya'], ['مع السلامة', 'ma‘a s-salaama']),
        R('أنا عندي واحد وعشرين سنة، وإنتِ؟', 'ana ‘andi waaHed w ‘eshreen sana, w enti?', 'Umurku dua puluh satu, kalau kamu?', 'عندي عشرين سنة', '‘andi ‘eshreen sana', 'Umurku dua puluh.', ['اسمي سارة', 'ismi saara'], ['أنا كويسة', 'ana kwayyesa'])
      ]
    },
    {
      id: 5, emoji: '👨‍👩‍👧', game: 'choose', partner: 'Mona',
      title: { ar: 'العيلة', id: 'Keluarga' },
      goals: [
        'Menyebut anggota keluarga inti',
        'Menunjukkan anggota keluarga dengan ده (ini, lk) dan دي (ini, pr)',
        'Menceritakan keluargamu secara singkat'
      ],
      vocab: [
        V('عيلة', '‘eyla', 'Keluarga', '👨‍👩‍👧'),
        V('ماما', 'maama', 'Ibu', '👩'),
        V('بابا', 'baaba', 'Ayah', '👨'),
        V('أخويا', 'akhooya', 'Saudara laki-lakiku', '👦'),
        V('أختي', 'okhti', 'Saudara perempuanku', '👧'),
        V('جدّو', 'geddo', 'Kakek', '👴'),
        V('تيتة', 'teeta', 'Nenek', '👵'),
        V('بنت', 'bint', 'Anak perempuan / gadis', '🧒')
      ],
      sentences: [
        S('دي عيلتي', 'dee ‘eylity', 'Ini keluargaku.'),
        S('ده بابا ودي ماما', 'da baaba w dee maama', 'Ini ayah dan ini ibu.'),
        S('عندي أخ وأخت', '‘andi akh w okht', 'Aku punya satu kakak/adik laki-laki dan satu perempuan.'),
        S('تيتة بتحبّني أوي', 'teeta bitHebbeni awi', 'Nenek sangat menyayangiku.')
      ],
      dialogue: [
        D('B', 'دي صورة عيلتي.', 'dee Soorit ‘eylity.', 'Ini foto keluargaku.'),
        D('A', 'حلوة أوي! ده مين؟', 'Helwa awi! da meen?', 'Bagus sekali! Ini siapa?'),
        D('B', 'ده بابا، ودي ماما.', 'da baaba, w dee maama.', 'Ini ayah, dan ini ibu.'),
        D('A', 'وده؟', 'w da?', 'Kalau yang ini?'),
        D('B', 'ده أخويا، ودي أختي.', 'da akhooya, w dee okhti.', 'Ini saudara laki-lakiku, dan ini saudara perempuanku.')
      ],
      explain: '<p>Bahasa Mesir memakai dua kata penunjuk: <b>ده</b> (da) untuk benda/orang laki-laki dan <b>دي</b> (dee) untuk perempuan. Jadi “ini ayah” adalah <b>ده بابا</b>, “ini ibu” adalah <b>دي ماما</b>.</p><p>Akhiran <b>ـي</b> dan <b>ـيا</b> berarti “-ku”: <b>أختي</b> (saudara perempuanku), <b>أخويا</b> (saudara laki-lakiku), <b>عيلتي</b> (keluargaku).</p><p>Kata <b>أوي</b> berarti “sangat” dan akan sering kamu dengar. <b>حلوة</b> artinya “cantik/bagus” (bentuk perempuan, karena foto = <b>صورة</b>, kata perempuan).</p>',
      tip: 'Dalam bahasa Mesir, huruf ج dibaca “g” seperti pada “gula”: <b>جدّو</b> = geddo, bukan “jaddu”.',
      replies: [
        R('ده مين؟', 'da meen?', 'Ini siapa? (menunjuk laki-laki)', 'ده بابا', 'da baaba', 'Ini ayah.', ['دي ماما', 'dee maama'], ['شكراً', 'shukran']),
        R('دي مين؟', 'dee meen?', 'Ini siapa? (menunjuk perempuan)', 'دي أختي', 'dee okhti', 'Ini saudara perempuanku.', ['ده أخويا', 'da akhooya'], ['الحمد لله', 'el-Hamdu lillaah']),
        R('عندك أخ؟', '‘andik akh?', 'Kamu punya saudara laki-laki?', 'أيوه، عندي أخ واحد', 'aywa, ‘andi akh waaHed', 'Ya, aku punya satu.', ['أيوه، أنا طالبة', 'aywa, ana Taaliba'], ['مع السلامة', 'ma‘a s-salaama'])
      ]
    },
    {
      id: 6, emoji: '🍲', game: 'build', partner: 'Pelayan',
      title: { ar: 'الأكل والشرب', id: 'Makanan & Minuman' },
      goals: [
        'Menyebut makanan dan minuman Mesir yang umum',
        'Memesan makanan dengan sopan',
        'Mengatakan bahwa kamu lapar atau suka suatu makanan'
      ],
      vocab: [
        V('عيش', '‘eesh', 'Roti', '🍞'),
        V('مية', 'mayya', 'Air', '💧'),
        V('شاي', 'shaay', 'Teh', '🍵'),
        V('قهوة', '‘ahwa', 'Kopi', '☕'),
        V('لبن', 'laban', 'Susu', '🥛'),
        V('رز', 'ruzz', 'Nasi', '🍚'),
        V('فراخ', 'feraakh', 'Ayam', '🍗'),
        V('كشري', 'koshary', 'Koshari (makanan khas Mesir)', '🍲')
      ],
      sentences: [
        S('عايزة كباية شاي', '‘aayza kabbaayet shaay', 'Aku mau segelas teh.'),
        S('أنا بحب الكشري أوي', 'ana baHebb el-koshary awi', 'Aku suka sekali koshari.'),
        S('أنا جعانة، عايزة أكل', 'ana ga‘aana, ‘aayza akl', 'Aku lapar, mau makan.'),
        S('عايزة مية لو سمحت', '‘aayza mayya law samaHt', 'Aku mau air, tolong.')
      ],
      dialogue: [
        D('A', 'أهلاً! تحبّي تاكلي إيه؟', 'ahlan! teHebbi taakli eeh?', 'Selamat datang! Kamu mau makan apa?'),
        D('B', 'عايزة كشري، لو سمحت.', '‘aayza koshary, law samaHt.', 'Aku mau koshari, tolong.'),
        D('A', 'تمام. وتشربي إيه؟', 'tamaam. w tishrabi eeh?', 'Baik. Dan minumnya apa?'),
        D('B', 'كباية شاي، لو سمحت.', 'kabbaayet shaay, law samaHt.', 'Segelas teh, tolong.'),
        D('A', 'حاضر!', 'HaaDir!', 'Siap!'),
        D('B', 'شكراً.', 'shukran.', 'Terima kasih.')
      ],
      explain: '<p>Untuk memesan, perempuan berkata <b>عايزة</b> (‘aayza, “aku mau”). Laki-laki berkata <b>عايز</b> (‘aayez). Tambahkan <b>لو سمحت</b> (“tolong/permisi”) agar sopan.</p><p>Pelayan bertanya kepada perempuan: <b>تحبّي تاكلي إيه؟</b> Perhatikan akhiran <b>-ي</b> pada <b>تحبّي</b>, <b>تاكلي</b>, <b>تشربي</b>. Itu tanda bahwa lawan bicaranya perempuan. Kepada laki-laki: <b>تحبّ تاكل إيه؟</b></p><p><b>كشري</b> adalah makanan nasional Mesir: nasi, mi, lentil, dan saus tomat. <b>جعانة</b> artinya “lapar” (bentuk perempuan), <b>حاضر</b> artinya “siap, baik”.</p>',
      tip: 'Huruf ق di Mesir sering dibaca sebagai hentakan glotal (seperti bunyi akhir “bapak”): قهوة dibaca ‘ahwa, bukan “qahwa”.',
      replies: [
        R('تحبّي تاكلي إيه؟', 'teHebbi taakli eeh?', 'Kamu mau makan apa?', 'عايزة كشري', '‘aayza koshary', 'Aku mau koshari.', ['اسمي سارة', 'ismi saara'], ['عندي عشرين سنة', '‘andi ‘eshreen sana']),
        R('وتشربي إيه؟', 'w tishrabi eeh?', 'Dan minumnya apa?', 'شاي، لو سمحت', 'shaay, law samaHt', 'Teh, tolong.', ['عايزة رز', '‘aayza ruzz'], ['مع السلامة', 'ma‘a s-salaama']),
        R('حاضر!', 'HaaDir!', 'Siap!', 'شكراً', 'shukran', 'Terima kasih.', ['صباح الخير', 'SabaaH el-kheer'], ['أنا من مصر', 'ana min maSr'])
      ]
    },
    {
      id: 7, emoji: '🏠', game: 'match', partner: 'Mona',
      title: { ar: 'البيت والحياة اليومية', id: 'Rumah & Kegiatan Sehari-hari' },
      goals: [
        'Menyebut bagian-bagian rumah',
        'Mengatakan kegiatan harian: bangun dan tidur',
        'Menyebut jam dengan الساعة'
      ],
      vocab: [
        V('بيت', 'beet', 'Rumah', '🏠'),
        V('أوضة', 'ooDa', 'Kamar', '🛋️'),
        V('مطبخ', 'maTbakh', 'Dapur', '🍳'),
        V('سرير', 'sereer', 'Tempat tidur', '🛏️'),
        V('باب', 'baab', 'Pintu', '🚪'),
        V('شبّاك', 'shebbaak', 'Jendela', '🪟'),
        V('بصحى', 'baSHa', 'Aku bangun', '⏰'),
        V('بنام', 'banaam', 'Aku tidur', '😴')
      ],
      sentences: [
        S('أنا ساكنة في بيت كبير', 'ana saakna fi beet kebeer', 'Aku tinggal di rumah besar.'),
        S('بصحى الساعة سبعة', 'baSHa es-saa‘a sab‘a', 'Aku bangun jam tujuh.'),
        S('بنام الساعة عشرة', 'banaam es-saa‘a ‘ashara', 'Aku tidur jam sepuluh.'),
        S('الأوضة فيها سرير وشبّاك', 'el-ooDa feeha sereer w shebbaak', 'Di kamar ada tempat tidur dan jendela.')
      ],
      dialogue: [
        D('A', 'بتصحي الساعة كام؟', 'bitSHi es-saa‘a kaam?', 'Kamu bangun jam berapa?'),
        D('B', 'بصحى الساعة سبعة. وإنتِ؟', 'baSHa es-saa‘a sab‘a. w enti?', 'Aku bangun jam tujuh. Kalau kamu?'),
        D('A', 'أنا بصحى الساعة ستّة.', 'ana baSHa es-saa‘a sitta.', 'Aku bangun jam enam.'),
        D('B', 'وبعد كده؟', 'w ba‘d keda?', 'Lalu setelah itu?'),
        D('A', 'بشرب قهوة في المطبخ.', 'bashrab ‘ahwa fi el-maTbakh.', 'Aku minum kopi di dapur.'),
        D('B', 'حلو! أنا بشرب شاي في الأوضة.', 'Helw! ana bashrab shaay fi el-ooDa.', 'Enak! Aku minum teh di kamar.')
      ],
      explain: '<p>Di bahasa Mesir, kata kerja kebiasaan diawali <b>ب</b>. <b>بصحى</b> = “aku bangun (biasanya)”, <b>بنام</b> = “aku tidur”, <b>بشرب</b> = “aku minum”. Kamu pakai bentuk yang sama untuk “aku”, baik perempuan maupun laki-laki.</p><p>Untuk “kamu” perempuan, tambahkan <b>-ي</b>: <b>بتصحي</b> (kamu bangun), <b>بتنامي</b> (kamu tidur). Kepada laki-laki: <b>بتصحى</b>, <b>بتنام</b>.</p><p>Jam: <b>الساعة</b> + angka. Tambahan angka: <b>ستّة</b> (6), <b>سبعة</b> (7). <b>ساكنة</b> adalah bentuk perempuan “tinggal”; laki-laki <b>ساكن</b>. <b>في</b> = di, <b>بعد كده</b> = setelah itu.</p>',
      tip: 'Huruf ص, ض, ط adalah huruf “tebal”. Ucapkan dengan lidah lebih menekan ke langit-langit. Dengarkan perbedaan antara سرير (sereer) dan صباح (SabaaH).',
      replies: [
        R('بتصحي الساعة كام؟', 'bitSHi es-saa‘a kaam?', 'Kamu bangun jam berapa?', 'بصحى الساعة سبعة', 'baSHa es-saa‘a sab‘a', 'Aku bangun jam tujuh.', ['عندي عشرين سنة', '‘andi ‘eshreen sana'], ['أنا من مصر', 'ana min maSr']),
        R('بتنامي الساعة كام؟', 'bitnaami es-saa‘a kaam?', 'Kamu tidur jam berapa?', 'بنام الساعة عشرة', 'banaam es-saa‘a ‘ashara', 'Aku tidur jam sepuluh.', ['بصحى الساعة سبعة', 'baSHa es-saa‘a sab‘a'], ['أنا ساكنة في بيت', 'ana saakna fi beet'])
      ]
    },
    {
      id: 8, emoji: '😊', game: 'convo', partner: 'Mona',
      title: { ar: 'المشاعر', id: 'Perasaan' },
      goals: [
        'Mengungkapkan perasaan dengan bentuk perempuan',
        'Menanyakan perasaan orang lain',
        'Menggunakan مش untuk “tidak”'
      ],
      vocab: [
        V('مبسوطة', 'mabsooTa', 'Senang', '😄'),
        V('زعلانة', 'za‘laana', 'Sedih / kesal', '😢'),
        V('تعبانة', 'ta‘baana', 'Capek / lelah', '😩'),
        V('جعانة', 'ga‘aana', 'Lapar', '🤤'),
        V('عطشانة', '‘aTshaana', 'Haus', '🥤'),
        V('خايفة', 'khaayfa', 'Takut', '😨'),
        V('زهقانة', 'zah‘aana', 'Bosan', '😑'),
        V('نعسانة', 'na‘saana', 'Mengantuk', '🥱')
      ],
      sentences: [
        S('أنا مبسوطة النهارده', 'ana mabsooTa en-naharda', 'Aku senang hari ini.'),
        S('أنا تعبانة شوية', 'ana ta‘baana shwayya', 'Aku agak capek.'),
        S('إنتِ زعلانة ليه؟', 'enti za‘laana leeh?', 'Kenapa kamu sedih?'),
        S('أنا جعانة وعطشانة', 'ana ga‘aana w ‘aTshaana', 'Aku lapar dan haus.')
      ],
      dialogue: [
        D('A', 'مالك؟ إنتِ زعلانة؟', 'maalik? enti za‘laana?', 'Kamu kenapa? Sedih?'),
        D('B', 'لأ، أنا مش زعلانة. أنا تعبانة.', 'la’, ana mish za‘laana. ana ta‘baana.', 'Tidak, aku tidak sedih. Aku capek.'),
        D('A', 'نامي شوية!', 'naami shwayya!', 'Tidurlah sebentar!'),
        D('B', 'حاضر. أنا نعسانة كمان.', 'HaaDir. ana na‘saana kamaan.', 'Baik. Aku juga ngantuk.')
      ],
      explain: '<p>Perasaan dalam bahasa Mesir berupa kata sifat yang berubah sesuai jenis kelamin. Untuk perempuan, akhirannya <b>ـة</b>: <b>مبسوطة</b>, <b>تعبانة</b>. Untuk laki-laki, hilangkan <b>ـة</b>: <b>مبسوط</b>, <b>تعبان</b>.</p><p>Untuk menyangkal, taruh <b>مش</b> sebelum kata sifat: <b>أنا مش زعلانة</b> = “aku tidak sedih”. Sapaan <b>مالك؟</b> berarti “kamu kenapa?” (kepada laki-laki: <b>مالك؟</b> juga).</p><p><b>نامي</b> adalah perintah untuk perempuan: “tidurlah!”. Laki-laki: <b>نام</b>. <b>شوية</b> = sedikit/sebentar, <b>النهارده</b> = hari ini.</p>',
      tip: 'Huruf ع muncul di تعبانة (ta‘baana). Jangan hilangkan! Tanpa ‘ain, kata ini jadi terdengar aneh. Putar versi pelan 🐢 beberapa kali.',
      replies: [
        R('مالك؟', 'maalik?', 'Kamu kenapa?', 'أنا تعبانة', 'ana ta‘baana', 'Aku capek.', ['اسمي سارة', 'ismi saara'], ['شكراً', 'shukran']),
        R('إنتِ جعانة؟', 'enti ga‘aana?', 'Kamu lapar?', 'أيوه، أنا جعانة', 'aywa, ana ga‘aana', 'Ya, aku lapar.', ['أيوه، أنا طالبة', 'aywa, ana Taaliba'], ['مع السلامة', 'ma‘a s-salaama']),
        R('إنتِ مبسوطة؟', 'enti mabsooTa?', 'Kamu senang?', 'أيوه، مبسوطة أوي', 'aywa, mabsooTa awi', 'Ya, aku senang sekali.', ['عندي عشرين سنة', '‘andi ‘eshreen sana'], ['ده بابا', 'da baaba'])
      ]
    },
    {
      id: 9, emoji: '❓', game: 'listen', partner: 'Mona',
      title: { ar: 'أسئلة وأجوبة', id: 'Pertanyaan & Jawaban' },
      goals: [
        'Mengenali kata tanya utama: apa, siapa, di mana, kapan, kenapa, berapa, bagaimana',
        'Mengajukan pertanyaan sederhana',
        'Menjawab pertanyaan sehari-hari'
      ],
      vocab: [
        V('إيه', 'eeh', 'Apa', '❓'),
        V('مين', 'meen', 'Siapa', '👤'),
        V('فين', 'feen', 'Di mana', '📍'),
        V('إمتى', 'imta', 'Kapan', '🕐'),
        V('ليه', 'leeh', 'Kenapa', '🤔'),
        V('كام', 'kaam', 'Berapa', '🔢'),
        V('إزّاي', 'izzaay', 'Bagaimana', '🛠️')
      ],
      sentences: [
        S('إنتِ ساكنة فين؟', 'enti saakna feen?', 'Kamu tinggal di mana?'),
        S('هنتقابل فين وإمتى؟', 'hanit’aabel feen w imta?', 'Kita bertemu di mana dan kapan?'),
        S('إزّاي أقول ده بالعربي؟', 'izzaay a’ool da bil-‘arabi?', 'Bagaimana mengatakan ini dalam bahasa Arab?'),
        S('اسمك إيه؟', 'ismik eeh?', 'Siapa namamu?')
      ],
      dialogue: [
        D('B', 'إنتِ ساكنة فين؟', 'enti saakna feen?', 'Kamu tinggal di mana?'),
        D('A', 'أنا ساكنة في الجيزة.', 'ana saakna fi el-giiza.', 'Aku tinggal di Giza.'),
        D('B', 'هنتقابل إمتى؟', 'hanit’aabel imta?', 'Kapan kita bertemu?'),
        D('A', 'بكرة الساعة خمسة.', 'bokra es-saa‘a khamsa.', 'Besok jam lima.'),
        D('B', 'وهنتقابل فين؟', 'w hanit’aabel feen?', 'Dan bertemu di mana?'),
        D('A', 'في كافيه جنب البيت.', 'fi kaafeeh ganb el-beet.', 'Di kafe dekat rumah.')
      ],
      explain: '<p>Di bahasa Mesir, kata tanya sering diletakkan <b>di akhir</b> kalimat: <b>اسمك إيه؟</b> (namamu apa?), <b>إنتِ ساكنة فين؟</b> (kamu tinggal di mana?).</p><p>Daftar penting: <b>إيه</b> apa, <b>مين</b> siapa, <b>فين</b> di mana, <b>إمتى</b> kapan, <b>ليه</b> kenapa, <b>كام</b> berapa, <b>إزّاي</b> bagaimana. Untuk harga, pakai <b>بكام؟</b> (“berapa harganya?”).</p><p>Kata <b>هـ</b> di depan kata kerja menandakan masa depan: <b>هنتقابل</b> = “kita akan bertemu”. <b>بكرة</b> = besok, <b>جنب</b> = dekat/di samping.</p>',
      tip: 'Huruf ز pada إزّاي dan زهقانة dibaca seperti “z” biasa. Yang berat adalah ء (hentakan glotal) di إمتى: ucapkan tegas, “im-ta”.',
      replies: [
        R('إنتِ ساكنة فين؟', 'enti saakna feen?', 'Kamu tinggal di mana?', 'أنا ساكنة في مصر', 'ana saakna fi maSr', 'Aku tinggal di Mesir.', ['اسمي سارة', 'ismi saara'], ['عندي عشرين سنة', '‘andi ‘eshreen sana']),
        R('اسمك إيه؟', 'ismik eeh?', 'Siapa namamu?', 'اسمي سارة', 'ismi saara', 'Namaku Sara.', ['أنا من مصر', 'ana min maSr'], ['الساعة خمسة', 'es-saa‘a khamsa']),
        R('هنتقابل إمتى؟', 'hanit’aabel imta?', 'Kapan kita bertemu?', 'بكرة الساعة خمسة', 'bokra es-saa‘a khamsa', 'Besok jam lima.', ['أنا ساكنة في الجيزة', 'ana saakna fi el-giiza'], ['اسمي سارة', 'ismi saara'])
      ]
    },
    {
      id: 10, emoji: '☕', game: 'convo', partner: 'Mona',
      title: { ar: 'محادثة مصرية كاملة', id: 'Percakapan Mesir Lengkap' },
      goals: [
        'Menggabungkan semua yang sudah dipelajari dalam satu percakapan',
        'Meminta sesuatu dengan sopan memakai ممكن dan لو سمحت',
        'Mengatakan bahwa kamu masih belajar dengan percaya diri'
      ],
      vocab: [
        V('لو سمحت', 'law samaHt', 'Permisi / Tolong', '🙏'),
        V('ممكن', 'mumken', 'Boleh / Bisa', '🤷‍♀️'),
        V('معلش', 'ma‘laysh', 'Tidak apa-apa / Maaf ya', '💕'),
        V('تمام', 'tamaam', 'Oke / Baik', '👌'),
        V('طبعاً', 'Tab‘an', 'Tentu saja', '✅'),
        V('يلّا', 'yalla', 'Ayo', '🏃‍♀️'),
        V('أيوه', 'aywa', 'Ya', '👍'),
        V('لأ', 'la’', 'Tidak', '🙅‍♀️')
      ],
      sentences: [
        S('ممكن مية، لو سمحت؟', 'mumken mayya, law samaHt?', 'Boleh minta air, tolong?'),
        S('معلش، أنا لسه بتعلّم', 'ma‘laysh, ana lissa batta‘allim', 'Maaf ya, aku masih belajar.'),
        S('طبعاً! يلّا نتكلّم عربي', 'Tab‘an! yalla netkallem ‘arabi', 'Tentu! Ayo kita bicara bahasa Arab.'),
        S('تمام، شكراً أوي', 'tamaam, shukran awi', 'Oke, terima kasih banyak.')
      ],
      dialogue: [
        D('A', 'أهلاً يا سارة! إزّيّك؟', 'ahlan yaa saara! ezzayyik?', 'Halo Sara! Apa kabar?'),
        D('B', 'أهلاً يا منى! أنا كويسة، الحمد لله. وإنتِ؟', 'ahlan yaa Mona! ana kwayyesa, el-Hamdu lillaah. w enti?', 'Halo Mona! Aku baik, alhamdulillah. Kamu?'),
        D('A', 'تمام. تحبّي تشربي إيه؟', 'tamaam. teHebbi tishrabi eeh?', 'Baik. Kamu mau minum apa?'),
        D('B', 'ممكن كباية شاي، لو سمحت؟', 'mumken kabbaayet shaay, law samaHt?', 'Boleh segelas teh, tolong?'),
        D('A', 'طبعاً! إنتِ بتتكلّمي عربي كويس!', 'Tab‘an! enti bitetkallemi ‘arabi kwayyes!', 'Tentu! Bahasa Arabmu bagus!'),
        D('B', 'شكراً! بس معلش، أنا لسه بتعلّم.', 'shukran! bass ma‘laysh, ana lissa batta‘allim.', 'Terima kasih! Tapi maaf ya, aku masih belajar.'),
        D('A', 'ولا يهمّك! يلّا نتكلّم.', 'walaa yehimmik! yalla netkallem.', 'Tidak masalah! Ayo kita bicara.'),
        D('B', 'يلّا!', 'yalla!', 'Ayo!')
      ],
      explain: '<p>Inilah percakapan Mesir lengkap pertamamu. <b>ممكن</b> + benda + <b>لو سمحت</b> adalah cara paling sopan untuk meminta sesuatu di mana saja: kafe, toko, atau jalan.</p><p><b>معلش</b> adalah kata serba guna: “maaf ya”, “tidak apa-apa”, “sabar ya”. Orang Mesir sangat sering mengucapkannya. Jawaban hangat untuk meminta maaf: <b>ولا يهمّك</b> (“jangan dipikirkan”).</p><p><b>أيوه</b> = ya, <b>لأ</b> = tidak, <b>تمام</b> = oke, <b>طبعاً</b> = tentu, <b>يلّا</b> = ayo. Dengan kata-kata ini kamu sudah bisa ikut percakapan sehari-hari di Mesir. Selamat! 🎉</p>',
      tip: 'Kata بس (bass) berarti “tapi/hanya/cukup” dan sering dipakai sebagai kata sambung. Dengarkan nadanya: orang Mesir memanjangkan vokal untuk menunjukkan keakraban.',
      replies: [
        R('تحبّي تشربي إيه؟', 'teHebbi tishrabi eeh?', 'Kamu mau minum apa?', 'ممكن شاي، لو سمحت', 'mumken shaay, law samaHt', 'Boleh teh, tolong.', ['أنا من إندونيسيا', 'ana min indonesya'], ['صباح الخير', 'SabaaH el-kheer']),
        R('إنتِ بتتكلّمي عربي كويس!', 'enti bitetkallemi ‘arabi kwayyes!', 'Bahasa Arabmu bagus!', 'شكراً! أنا لسه بتعلّم', 'shukran! ana lissa batta‘allim', 'Terima kasih! Aku masih belajar.', ['عندي عشرين سنة', '‘andi ‘eshreen sana'], ['ده بابا', 'da baaba']),
        R('تحبّي نتكلّم عربي؟', 'teHebbi netkallem ‘arabi?', 'Mau kita bicara bahasa Arab?', 'أيوه، طبعاً!', 'aywa, Tab‘an!', 'Ya, tentu!', ['أنا جعانة', 'ana ga‘aana'], ['اسمي سارة', 'ismi saara'])
      ]
    }
  ];
})();
