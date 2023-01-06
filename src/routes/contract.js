import express from "express";
import { getContracts, createContracts, updateContract, deleteContract, getContract, deleteManyContract, checkCCCD, contractsExcel } from "../controllers/contract";
import { jwtVerifyToken } from "../middlewares/verifyToken";
const router = express.Router();

router.patch("/contract/:id", updateContract);
router.delete("/contract/:id", deleteContract);
router.delete("/contracts/", deleteManyContract);
router.get("/contract/:id", getContract);
router.get("/contracts",jwtVerifyToken, getContracts);
router.post("/contracts", createContracts)
router.get("/checkUser", checkCCCD)
router.get("/contractExcel", contractsExcel)

export default router;