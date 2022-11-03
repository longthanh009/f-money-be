import express from "express";
import {getContractDetails,createContractDetails,updateContractDetail} from "../controllers/contractDetail"
const router = express.Router();

router.put("/contractDetail/:id", updateContractDetail);
router.delete("/contractDetail/:id", );
router.get("/contractDetail/:id", );
router.get("/contractDetails",getContractDetails);
router.post("/contractDetails", createContractDetails)

export default router;