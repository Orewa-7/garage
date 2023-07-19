import express from "express"
import { isAdmin, isEmploye } from "../controllers/user.js";

const router = express.Router()

router.get("/isAdmin", isAdmin);
router.get("/isEmploye", isEmploye);

export default router