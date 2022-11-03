import express from "express";
import {getContractDetails,createContractDetails,updateContractDetail,deleteContractDetail,getContractDetail} from "../controllers/contractDetail"
const router = express.Router();

router.put("/contractDetail/:id", updateContractDetail);
router.delete("/contractDetail/:id", deleteContractDetail);
router.get("/contractDetail/:id", getContractDetail);
router.get("/contractDetails",getContractDetails);
router.post("/contractDetails", createContractDetails)

export default router;