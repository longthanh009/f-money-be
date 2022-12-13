import express from "express";
import { create, getContractMortgages, getContractMortgage, deleteManyMortgage, deleteContractMortgage, contractsMgExcel} from "../controllers/mortgageContract";
const router = express.Router();

router.post("/contractMortgage",create);
router.get("/contractMortgage",getContractMortgages);
router.get("/contractMortgage/:id",getContractMortgage);
router.get("/contractMortgageExcel",contractsMgExcel);
router.delete("/contractMortgage/", deleteManyMortgage);
router.delete("/contractMortgage/:id", deleteContractMortgage);
export default router;
