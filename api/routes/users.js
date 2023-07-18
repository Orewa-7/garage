import express from "express"
import { isAdmin } from "../controllers/user.js";

const router = express.Router()

router.get("/isAdmin", isAdmin);

export default router