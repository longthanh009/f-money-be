import express from "express";
import { adminRegistration } from "../controllers/admin";
const router = express.Router();

router.post("/admin/register", adminRegistration);
router.post("/admin/login", );
router.post("/admin/change-password", );

export default router;