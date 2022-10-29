import express from "express";
import { deleteUsers, getUser, getUsers, history, Login, logout, refreshToken, Registration, searchUsers, updateUsers, usersChangePassword } from "../controllers/auth";

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
router.post("/users/login", Login);
router.get("/users/logout", logout);
router.get('/users/refresh_token', refreshToken);
router.get('/history', history);
router.post("/users/change-password", usersChangePassword);
router.put("/users/:id", updateUsers);
router.delete("/users/:id", deleteUsers);
router.get("/users/:id", getUser);
router.get("/users", getUsers);
router.get("/users/search/:key", searchUsers);




export default router;