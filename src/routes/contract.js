import express from "express";
import {getContract, updateContract , deleteContract} from "../controllers/contract";

const router = express.Router();

router.put("/contract/:id", updateContract);
router.delete("/contract", deleteContract);
router.get("/contract/:id", getContract);
router.get("/contracts", );

export default router;