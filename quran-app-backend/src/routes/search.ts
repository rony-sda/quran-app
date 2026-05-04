import { Router } from "express";
import type { Request, Response } from "express";
import { searchAyahs } from "../services/quranService.js";

const router = Router();

/**
 * GET /api/search?q=query&limit=30
 * Search ayahs by Arabic or English translation text
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string) || "";
    const limit = parseInt((req.query.limit as string) || "30", 10);

    if (!query || query.trim().length < 2) {
      res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters.",
      });
      return;
    }

    const results = await searchAyahs(query.trim(), Math.min(limit, 50));
    res.json({ success: true, data: results, count: results.length });
  } catch (error) {
    console.error("Error in GET /api/search:", error);
    res.status(500).json({ success: false, message: "Search failed" });
  }
});

export default router;
