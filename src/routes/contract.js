import express from "express";
import { getContracts, createContracts, updateContract, getContract, deleteManyContract, checkCCCD, contractsExcel, getContractHis ,contractsStatistic,turnoverContractMonth, closeContract} from "../controllers/contract";
import { isLender } from "../middlewares/auth";
import { upload } from "../middlewares/fileUpload";
import { jwtVerifyToken } from "../middlewares/verifyToken";
const router = express.Router();
const newUpload = upload();
router.patch("/contract/:id", jwtVerifyToken, updateContract);
router.patch("/contract/close/:id", jwtVerifyToken, closeContract);
router.delete("/contracts/", jwtVerifyToken, isLender, deleteManyContract);
router.get("/contract/:id", getContract);
router.get("/contracts", jwtVerifyToken, getContracts);
router.get("/user-contracts", jwtVerifyToken, getContractHis);
router.post("/contracts", jwtVerifyToken, createContracts)
router.get("/contracts-static", jwtVerifyToken, turnoverContractMonth)
router.get("/checkUser", checkCCCD)
router.get("/contractExcel", contractsExcel)
export default router;