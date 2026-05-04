// TypeScript interfaces for the Quran App Backend

export interface SurahInfo {
  number: number;
  name: string; // Arabic name
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

export interface Ayah {
  number: number; // Global ayah number
  numberInSurah: number;
  text: string; // Arabic text
  translation: string; // English translation
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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
