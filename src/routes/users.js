import express from "express";
import { Registration } from "../controllers/auth";

const router = express.Router();

router.post("/users/register", Registration);
router.post("/users/login", );
router.post("/users/change-password", );
router.put("/users/:id", );
router.delete("/users/:id", );
router.get("/users/:id", );
router.get("/users", );




export default router;