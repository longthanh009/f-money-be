import express from "express";
import {getContracts,createContracts,updateContract,deleteContract,getContract} from "../controllers/contract";
const router = express.Router();

router.put("/contract/:id", updateContract);
router.delete("/contract/:id", deleteContract);
router.get("/contract/:id", getContract);
router.get("/contracts", getContracts);
router.post("/contracts", createContracts)

export default router;