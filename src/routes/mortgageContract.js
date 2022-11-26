import express from "express";
import { create, getContractMortgages, getContractMortgage, deleteManyMortgage, deleteContractMortgage} from "../controllers/mortgageContract";
const router = express.Router();

router.post("/contractMortgage",create);
router.get("/contractMortgage",getContractMortgages);
router.get("/contractMortgage/:id",getContractMortgage);
router.delete("/contractMortgage/", deleteManyMortgage);
router.delete("/contractMortgage/:id", deleteContractMortgage);
export default router;
