import express from "express";
import {getContractDetails} from "../controllers/contractDetail"
const router = express.Router();

router.put("/contractDetail/:id", );
router.delete("/contractDetail/:id", );
router.get("/contractDetail/:id", );
router.get("/contractDetails",getContractDetails);
router.post("/contractDetails", )

export default router;