import express from "express";
import { Login, logout, Registration } from "../controllers/auth";

const router = express.Router();

router.post("/users/register", Registration);
router.post("/users/login", Login);
router.get("/users/logout", logout);
router.post("/users/change-password", );
router.put("/users/:id", );
router.delete("/users/:id", );
router.get("/users/:id", );
router.get("/users", );




export default router;