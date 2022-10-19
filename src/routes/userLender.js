import express from "express";
import { userLenderChangePassword, userLenderLogin, userLenderRegistration } from "../controllers/userLender";
const router = express.Router();

router.post("/userLender/register", userLenderRegistration);
router.post("/userLender/login", userLenderLogin);
router.post("/userLender/change-password", userLenderChangePassword);

export default router;