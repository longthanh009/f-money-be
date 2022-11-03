import express from "express";
import { deleteService,createService,listService,updateService } from "../controllers/servicePack";
const router = express.Router();

router.put("/service/:id", updateService);
router.delete("/service/:id", deleteService);
router.get("/service", listService);
router.post("/service", createService);

export default router;
