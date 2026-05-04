import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import surahRoutes from "./routes/surahs.js";
import searchRoutes from "./routes/search.js";
import { preloadAllSurahs } from "./services/quranService.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
  ],
  methods: ["GET"],
}));
app.use(express.json());

// Routes
app.use("/api/surahs", surahRoutes);
app.use("/api/search", searchRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Quran App Backend is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Quran App Backend running at http://localhost:${PORT}`);
  console.log(`📚 API endpoints:`);
  console.log(`   GET /api/surahs         — List all 114 surahs`);
  console.log(`   GET /api/surahs/:id     — Get surah with ayahs`);
  console.log(`   GET /api/search?q=...   — Search ayahs`);
  console.log(`   GET /api/health         — Health check`);
  
  // Start background preloading (non-blocking)
  preloadAllSurahs().catch((err) => {
    console.warn("Background preload failed:", err);
  });
});
