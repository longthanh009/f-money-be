import express from "express";
import { login, logout, Registration, usersChangePassword } from "../controllers/auth";
import { deleteManyUser, deleteUser, getUser, getUsers, searchUsers, updateUser } from "../controllers/users";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/users/register", Registration);
router.post("/users/login", login);
router.get("/users/logout", logout);
router.post("/users/change-password", usersChangePassword);
router.get("/users/search/:key", searchUsers);

router.delete("/users", deleteManyUser);


export default router;