import express from "express";
import {getContracts,createContracts,updateContract,deleteContract} from "../controllers/contract";
const router = express.Router();

router.put("/contract/:id", updateContract);
router.delete("/contract/:id", deleteContract);
router.get("/contract/:id", );
router.get("/contracts", getContracts);
router.post("/contracts", createContracts)

export default router;