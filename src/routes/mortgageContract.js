import express from "express";
import { create, getContractMortgage } from "../controllers/mortgageContract";
const router = express.Router();

router.post("/contractMortgage",create);
router.get("/contractMortgage",getContractMortgage);
