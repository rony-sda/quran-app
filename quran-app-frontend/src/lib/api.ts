// API helper functions for the Quran App Frontend

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// --- Types ---

export interface SurahInfo {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation: string;
  juz: number;
  page: number;
  audioUrl: string;
}

export interface SurahDetail extends SurahInfo {
  ayahs: Ayah[];
}

export interface SearchResult {
  surahNumber: number;
  surahEnglishName: string;
  surahName: string;
  ayahNumber: number;
  numberInSurah: number;
  arabicText: string;
  translation: string;
}

// --- API Functions ---

/**
 * Fetch list of all 114 surahs
 */
export async function fetchSurahs(): Promise<SurahInfo[]> {
  const res = await fetch(`${API_BASE}/surahs`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch surahs");
  const json = await res.json();
  return json.data;
}

/**
 * Fetch a specific surah with all ayahs
 */
export async function fetchSurah(id: number): Promise<SurahDetail> {
  const res = await fetch(`${API_BASE}/surahs/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch surah ${id}`);
  const json = await res.json();
  return json.data;
}

/**
 * Search ayahs by query text
 */
export async function searchAyahs(query: string): Promise<SearchResult[]> {
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&limit=30`);
  if (!res.ok) throw new Error("Search failed");
  const json = await res.json();
  return json.data;
}

/**
 * Client-side fetch for surahs (no Next.js cache options)
 */
export async function fetchSurahsClient(): Promise<SurahInfo[]> {
  const res = await fetch(`${API_BASE}/surahs`);
  if (!res.ok) throw new Error("Failed to fetch surahs");
  const json = await res.json();
  return json.data;
}

/**
 * Client-side fetch for a specific surah
 */
export async function fetchSurahClient(id: number): Promise<SurahDetail> {
  const res = await fetch(`${API_BASE}/surahs/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch surah ${id}`);
  const json = await res.json();
  return json.data;
}
