import express from "express";
import { createSp, getSupportCs } from "../controllers/supportCs";
import { jwtVerifyToken } from "../middlewares/verifyToken";

const router = express.Router();
router.post("/sendSupport", createSp);
router.get("/sendSupport",jwtVerifyToken, getSupportCs);

export default router;