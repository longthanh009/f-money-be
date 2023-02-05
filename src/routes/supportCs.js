import express from "express";
import { createSp, getSupportCs, updateSupportCs } from "../controllers/supportCs";
import { jwtVerifyToken } from "../middlewares/verifyToken";

const router = express.Router();
router.post("/sendSupport", createSp);
router.get("/sendSupport",jwtVerifyToken, getSupportCs);
router.patch("/sendSupport/:id", updateSupportCs);

export default router;