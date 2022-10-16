import express from "express";
import {getContract, updateContract , deleteContract , getContracts ,createContracts} from "../controllers/contract";

const router = express.Router();

router.put("/contract/:id", updateContract);
router.delete("/contract/:id", deleteContract);
router.get("/contract/:id", getContract);
router.get("/contracts", getContracts);
router.post("/contracts", createContracts)

export default router;