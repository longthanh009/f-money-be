import express from "express";
import { userLogin, userRegistration,changePassword } from "../controllers/auth";
const router = express.Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/change-password", changePassword);

export default router;