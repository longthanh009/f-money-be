import express from "express";
import { create, getContractMortgages, getContractMortgage, deleteManyMortgage, deleteContractMortgage, contractsMgExcel, turnoverContractMonth} from "../controllers/mortgageContract";
import { jwtVerifyToken } from "../middlewares/verifyToken";
const router = express.Router();

router.post("/contractMortgage",jwtVerifyToken,create);
router.get("/contractMortgage",jwtVerifyToken,getContractMortgages);
router.get("/contractMortgage/:id",jwtVerifyToken,getContractMortgage);
router.get("/contractMortgageExcel",jwtVerifyToken,contractsMgExcel);
router.get("/contractMortgage-static", jwtVerifyToken, turnoverContractMonth)
router.delete("/contractMortgage/",jwtVerifyToken, deleteManyMortgage);
router.delete("/contractMortgage/:id",jwtVerifyToken, deleteContractMortgage);
export default router;
