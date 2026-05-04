import { Router } from "express";
import type { Request, Response } from "express";
import { getAllSurahs, getSurahById, searchAyahs } from "../services/quranService.js";

const router = Router();

/**
 * GET /api/surahs
 * Returns metadata for all 114 surahs
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const surahs = await getAllSurahs();
    res.json({ success: true, data: surahs });
  } catch (error) {
    console.error("Error in GET /api/surahs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch surah list" });
  }
});

/**
 * GET /api/surahs/:id
 * Returns full surah detail with all ayahs (Arabic + English)
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id) || id < 1 || id > 114) {
      res.status(400).json({
        success: false,
        message: "Invalid surah ID. Must be between 1 and 114.",
      });
      return;
    }

    const surah = await getSurahById(id);

    if (!surah) {
      res.status(404).json({ success: false, message: "Surah not found" });
      return;
    }

    res.json({ success: true, data: surah });
  } catch (error) {
    console.error(`Error in GET /api/surahs/${req.params.id}:`, error);
    res.status(500).json({ success: false, message: "Failed to fetch surah" });
  }
});

export default router;
