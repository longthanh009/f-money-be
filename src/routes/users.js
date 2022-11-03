import express from "express";
import { login, logout, Registration, usersChangePassword } from "../controllers/auth";
import { deleteUser, getUser, getUsers, searchUsers, updateUser } from "../controllers/users";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: User
 *  description: This is for the main data
 */

/**
 * @swagger
 * /api/users:
 *  GET:
 *    description: users to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/users", getUsers);

/**
 * @swagger
 * /api/users/:id:
 *  GET:
 *    description: users to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/users/:id", getUser);

router.post("/users/register", Registration);
router.post("/users/login", login);
router.get("/users/logout", logout);
router.post("/users/change-password", usersChangePassword);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);


router.get("/users/search/:key", searchUsers);




export default router;