import express from "express";
import { adminLogin, adminRegistration } from "../controllers/admin";
const router = express.Router();

router.post("/admin/register", adminRegistration);
router.post("/admin/login", adminLogin);

export default router;