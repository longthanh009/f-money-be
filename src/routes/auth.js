import express from "express";
import { userRegistration } from "../controllers/auth";
const router = express.Router();

router.post("/register", userRegistration);
router.post("/login", );
router.post("/change-password", );

export default router;