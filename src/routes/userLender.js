import express from "express";
import { userLenderRegistration } from "../controllers/userLender";
const router = express.Router();

router.post("/userLender/register", userLenderRegistration);
router.post("/userLender/login", );

export default router;