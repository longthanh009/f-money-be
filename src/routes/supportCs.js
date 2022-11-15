import express from "express";
import { createSp, getSupportCs } from "../controllers/supportCs";

const router = express.Router();
router.post("/sendSupport", createSp);
router.get("/sendSupport", getSupportCs);

export default router;