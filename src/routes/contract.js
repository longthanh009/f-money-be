import express from "express";
import {getContracts,createContracts,updateContract} from "../controllers/contract";
const router = express.Router();

router.put("/contract/:id", updateContract);
router.delete("/contract/:id", );
router.get("/contract/:id", );
router.get("/contracts", getContracts);
router.post("/contracts", createContracts)

export default router;