import express from "express";
import { getContracts, createContracts, updateContract, deleteContract, getContract, deleteManyContract, checkCCCD, contractsExcel } from "../controllers/contract";
import { isLender } from "../middlewares/auth";
import { jwtVerifyToken } from "../middlewares/verifyToken";
const router = express.Router();

router.patch("/contract/:id", jwtVerifyToken, isLender, updateContract);
router.delete("/contract/:id", jwtVerifyToken, isLender, deleteContract);
router.delete("/contracts/", jwtVerifyToken, isLender, deleteManyContract);
router.get("/contract/:id", getContract);
router.get("/contracts", jwtVerifyToken, isLender, getContracts);
router.post("/contracts",jwtVerifyToken,isLender, createContracts)
router.get("/checkUser", checkCCCD)
router.get("/contractExcel", jwtVerifyToken,contractsExcel)

export default router;