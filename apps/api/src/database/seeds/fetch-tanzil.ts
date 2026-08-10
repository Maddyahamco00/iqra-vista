import axios from 'axios';

export interface TanzilSurah {
  index: number;
  name: string;
  englishName: string;
  verseCount: number;
}

export interface TanzilVerse {
  surah: number;
  ayah: number;
  text: string;
}

const TANZIL_SURAH_LIST_URL = 'https://api.alquran.cloud/v1/surah';
const TANZIL_VERSE_BASE_URL = 'https://api.alquran.cloud/v1/surah';

/**
 * Fetch all 114 surah names and metadata from verified source
 * Uses AlQuran.cloud API (aggregates Tanzil + other verified sources)
 */
export async function fetchSurahList(): Promise<TanzilSurah[]> {
  try {
    const response = await axios.get(TANZIL_SURAH_LIST_URL);
    const surahs = response.data.data.map((s: any) => ({
      index: s.number,
      name: s.name, // Arabic name
      englishName: s.englishName,
      verseCount: s.numberOfAyahs,
    }));
    console.log(`📥 Fetched ${surahs.length} surahs from verified source`);
    return surahs;
  } catch (error) {
    console.error('❌ Failed to fetch surah list:', error);
    throw new Error('Could not fetch surah metadata from verified source');
  }
}

/**
 * Fetch all verses for a specific surah
 * @param surahNumber - 1 to 114
 */
export async function fetchVersesForSurah(surahNumber: number): Promise<TanzilVerse[]> {
  try {
    // Fetch Arabic text
    const arabicRes = await axios.get(`${TANZIL_VERSE_BASE_URL}/${surahNumber}`);
    const verses = arabicRes.data.data.ayahs.map((ayah: any) => ({
      surah: surahNumber,
      ayah: ayah.numberInSurah,
      text: ayah.text,
    }));

    // Fetch transliteration
    try {
      const transRes = await axios.get(`${TANZIL_VERSE_BASE_URL}/${surahNumber}/en.transliteration`);
      verses.forEach((v: TanzilVerse, i: number) => {
        (v as any).transliteration = transRes.data.data.ayahs[i]?.text || '';
      });
    } catch (e) {
      console.warn(`⚠️ No transliteration available for surah ${surahNumber}`);
    }

    // Fetch English translation (Sahih International - verified Sunni translation)
    try {
      const transEnRes = await axios.get(`${TANZIL_VERSE_BASE_URL}/${surahNumber}/en.sahih`);
      verses.forEach((v: TanzilVerse, i: number) => {
        (v as any).translation = transEnRes.data.data.ayahs[i]?.text || '';
      });
    } catch (e) {
      console.warn(`⚠️ No translation available for surah ${surahNumber}`);
    }

    console.log(`📥 Fetched ${verses.length} verses for Surah ${surahNumber}`);
    return verses;
  } catch (error) {
    console.error(`❌ Failed to fetch verses for surah ${surahNumber}:`, error);
    throw new Error(`Could not fetch verses for surah ${surahNumber}`);
  }
}

/**
 * Fetch all verses for all surahs (use sparingly - 6,236 verses)
 * Recommended: Run once and cache, or seed in batches
 */
export async function fetchAllVerses(): Promise<TanzilVerse[]> {
  const allVerses: TanzilVerse[] = [];
  for (let i = 1; i <= 114; i++) {
    const verses = await fetchVersesForSurah(i);
    allVerses.push(...verses);
    // Small delay to be respectful to the API
    await new Promise(r => setTimeout(r, 100));
  }
  console.log(`📥 Fetched total ${allVerses.length} verses from verified source`);
  return allVerses;
}
