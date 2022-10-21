import express from "express";
import { adminLogin, adminLogout, adminRegistration } from "../controllers/admin";
const router = express.Router();

router.post("/admin/register", adminRegistration);
router.post("/admin/login", adminLogin);
router.get("/admin/logout", adminLogout);

export default router;