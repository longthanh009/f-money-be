import express from "express";
import { login, logout, Registration, usersChangePassword } from "../controllers/auth";
import { deleteManyUser, deleteUser, deleteUsers, getUser, getUsers, searchUsers, updateUser } from "../controllers/users";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: This is for the main data
 * /api/users:
 *  get:
 *      tags: [Users]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/users", getUsers);

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: This is for the main data
 * /api/users/:id:
 *  get:
 *      tags: [Users]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/users/:id", getUser);

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: This is for the main data
 * /api/users/:id:
 *  put:
 *      tags: [Users]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.put("/users/:id", updateUser);


/**
 * @swagger
 * tags:
 *  name: Users
 *  description: This is for the main data
 * /api/users/:id:
 *  delete:
 *      tags: [Users]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.delete("/users/:id", deleteUser);

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: This is for the main data
 * /api/users/:id:
 *  delete:
 *      tags: [Users]
 *      parameters:
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
 router.delete("/users/", deleteUsers);

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: This is for the main data
 * /users/register:
 *  post:
 *      tags: [Users]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.post("/users/register", Registration);


/**
 * @swagger
 * tags:
 *  name: Users
 *  description: This is for the main data
 * /users/login:
 *  post:
 *      tags: [Users]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.post("/users/login", login);

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: This is for the main data
 * /users/logout:
 *  get:
 *      tags: [Users]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/users/logout", logout);


/**
 * @swagger
 * tags:
 *  name: Users
 *  description: This is for the main data
 * /users/change-password:
 *  post:
 *      tags: [Users]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.post("/users/change-password", usersChangePassword);


/**
 * @swagger
 * tags:
 *  name: Users
 *  description: This is for the main data
 * /users/search/:key:
 *  post:
 *      tags: [Users]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/users/search/:key", searchUsers);

router.delete("/users", deleteManyUser);


export default router;