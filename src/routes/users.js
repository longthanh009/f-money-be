import express from "express";
import { history, Login, logout, refreshToken, Registration } from "../controllers/auth";

const router = express.Router();

router.post("/users/register", Registration);
router.post("/users/login", Login);
router.get("/users/logout", logout);
router.get('/users/refresh_token', refreshToken);
router.get('/history', history);
router.post("/users/change-password", );
router.put("/users/:id", );
router.delete("/users/:id", );
router.get("/users/:id", );
router.get("/users", );




export default router;