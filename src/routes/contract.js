import express from "express";
import { getContracts, createContracts, updateContract, deleteContract, getContract, deleteManyContract, checkCCCD, contractsExcel } from "../controllers/contract";
import { isLender } from "../middlewares/auth";
import { upload } from "../middlewares/fileUpload";
import { jwtVerifyToken } from "../middlewares/verifyToken";
const router = express.Router();
const newUpload = upload();
router.patch("/contract/:id", jwtVerifyToken, isLender, updateContract);
router.delete("/contract/:id", jwtVerifyToken, isLender, deleteContract);
router.delete("/contracts/", jwtVerifyToken, isLender, deleteManyContract);
router.get("/contract/:id", getContract);
router.get("/contracts", jwtVerifyToken, getContracts);
router.post("/contracts", jwtVerifyToken, createContracts)
router.get("/checkUser", checkCCCD)
router.get("/contractExcel", jwtVerifyToken, contractsExcel)
export default router;