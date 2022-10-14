import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user";
const router = express.Router();

router.put("/users/:id", updateUser);
router.delete("/users", deleteUser);
router.get("/users/:id", getUser);
router.get("/users", getUsers);


export default router;