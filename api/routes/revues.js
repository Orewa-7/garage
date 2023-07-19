import express from "express";
import {
    getApprouvedRevue,
    getAllRevue,
    addRevue,
    deleteRevue,
    ApprouveRevue

} from "../controllers/revu.js";

const router = express.Router();

router.get("/", getApprouvedRevue);
router.get("/all", getAllRevue);
router.post("/", addRevue);
router.delete("/:id", deleteRevue);
router.put("/:id", ApprouveRevue);

export default router;
