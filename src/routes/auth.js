import express from "express";
import { userLogin, userRegistration } from "../controllers/auth";
const router = express.Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/change-password", );

export default router;