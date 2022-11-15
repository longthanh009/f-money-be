import express from "express";
import { createSp } from "../controllers/supportCs";

const router = express.Router();
router.post("/sendSupport", createSp);

export default router;