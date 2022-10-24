import express from "express";
import { deleteBank,createBank,listBank,updateBank } from "../controllers/bankAccount";
const router = express.Router();

router.put("/bankAccount/:id", updateBank);
router.delete("/bankAccount/:id", deleteBank);
router.get("/bankAccount", listBank);
router.post("/bankAccount", createBank);

export default router;