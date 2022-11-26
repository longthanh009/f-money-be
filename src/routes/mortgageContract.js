import express from "express";
import { create, getContractMortgages, getContractMortgage,deleteManyMortgage} from "../controllers/mortgageContract";
const router = express.Router();

router.post("/contractMortgage",create);
router.get("/contractMortgage",getContractMortgages);
router.get("/contractMortgage/:id",getContractMortgage);
router.delete("/contractMortgage/", deleteManyMortgage);
export default router;
