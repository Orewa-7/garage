import express from "express";
import {
    getHoraires,
    updatehoraires,

} from "../controllers/heure.js"

const router = express.Router();

router.get("/", getHoraires);
router.post("/", updatehoraires);

export default router;
