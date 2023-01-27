import express from "express";
import { create, getContractMortgages, getContractMortgage, deleteManyMortgage, deleteContractMortgage, contractsMgExcel, turnoverContractMonth} from "../controllers/mortgageContract";
import { jwtVerifyToken } from "../middlewares/verifyToken";
const router = express.Router();

router.post("/contractMortgage",create);
router.get("/contractMortgage",jwtVerifyToken,getContractMortgages);
router.get("/contractMortgage/:id",getContractMortgage);
router.get("/contractMortgageExcel",contractsMgExcel);
router.get("/contractMortgage-static", jwtVerifyToken, turnoverContractMonth)
router.delete("/contractMortgage/", deleteManyMortgage);
router.delete("/contractMortgage/:id", deleteContractMortgage);
export default router;
