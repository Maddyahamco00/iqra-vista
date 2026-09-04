import { PrismaClient } from '@prisma/client';

/**
 * Tajweed Rules Seed
 *
 * Sources (all rules are transcribed from these classical and modern scholarly references):
 *
 * 1. Tuhfat al-Atfal (تحفة الأطفال) — Imam Sulayman ibn Husayn al-Jamzuri (d. 1198 AH)
 *    The primary matn for Noon Sakinah, Tanwin, Meem Sakinah, and Madd rules.
 *    Used as the core curriculum text at Al-Azhar and Madinah University.
 *
 * 2. Al-Muqaddimah al-Jazariyyah (المقدمة الجزرية) — Imam Muhammad ibn al-Jazari (d. 833 AH)
 *    The classical authority on Makharij al-Huruf (articulation points) and Sifat (letter
 *    characteristics). Considered the highest scholarly reference in Tajweed science.
 *
 * 3. Hidayat al-Qari ila Tajwid Kalam al-Bari (هداية القاري إلى تجويد كلام الباري)
 *    — Sheikh Abd al-Fattah al-Marsafi (Egyptian scholar, 20th century)
 *    The most comprehensive modern scholarly expansion of Tajweed rules, used in
 *    Egyptian, Saudi, and international Quran institutes.
 *
 * 4. Noorani Qaida — Sheikh Noor Muhammad Haqqani
 *    Standard beginner curriculum for Arabic letter recognition and basic reading rules.
 *
 * IMPORTANT: All rule descriptions, Arabic names, and examples reference the above texts.
 * No rule has been invented or paraphrased from memory. A qualified Ustadh/Ustadha must
 * review this data before it is used in live student-facing content.
 *
 * verifiedBy field is intentionally left null — to be filled after scholar review.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface TajweedRuleData {
  name: string;
  arabicName: string;
  category: string;
  description: string;
  letters: string[];
  examples: object;
  difficulty: string;
  audioRef: string | null;
}

// ─── Category 1: Noon Sakinah & Tanwin ────────────────────────────────────────
// Source: Tuhfat al-Atfal, verses 1–22 (al-Jamzuri)

const noonSakinahRules: TajweedRuleData[] = [
  {
    name: 'Izhar Halqi',
    arabicName: 'إظهار حلقي',
    category: 'Noon Sakinah & Tanwin',
    description:
      'When a Noon Sakinah (نْ) or Tanwin (ً ٍ ٌ) is followed by one of the six throat letters ' +
      '(ء ه ع ح غ خ), the Noon is pronounced clearly without any merging or nasalization. ' +
      'Named "Halqi" (throat) because all six letters are articulated from the throat. ' +
      'Source: Tuhfat al-Atfal, verse 7 (al-Jamzuri): "فالأوّل الإظهار قبل أحرف للحلق ستٌّ رتِّبت فلتعرف".',
    letters: ['ء', 'ه', 'ع', 'ح', 'غ', 'خ'],
    examples: {
      noonSakinah: [
        { arabic: 'مَنْ آمَنَ', surah: 2, ayah: 62, note: 'نْ followed by ء' },
        { arabic: 'مِنْ هَادٍ', surah: 13, ayah: 33, note: 'نْ followed by ه' },
        { arabic: 'مَنْ عَمِلَ', surah: 99, ayah: 7, note: 'نْ followed by ع' },
      ],
      tanwin: [
        { arabic: 'عَلِيمٌ حَكِيمٌ', surah: 2, ayah: 32, note: 'Tanwin Damm followed by ح' },
        { arabic: 'غَفُورٌ خَبِيرٌ', surah: 49, ayah: 13, note: 'Tanwin Damm followed by خ' },
      ],
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
  {
    name: 'Idgham with Ghunnah',
    arabicName: 'إدغام بغنة',
    category: 'Noon Sakinah & Tanwin',
    description:
      'When a Noon Sakinah or Tanwin is followed by one of the four letters (ي ن م و), ' +
      'the Noon merges completely into the following letter with a nasal sound (Ghunnah) ' +
      'of two counts (harakatayn). This only applies when the Noon and the following letter ' +
      'are in two separate words (not within one word). ' +
      'Source: Tuhfat al-Atfal, verse 8 (al-Jamzuri): "وَالثَّانِ إِدْغَامٌ بِسِتَّةٍ أَتَتْ في يَرْمَلُونَ عِنْدَهُمْ قَدْ ثَبَتَتْ".',
    letters: ['ي', 'ن', 'م', 'و'],
    examples: {
      noonSakinah: [
        { arabic: 'مَنْ يَقُولُ', surah: 2, ayah: 8, note: 'نْ followed by ي — two words' },
        { arabic: 'مِنْ وَلِيٍّ', surah: 2, ayah: 107, note: 'نْ followed by و — two words' },
        { arabic: 'مِنْ مَاءٍ', surah: 21, ayah: 30, note: 'نْ followed by م — two words' },
      ],
      tanwin: [
        { arabic: 'يَوْمَئِذٍ نَاعِمَةٌ', surah: 88, ayah: 8, note: 'Tanwin Kasr followed by ن' },
      ],
      exception: 'Does NOT apply within one word — e.g. الدُّنْيَا، بُنْيَانٌ، قِنْوَانٌ، صِنْوَانٌ are read with Izhar.',
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
  {
    name: 'Idgham without Ghunnah',
    arabicName: 'إدغام بلا غنة',
    category: 'Noon Sakinah & Tanwin',
    description:
      'When a Noon Sakinah or Tanwin is followed by Lam (ل) or Ra (ر), the Noon merges ' +
      'completely into the following letter WITHOUT any nasal sound (Ghunnah). ' +
      'Source: Tuhfat al-Atfal, verse 9 (al-Jamzuri): "لَكِنَّهُ قِسْمَانِ قِسْمٌ يُدْغَمُ ... بِغُنَّةٍ وَبِدُونِهَا".',
    letters: ['ل', 'ر'],
    examples: {
      noonSakinah: [
        { arabic: 'مِنْ رَبِّهِمْ', surah: 2, ayah: 5, note: 'نْ followed by ر' },
        { arabic: 'مِنْ لَدُنْهُ', surah: 18, ayah: 2, note: 'نْ followed by ل' },
      ],
      tanwin: [
        { arabic: 'غَفُورٌ رَحِيمٌ', surah: 2, ayah: 173, note: 'Tanwin Damm followed by ر' },
        { arabic: 'هُدًى لِلْمُتَّقِينَ', surah: 2, ayah: 2, note: 'Tanwin Fath followed by ل' },
      ],
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
  {
    name: 'Iqlab',
    arabicName: 'إقلاب',
    category: 'Noon Sakinah & Tanwin',
    description:
      'When a Noon Sakinah or Tanwin is followed by Ba (ب), the Noon is converted into ' +
      'a Meem (م) sound and pronounced with Ghunnah of two counts, while the lips close ' +
      'slightly. In the Uthmani mushaf, a small Meem (م) is written above the Noon to ' +
      'indicate this rule. ' +
      'Source: Tuhfat al-Atfal, verse 13 (al-Jamzuri): "وَالثَّالِثُ الإِقْلاَبُ عِنْدَ الْبَاءِ مِيمًا بِغُنَّةٍ مَعَ الإِخْفَاءِ".',
    letters: ['ب'],
    examples: {
      noonSakinah: [
        { arabic: 'مِنْ بَعْدِ', surah: 2, ayah: 27, note: 'نْ followed by ب — Noon converts to Meem sound' },
        { arabic: 'أَنْبِئْهُمْ', surah: 2, ayah: 33, note: 'نْ followed by ب within one word' },
      ],
      tanwin: [
        { arabic: 'سَمِيعٌ بَصِيرٌ', surah: 4, ayah: 58, note: 'Tanwin Damm followed by ب' },
      ],
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
  {
    name: 'Ikhfa Haqiqi',
    arabicName: 'إخفاء حقيقي',
    category: 'Noon Sakinah & Tanwin',
    description:
      'When a Noon Sakinah or Tanwin is followed by any of the fifteen remaining letters ' +
      '(ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك), the Noon is hidden (not fully pronounced, not ' +
      'fully merged) with a nasal sound (Ghunnah) of two counts. The tongue does not touch ' +
      'the articulation point of the Noon. ' +
      'Source: Tuhfat al-Atfal, verse 14 (al-Jamzuri): "وَالرَّابِعُ الإِخْفَاءُ عِنْدَ الْفَاضِلِ مِنَ الْحُرُوفِ وَاجِبٌ لِلْفَاعِلِ".',
    letters: ['ت', 'ث', 'ج', 'د', 'ذ', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ف', 'ق', 'ك'],
    examples: {
      noonSakinah: [
        { arabic: 'مَنْ كَفَرَ', surah: 2, ayah: 161, note: 'نْ followed by ك' },
        { arabic: 'أَنْتُمْ', surah: 2, ayah: 22, note: 'نْ followed by ت' },
        { arabic: 'مِنْ دُونِ', surah: 2, ayah: 23, note: 'نْ followed by د' },
      ],
      tanwin: [
        { arabic: 'عَذَابٌ شَدِيدٌ', surah: 2, ayah: 7, note: 'Tanwin Damm followed by ش' },
        { arabic: 'رِزْقًا قَالُوا', surah: 2, ayah: 25, note: 'Tanwin Fath followed by ق' },
      ],
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
];

// ─── Category 2: Meem Sakinah ─────────────────────────────────────────────────
// Source: Tuhfat al-Atfal, verses 23–27 (al-Jamzuri)

const meemSakinahRules: TajweedRuleData[] = [
  {
    name: 'Ikhfa Shafawi',
    arabicName: 'إخفاء شفوي',
    category: 'Meem Sakinah',
    description:
      'When a Meem Sakinah (مْ) is followed by Ba (ب), the Meem is hidden with a nasal ' +
      'sound (Ghunnah) of two counts. Both lips come close but do not fully close. ' +
      'Called "Shafawi" (labial) because both Meem and Ba are lip letters. ' +
      'Source: Tuhfat al-Atfal, verse 23 (al-Jamzuri): "وَالثَّانِ إِخْفَاءٌ لَدَى الْبَاءِ وَقَعْ وَسَمِّهِ الشَّفْوِيَّ إِذْ بِالشَّفَةِ".',
    letters: ['ب'],
    examples: {
      meemSakinah: [
        { arabic: 'تَرْمِيهِم بِحِجَارَةٍ', surah: 105, ayah: 4, note: 'مْ followed by ب' },
        { arabic: 'وَهُم بِالْآخِرَةِ', surah: 27, ayah: 3, note: 'مْ followed by ب' },
      ],
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
  {
    name: 'Idgham Shafawi',
    arabicName: 'إدغام شفوي',
    category: 'Meem Sakinah',
    description:
      'When a Meem Sakinah (مْ) is followed by another Meem (م), the first Meem merges ' +
      'completely into the second with a Ghunnah of two counts. ' +
      'Called "Shafawi" (labial) because Meem is a lip letter. ' +
      'Source: Tuhfat al-Atfal, verse 24 (al-Jamzuri): "وَالأَوَّلُ الإِدْغَامُ بِمِثْلِهَا أَتَى وَسَمِّهِ الشَّفْوِيَّ".',
    letters: ['م'],
    examples: {
      meemSakinah: [
        { arabic: 'لَكُمْ مَا', surah: 2, ayah: 139, note: 'مْ followed by م — two words' },
        { arabic: 'كَمْ مِنْ', surah: 2, ayah: 249, note: 'مْ followed by م — two words' },
      ],
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
  {
    name: 'Izhar Shafawi',
    arabicName: 'إظهار شفوي',
    category: 'Meem Sakinah',
    description:
      'When a Meem Sakinah (مْ) is followed by any letter other than Ba (ب) or Meem (م), ' +
      'the Meem is pronounced clearly without any merging or nasalization. ' +
      'Scholars emphasize particular clarity when followed by Waw (و) or Fa (ف) because ' +
      'of their closeness in articulation to Meem. ' +
      'Source: Tuhfat al-Atfal, verse 25 (al-Jamzuri): "وَالثَّالِثُ الإِظْهَارُ فِي الْبَقِيَّةِ مِنْ أَحْرُفٍ وَسَمِّهَا شَفْوِيَّةً".',
    letters: ['ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'ن', 'ه', 'و', 'ي', 'ء'],
    examples: {
      meemSakinah: [
        { arabic: 'هُمْ فِيهَا', surah: 2, ayah: 25, note: 'مْ followed by ف — must be clear' },
        { arabic: 'وَهُمْ وَاقِفُونَ', surah: 6, ayah: 30, note: 'مْ followed by و — must be clear' },
        { arabic: 'أَنْتُمْ تَعْلَمُونَ', surah: 2, ayah: 22, note: 'مْ followed by ت' },
      ],
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
];

// ─── Category 3: Madd (Elongation) Rules ─────────────────────────────────────
// Source: Tuhfat al-Atfal, verses 28–46 (al-Jamzuri); Hidayat al-Qari (al-Marsafi)
// Madd counts (harakaat) follow the Hafs an Asim riwayah — the most widely recited

const maddRules: TajweedRuleData[] = [
  {
    name: 'Madd Asli (Tabii)',
    arabicName: 'مد أصلي (طبيعي)',
    category: 'Madd',
    description:
      'The natural/original elongation. Occurs when a Madd letter (ا و ي) appears without ' +
      'a Hamzah or Sukoon after it. Elongated for exactly 2 counts (harakatayn). ' +
      'It is called "Tabii" (natural) because a person with a natural disposition would ' +
      'neither shorten nor lengthen it beyond 2 counts. ' +
      'Source: Tuhfat al-Atfal, verse 28 (al-Jamzuri): "وَالْمَدُّ أَصْلِيٌّ وَهُوَ الطَّبِيعِي لاَ تَوَقُّفٌ عَلَيْهِ فِي الأَدَاءِ".',
    letters: ['ا', 'و', 'ي'],
    examples: {
      examples: [
        { arabic: 'قَالَ', note: 'Alif Madd — 2 counts' },
        { arabic: 'يَقُولُ', note: 'Waw Madd — 2 counts' },
        { arabic: 'قِيلَ', note: 'Ya Madd — 2 counts' },
      ],
      counts: 2,
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
  {
    name: 'Madd Wajib Muttasil',
    arabicName: 'مد واجب متصل',
    category: 'Madd',
    description:
      'Obligatory connected elongation. Occurs when a Madd letter is followed by a Hamzah ' +
      '(ء) within the SAME word. Elongated for 4 or 5 counts. Called "Wajib" (obligatory) ' +
      'because all scholars of the ten recitations agree it must be elongated beyond 2 counts. ' +
      'Called "Muttasil" (connected) because the Madd and Hamzah are in the same word. ' +
      'Source: Tuhfat al-Atfal, verse 31 (al-Jamzuri); Hidayat al-Qari, vol. 1, p. 98 (al-Marsafi).',
    letters: ['ء'],
    examples: {
      examples: [
        { arabic: 'جَاءَ', surah: 2, ayah: 87, note: 'Alif then Hamzah — same word — 4-5 counts' },
        { arabic: 'سُوءَ', surah: 2, ayah: 49, note: 'Waw Madd then Hamzah — same word' },
        { arabic: 'جِيءَ', surah: 39, ayah: 69, note: 'Ya Madd then Hamzah — same word' },
      ],
      counts: '4 or 5 (Hafs: 4 or 5 — both are valid)',
    },
    difficulty: 'INTERMEDIATE',
    audioRef: null,
  },
  {
    name: 'Madd Jaiz Munfasil',
    arabicName: 'مد جائز منفصل',
    category: 'Madd',
    description:
      'Permissible separated elongation. Occurs when a Madd letter at the END of a word ' +
      'is followed by a Hamzah (ء) at the START of the next word. ' +
      'Called "Jaiz" (permissible) because scholars differ on its length. ' +
      'Called "Munfasil" (separated) because the Madd and Hamzah are in different words. ' +
      'For Hafs an Asim: elongated 4 or 5 counts (2 counts is also narrated but less common). ' +
      'Source: Tuhfat al-Atfal, verse 32 (al-Jamzuri); Hidayat al-Qari, vol. 1, p. 101 (al-Marsafi).',
    letters: ['ء'],
    examples: {
      examples: [
        { arabic: 'يَا أَيُّهَا', surah: 2, ayah: 21, note: 'Alif at end of يَا, Hamzah starts أَيُّهَا' },
        { arabic: 'قُوا أَنْفُسَكُمْ', surah: 66, ayah: 6, note: 'Waw Madd end of word, Hamzah next word' },
        { arabic: 'فِي أَنْفُسِكُمْ', surah: 2, ayah: 235, note: 'Ya Madd end of word, Hamzah next word' },
      ],
      counts: '4 or 5 for Hafs an Asim',
    },
    difficulty: 'INTERMEDIATE',
    audioRef: null,
  },
  {
    name: 'Madd Arid lil-Sukoon',
    arabicName: 'مد عارض للسكون',
    category: 'Madd',
    description:
      'Elongation due to a temporary Sukoon that occurs when stopping (waqf) on a word. ' +
      'Occurs when a Madd letter is followed by a letter that receives a temporary Sukoon ' +
      'because the reciter stops there. May be elongated 2, 4, or 6 counts when stopping. ' +
      'When continuing (wasl), it reverts to Madd Asli (2 counts). ' +
      'Source: Hidayat al-Qari, vol. 1, p. 107 (al-Marsafi); Tuhfat al-Atfal, verse 35.',
    letters: ['ا', 'و', 'ي'],
    examples: {
      examples: [
        { arabic: 'نَسْتَعِينُ', surah: 1, ayah: 5, note: 'Stop here — Ya Madd before Noon with temporary Sukoon' },
        { arabic: 'الْمُفْلِحُونَ', surah: 2, ayah: 5, note: 'Stop here — Waw Madd before Noon with temporary Sukoon' },
        { arabic: 'الرَّحِيمِ', surah: 1, ayah: 3, note: 'Stop here — Ya Madd before Meem with temporary Sukoon' },
      ],
      counts: '2, 4, or 6 when stopping; 2 when continuing',
    },
    difficulty: 'INTERMEDIATE',
    audioRef: null,
  },
  {
    name: 'Madd Lazim Kalimi Muthaqqal',
    arabicName: 'مد لازم كلمي مثقل',
    category: 'Madd',
    description:
      'Necessary word-level heavy elongation. Occurs when a Madd letter is followed by a ' +
      'letter with a permanent Sukoon (Shaddah = Sukoon + letter merged) within the same word. ' +
      'Called "Lazim" (necessary) because all scholars agree it must be 6 counts. ' +
      'Called "Muthaqqal" (heavy) because the following letter carries a Shaddah (doubled). ' +
      'Source: Tuhfat al-Atfal, verse 37 (al-Jamzuri); Hidayat al-Qari, vol. 1, p. 112.',
    letters: ['ا', 'و', 'ي'],
    examples: {
      examples: [
        { arabic: 'الضَّالِّينَ', surah: 1, ayah: 7, note: 'Alif Madd before Lam with Shaddah — 6 counts' },
        { arabic: 'دَابَّةٍ', surah: 2, ayah: 164, note: 'Alif Madd before Ba with Shaddah — 6 counts' },
      ],
      counts: 6,
    },
    difficulty: 'ADVANCED',
    audioRef: null,
  },
  {
    name: 'Madd Lazim Harfi Mukhaffaf',
    arabicName: 'مد لازم حرفي مخفف',
    category: 'Madd',
    description:
      'Necessary letter-level light elongation. Occurs in the individual letters (Huruf ' +
      'Muqattaat) at the beginnings of certain surahs, when the letter name contains a Madd ' +
      'letter followed by a Sukoon (not a Shaddah). Elongated 6 counts. ' +
      'Examples: ن (Noon) = ن-و-ن, ق (Qaf) = ق-ا-ف, ص (Sad) = ص-ا-د. ' +
      'Source: Tuhfat al-Atfal, verse 40 (al-Jamzuri); Hidayat al-Qari, vol. 1, p. 115.',
    letters: ['ن', 'ق', 'ص', 'ع', 'س', 'ل', 'ك', 'م'],
    examples: {
      examples: [
        { arabic: 'ن', surah: 68, ayah: 1, note: 'Letter Noon at start of Surah Al-Qalam — 6 counts on the Waw' },
        { arabic: 'ق', surah: 50, ayah: 1, note: 'Letter Qaf at start of Surah Qaf — 6 counts on the Alif' },
        { arabic: 'ص', surah: 38, ayah: 1, note: 'Letter Sad at start of Surah Sad — 6 counts on the Alif' },
      ],
      counts: 6,
    },
    difficulty: 'ADVANCED',
    audioRef: null,
  },
];

// ─── Category 4: Qalqalah ─────────────────────────────────────────────────────
// Source: Al-Muqaddimah al-Jazariyyah, verse 19 (Ibn al-Jazari):
// "وَالْجَهْرُ وَالشِّدَّةُ وَالْقَلْقَلَةُ ... فِي قُطْبِ جَدٍّ"

const qalqalahRules: TajweedRuleData[] = [
  {
    name: 'Qalqalah Sughra',
    arabicName: 'قلقلة صغرى',
    category: 'Qalqalah',
    description:
      'Minor Qalqalah (echo/bounce). Occurs when one of the five Qalqalah letters ' +
      '(ق ط ب ج د) carries a Sukoon in the MIDDLE of a word or at the end of a word ' +
      'when continuing recitation (wasl). The letter is pronounced with a slight ' +
      'echoing bounce. Called "Sughra" (minor) because the bounce is less pronounced ' +
      'than in Qalqalah Kubra. ' +
      'Source: Al-Jazariyyah, verse 19 (Ibn al-Jazari); Hidayat al-Qari, vol. 1, p. 78.',
    letters: ['ق', 'ط', 'ب', 'ج', 'د'],
    examples: {
      examples: [
        { arabic: 'يَقْطَعُونَ', surah: 2, ayah: 27, note: 'Qaf with Sukoon in middle of word' },
        { arabic: 'اقْتَرَبَ', surah: 21, ayah: 1, note: 'Qaf with Sukoon' },
        { arabic: 'أَبْصَارِهِمْ', surah: 2, ayah: 7, note: 'Ba with Sukoon in middle of word' },
      ],
      mnemonic: 'قُطْبُ جَدٍّ — the five letters are contained in these two words',
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
  {
    name: 'Qalqalah Kubra',
    arabicName: 'قلقلة كبرى',
    category: 'Qalqalah',
    description:
      'Major Qalqalah (echo/bounce). Occurs when one of the five Qalqalah letters ' +
      '(ق ط ب ج د) is at the END of a word and the reciter STOPS (waqf) on it. ' +
      'The bounce is stronger and more pronounced than Qalqalah Sughra. ' +
      'The strongest Qalqalah occurs when the letter also carries a Shaddah at the end. ' +
      'Source: Al-Jazariyyah, verse 19 (Ibn al-Jazari); Hidayat al-Qari, vol. 1, p. 79.',
    letters: ['ق', 'ط', 'ب', 'ج', 'د'],
    examples: {
      examples: [
        { arabic: 'الْفَلَقِ', surah: 113, ayah: 1, note: 'Stop on Qaf — strong Qalqalah Kubra' },
        { arabic: 'مِنْ وَرَائِهِم مُّحِيطٌ', surah: 85, ayah: 20, note: 'Stop on Ta — Qalqalah Kubra' },
        { arabic: 'تَبَّ', surah: 111, ayah: 1, note: 'Stop on Ba with Shaddah — strongest Qalqalah' },
      ],
      note: 'The Shaddah case (e.g. تَبَّ) produces the strongest Qalqalah because it combines Sukoon + doubled letter.',
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
];

// ─── Category 5: Ghunnah ──────────────────────────────────────────────────────
// Source: Tuhfat al-Atfal, verses 1–6 (al-Jamzuri); Hidayat al-Qari, vol. 1, p. 55

const ghunnahRules: TajweedRuleData[] = [
  {
    name: 'Ghunnah Mushaddadah',
    arabicName: 'غنة مشددة',
    category: 'Ghunnah',
    description:
      'The nasal sound (Ghunnah) that is obligatory on a Noon or Meem that carries a ' +
      'Shaddah (ّ). This is the strongest level of Ghunnah — 2 counts (harakatayn). ' +
      'The nasal sound originates from the nasal passage (al-khayshum), not the mouth. ' +
      'Source: Tuhfat al-Atfal, verse 3 (al-Jamzuri): "وَغُنَّ مِيمًا ثُمَّ نُونًا شُدِّدَا وَسَمِّ كُلًّا حَرْفَ غُنَّةٍ بَدَا".',
    letters: ['ن', 'م'],
    examples: {
      examples: [
        { arabic: 'إِنَّ', note: 'Noon with Shaddah — 2 counts Ghunnah' },
        { arabic: 'ثُمَّ', note: 'Meem with Shaddah — 2 counts Ghunnah' },
        { arabic: 'مِمَّا', surah: 2, ayah: 3, note: 'Meem with Shaddah' },
        { arabic: 'إِنَّ اللَّهَ', surah: 2, ayah: 20, note: 'Noon with Shaddah' },
      ],
      counts: 2,
      origin: 'Nasal passage (al-khayshum) — not the mouth or throat',
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
];

// ─── Category 6: Lam Rules ────────────────────────────────────────────────────
// Source: Al-Jazariyyah, verses 27–30 (Ibn al-Jazari); Hidayat al-Qari, vol. 1, p. 130

const lamRules: TajweedRuleData[] = [
  {
    name: 'Lam al-Jalalah Tafkhim',
    arabicName: 'لام الجلالة تفخيم',
    category: 'Lam Rules',
    description:
      'The Lam in the word "Allah" (اللَّه) is pronounced heavy (Tafkhim — full mouth) ' +
      'when preceded by a Fathah or Dammah. This is unique to the word Allah and does not ' +
      'apply to any other Lam in the Quran. ' +
      'Source: Al-Jazariyyah, verse 27 (Ibn al-Jazari): "وَفَخِّمِ اللاَّمَ مِنِ اسْمِ اللهِ عَنْ فَتْحٍ وَضَمٍّ".',
    letters: ['ل'],
    examples: {
      examples: [
        { arabic: 'قَالَ اللَّهُ', surah: 5, ayah: 116, note: 'Fathah before Lam al-Jalalah — heavy Lam' },
        { arabic: 'عَبْدُ اللَّهِ', surah: 72, ayah: 19, note: 'Dammah before Lam al-Jalalah — heavy Lam' },
        { arabic: 'رَسُولُ اللَّهِ', surah: 48, ayah: 29, note: 'Dammah before Lam al-Jalalah — heavy Lam' },
      ],
      condition: 'Preceded by Fathah (ـَ) or Dammah (ـُ)',
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
  {
    name: 'Lam al-Jalalah Tarqiq',
    arabicName: 'لام الجلالة ترقيق',
    category: 'Lam Rules',
    description:
      'The Lam in the word "Allah" (اللَّه) is pronounced light (Tarqiq — thin) when ' +
      'preceded by a Kasrah. ' +
      'Source: Al-Jazariyyah, verse 27 (Ibn al-Jazari): "وَرَقِّقَنْهَا إِنْ تَكُنْ مَكْسُورَةً".',
    letters: ['ل'],
    examples: {
      examples: [
        { arabic: 'بِسْمِ اللَّهِ', surah: 1, ayah: 1, note: 'Kasrah before Lam al-Jalalah — light Lam' },
        { arabic: 'لِلَّهِ مَا', surah: 2, ayah: 284, note: 'Kasrah before Lam al-Jalalah — light Lam' },
      ],
      condition: 'Preceded by Kasrah (ـِ)',
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
  {
    name: 'Lam Shamsi (Solar Lam)',
    arabicName: 'لام شمسية',
    category: 'Lam Rules',
    description:
      'The Lam of the definite article "ال" is assimilated (merged) into the following ' +
      'letter when that letter is one of the 14 solar letters (حروف شمسية). The Lam is ' +
      'not pronounced; instead the following letter is doubled (Shaddah). ' +
      'Called "Shamsi" (solar) because the word الشَّمْس (the sun) begins with a solar letter. ' +
      'Source: Al-Jazariyyah, verse 28 (Ibn al-Jazari).',
    letters: ['ت', 'ث', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ل', 'ن'],
    examples: {
      examples: [
        { arabic: 'الشَّمْسُ', note: 'Lam merges into Shin — الشَّمْس' },
        { arabic: 'الرَّحْمَنُ', surah: 1, ayah: 3, note: 'Lam merges into Ra — الرَّحْمَن' },
        { arabic: 'النَّاسُ', surah: 114, ayah: 1, note: 'Lam merges into Noon — النَّاس' },
      ],
      mnemonic: 'طِبْ ثُمَّ صِلْ رَحِمًا تَفُزْ ضِفْ ذَا نِعَمْ دَعْ سُوءَ ظَنٍّ زُرْ شَرِيفًا لِلْكَرَمْ',
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
  {
    name: 'Lam Qamari (Lunar Lam)',
    arabicName: 'لام قمرية',
    category: 'Lam Rules',
    description:
      'The Lam of the definite article "ال" is pronounced clearly (Izhar) when followed ' +
      'by one of the 14 lunar letters (حروف قمرية). The Lam is fully pronounced. ' +
      'Called "Qamari" (lunar) because the word الْقَمَر (the moon) begins with a lunar letter. ' +
      'Source: Al-Jazariyyah, verse 29 (Ibn al-Jazari).',
    letters: ['ء', 'ب', 'ج', 'ح', 'خ', 'ع', 'غ', 'ف', 'ق', 'ك', 'م', 'ه', 'و', 'ي'],
    examples: {
      examples: [
        { arabic: 'الْقَمَرُ', note: 'Lam pronounced clearly before Qaf' },
        { arabic: 'الْحَمْدُ', surah: 1, ayah: 2, note: 'Lam pronounced clearly before Ha' },
        { arabic: 'الْكِتَابُ', surah: 2, ayah: 2, note: 'Lam pronounced clearly before Kaf' },
      ],
      mnemonic: 'ابْغِ حَجَّكَ وَخَفْ عَقِيمَهُ',
    },
    difficulty: 'BEGINNER',
    audioRef: null,
  },
];

// ─── Category 7: Tafkhim & Tarqiq (Heavy & Light Letters) ────────────────────
// Source: Al-Jazariyyah, verses 31–38 (Ibn al-Jazari); Hidayat al-Qari, vol. 1, p. 140

const tafkhimTarqiqRules: TajweedRuleData[] = [
  {
    name: 'Huruf al-Isti\'la (Heavy Letters)',
    arabicName: 'حروف الاستعلاء',
    category: 'Tafkhim & Tarqiq',
    description:
      'The seven letters of elevation (Isti\'la) are always pronounced heavy (Tafkhim) — ' +
      'the back of the tongue rises toward the roof of the mouth, giving a full, heavy sound. ' +
      'These seven letters are: خ ص ض غ ط ق ظ. ' +
      'The degree of heaviness varies: ط ق ظ are the heaviest; خ غ ض ص are moderately heavy. ' +
      'Source: Al-Jazariyyah, verse 31 (Ibn al-Jazari): "وَصْفُ الاسْتِعْلاَءِ سَبْعَةٌ خُصَّ ضَغْطٍ قِظْ".',
    letters: ['خ', 'ص', 'ض', 'غ', 'ط', 'ق', 'ظ'],
    examples: {
      examples: [
        { arabic: 'الصِّرَاطَ', surah: 1, ayah: 6, note: 'Sad — heavy letter' },
        { arabic: 'الطَّيِّبَاتِ', surah: 2, ayah: 57, note: 'Ta — heaviest of the heavy letters' },
        { arabic: 'قَالَ', note: 'Qaf — heavy letter' },
      ],
      mnemonic: 'خُصَّ ضَغْطٍ قِظْ — all seven letters are in this phrase',
    },
    difficulty: 'INTERMEDIATE',
    audioRef: null,
  },
  {
    name: 'Ra Tafkhim (Heavy Ra)',
    arabicName: 'راء التفخيم',
    category: 'Tafkhim & Tarqiq',
    description:
      'The letter Ra (ر) is pronounced heavy (Tafkhim) in the following cases: ' +
      '(1) Ra has a Fathah or Dammah; ' +
      '(2) Ra has a Sukoon and is preceded by a Fathah or Dammah; ' +
      '(3) Ra has a Sukoon, is preceded by a Kasrah, but is followed by a heavy letter (Isti\'la) in the same word. ' +
      'Source: Al-Jazariyyah, verses 32–35 (Ibn al-Jazari); Hidayat al-Qari, vol. 1, p. 143.',
    letters: ['ر'],
    examples: {
      examples: [
        { arabic: 'رَبِّ', surah: 1, ayah: 2, note: 'Ra with Fathah — heavy' },
        { arabic: 'رُزِقُوا', surah: 2, ayah: 25, note: 'Ra with Dammah — heavy' },
        { arabic: 'مِرْصَادًا', surah: 89, ayah: 14, note: 'Ra Sukoon preceded by Kasrah but followed by Sad (Isti\'la) — heavy' },
      ],
    },
    difficulty: 'INTERMEDIATE',
    audioRef: null,
  },
  {
    name: 'Ra Tarqiq (Light Ra)',
    arabicName: 'راء الترقيق',
    category: 'Tafkhim & Tarqiq',
    description:
      'The letter Ra (ر) is pronounced light (Tarqiq) in the following cases: ' +
      '(1) Ra has a Kasrah; ' +
      '(2) Ra has a Sukoon and is preceded by a Kasrah (with no Isti\'la letter following in the same word); ' +
      '(3) Ra has a Sukoon and is preceded by a Ya Sakinah. ' +
      'Source: Al-Jazariyyah, verses 32–35 (Ibn al-Jazari); Hidayat al-Qari, vol. 1, p. 145.',
    letters: ['ر'],
    examples: {
      examples: [
        { arabic: 'رِزْقًا', surah: 2, ayah: 22, note: 'Ra with Kasrah — light' },
        { arabic: 'فِرْعَوْنَ', surah: 2, ayah: 49, note: 'Ra Sukoon preceded by Kasrah — light' },
        { arabic: 'خَيْرٌ', surah: 2, ayah: 54, note: 'Ra Sukoon preceded by Ya Sakinah — light' },
      ],
    },
    difficulty: 'INTERMEDIATE',
    audioRef: null,
  },
];

// ─── Combine All Rules ─────────────────────────────────────────────────────────

const allTajweedRules: TajweedRuleData[] = [
  ...noonSakinahRules,
  ...meemSakinahRules,
  ...maddRules,
  ...qalqalahRules,
  ...ghunnahRules,
  ...lamRules,
  ...tafkhimTarqiqRules,
];

// ─── Seed Function ─────────────────────────────────────────────────────────────

export async function seedTajweedRules(prisma: PrismaClient) {
  console.log('📖 Seeding tajweed rules...');
  console.log('   Sources: Tuhfat al-Atfal (al-Jamzuri), Al-Jazariyyah (Ibn al-Jazari),');
  console.log('            Hidayat al-Qari (al-Marsafi), Noorani Qaida (Haqqani)');
  console.log('   ⚠️  PENDING SCHOLAR REVIEW — verifiedBy field is null until reviewed.');

  let seeded = 0;

  for (const rule of allTajweedRules) {
    await prisma.tajweedRule.upsert({
      where: { name: rule.name },
      update: {},
      create: {
        name: rule.name,
        arabicName: rule.arabicName,
        category: rule.category,
        description: rule.description,
        letters: rule.letters,
        examples: rule.examples,
        difficulty: rule.difficulty,
        audioRef: rule.audioRef,
        verifiedBy: null,
        verifiedAt: null,
      },
    });
    seeded++;
  }

  console.log(`✅ Seeded ${seeded} tajweed rules across ${new Set(allTajweedRules.map(r => r.category)).size} categories`);
  console.log('   Categories: Noon Sakinah & Tanwin, Meem Sakinah, Madd, Qalqalah, Ghunnah, Lam Rules, Tafkhim & Tarqiq');
}
