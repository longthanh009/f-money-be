import express from "express";
import { createLoan, getMenuLoan } from "../controllers/menuLoan";
const router = express.Router();

router.post("/menuLoan", createLoan);
router.get("/menuLoan", getMenuLoan);

export default router;