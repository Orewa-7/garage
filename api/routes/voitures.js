import express from "express";
import {
  addVoiture,
  deleteVoiture,
  getVoiture,
  getVoitures,
  updateVoiture,
} from "../controllers/voiture.js";

const router = express.Router();

router.get("/", getVoitures);
router.get("/:id", getVoiture);
router.post("/", addVoiture);
router.delete("/:id", deleteVoiture);
router.put("/:id", updateVoiture);

export default router;
