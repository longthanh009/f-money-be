import express from "express";
import { login, logout, Registration, usersChangePassword } from "../controllers/auth";
import { deleteUser, getUser, getUsers, searchUsers, updateUser } from "../controllers/users";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 */

router.post("/users/register", Registration);
router.post("/users/login", login);
router.get("/users/logout", logout);
router.post("/users/change-password", usersChangePassword);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.get("/users/:id", getUser);
router.get("/users", getUsers);
router.get("/users/search/:key", searchUsers);




export default router;