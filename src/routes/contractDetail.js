import express from "express";
import {getContractDetails,createContractDetails} from "../controllers/contractDetail"
const router = express.Router();

router.put("/contractDetail/:id", );
router.delete("/contractDetail/:id", );
router.get("/contractDetail/:id", );
router.get("/contractDetails",getContractDetails);
router.post("/contractDetails", createContractDetails)

export default router;