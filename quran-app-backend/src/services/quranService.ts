import type { SurahInfo, SurahDetail, Ayah, SearchResult } from "../types/index.js";

const API_BASE = process.env.QURAN_API_BASE || "https://api.alquran.cloud/v1";
const AUDIO_BASE = "https://cdn.islamic.network/quran/audio/128/ar.alafasy";

// In-memory cache
let surahListCache: SurahInfo[] | null = null;
let surahDetailCache: Map<number, SurahDetail> = new Map();

/**
 * Fetch the list of all 114 surahs (metadata only)
 */
export async function getAllSurahs(): Promise<SurahInfo[]> {
  if (surahListCache) {
    return surahListCache;
  }

  try {
    const response = await fetch(`${API_BASE}/surah`);
    const json = await response.json();

    if (json.code !== 200) {
      throw new Error(`API returned status ${json.code}`);
    }

    surahListCache = json.data.map((s: any) => ({
      number: s.number,
      name: s.name,
      englishName: s.englishName,
      englishNameTranslation: s.englishNameTranslation,
      numberOfAyahs: s.numberOfAyahs,
      revelationType: s.revelationType === "Medinan" ? "Medinan" : "Meccan",
    }));

    return surahListCache!;
  } catch (error) {
    console.error("Error fetching surah list:", error);
    throw error;
  }
}

/**
 * Fetch a specific surah with all its ayahs (Arabic + English translation)
 */
export async function getSurahById(id: number): Promise<SurahDetail | null> {
  if (id < 1 || id > 114) return null;

  if (surahDetailCache.has(id)) {
    return surahDetailCache.get(id)!;
  }

  try {
    // Fetch Arabic and English translation in parallel
    const [arabicRes, englishRes] = await Promise.all([
      fetch(`${API_BASE}/surah/${id}/ar.alafasy`),
      fetch(`${API_BASE}/surah/${id}/en.sahih`),
    ]);

    const arabicJson = await arabicRes.json();
    const englishJson = await englishRes.json();

    if (arabicJson.code !== 200 || englishJson.code !== 200) {
      throw new Error("API returned error for surah fetch");
    }

    const arabicData = arabicJson.data;
    const englishData = englishJson.data;

    // Merge Arabic text with English translation
    const ayahs: Ayah[] = arabicData.ayahs.map((arabicAyah: any, index: number) => {
      const englishAyah = englishData.ayahs[index];
      return {
        number: arabicAyah.number,
        numberInSurah: arabicAyah.numberInSurah,
        text: arabicAyah.text,
        translation: englishAyah.text,
        juz: arabicAyah.juz,
        page: arabicAyah.page,
        audioUrl: `${AUDIO_BASE}/${arabicAyah.number}.mp3`,
      };
    });

    const surahDetail: SurahDetail = {
      number: arabicData.number,
      name: arabicData.name,
      englishName: arabicData.englishName,
      englishNameTranslation: arabicData.englishNameTranslation,
      numberOfAyahs: arabicData.numberOfAyahs,
      revelationType: arabicData.revelationType === "Medinan" ? "Medinan" : "Meccan",
      ayahs,
    };

    surahDetailCache.set(id, surahDetail);
    return surahDetail;
  } catch (error) {
    console.error(`Error fetching surah ${id}:`, error);
    throw error;
  }
}

/**
 * Search ayahs across all surahs by translation text or Arabic text.
 * This loads all surahs progressively and searches through them.
 * For performance, we limit results and search term must be at least 3 chars.
 */
export async function searchAyahs(query: string, limit: number = 30): Promise<SearchResult[]> {
  if (!query || query.length < 2) return [];

  const results: SearchResult[] = [];
  const searchLower = query.toLowerCase();

  // First, ensure surah list is loaded
  const surahs = await getAllSurahs();

  // Search through each surah (loading as needed)
  for (const surah of surahs) {
    if (results.length >= limit) break;

    try {
      const detail = await getSurahById(surah.number);
      if (!detail) continue;

      for (const ayah of detail.ayahs) {
        if (results.length >= limit) break;

        const matchesTranslation = ayah.translation.toLowerCase().includes(searchLower);
        const matchesArabic = ayah.text.includes(query);

        if (matchesTranslation || matchesArabic) {
          results.push({
            surahNumber: surah.number,
            surahEnglishName: surah.englishName,
            surahName: surah.name,
            ayahNumber: ayah.number,
            numberInSurah: ayah.numberInSurah,
            arabicText: ayah.text,
            translation: ayah.translation,
          });
        }
      }
    } catch {
      // Skip surahs that fail to load during search
      continue;
    }
  }

  return results;
}

/**
 * Helper: delay for ms milliseconds
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Preload all surahs into cache (call at startup for faster searches).
 * This runs in the background and doesn't block startup.
 * Uses small batches with delays to avoid API rate limiting.
 */
export async function preloadAllSurahs(): Promise<void> {
  console.log("⏳ Starting background preload of all 114 surahs...");
  const surahs = await getAllSurahs();
  
  let loaded = 0;
  const failed: number[] = [];

  // Load in batches of 2 with 1s delay to avoid rate limiting
  for (let i = 0; i < surahs.length; i += 2) {
    const batch = surahs.slice(i, i + 2);
    await Promise.all(
      batch.map(async (surah) => {
        try {
          await getSurahById(surah.number);
          loaded++;
          if (loaded % 20 === 0) {
            console.log(`  📖 Loaded ${loaded}/114 surahs...`);
          }
        } catch {
          failed.push(surah.number);
        }
      })
    );
    // Delay between batches to respect API rate limits
    await delay(800);
  }

  // Retry failed surahs one at a time with longer delays
  if (failed.length > 0) {
    console.log(`  🔄 Retrying ${failed.length} failed surahs...`);
    for (const surahNum of failed) {
      try {
        await delay(1500);
        await getSurahById(surahNum);
        loaded++;
      } catch {
        console.warn(`  ⚠️ Failed to preload surah ${surahNum} after retry`);
      }
    }
  }
  
  console.log(`✅ Preload complete! ${loaded}/114 surahs cached.`);
}
