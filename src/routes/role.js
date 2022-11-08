import express from "express";
import { deleteRole, listRole, proRole } from "../controllers/role";

const router = express.Router();



/**
 * @swagger
 * tags:
 *  name: Role
 *  description: This is for the main data
 * /api/roles/:id:
 *  delete:
 *      tags: [Role]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.delete("/roles/:id", proRole);

/**
 * @swagger
 * tags:
 *  name: Role
 *  description: This is for the main data
 * /api/roles/:id:
 *  get:
 *      tags: [Role]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
 router.delete("/roles/:id", deleteRole);

/**
 * @swagger
 * tags:
 *  name: Role
 *  description: This is for the main data
 * /api/roles:
 *  get:
 *      tags: [Role]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/roles", listRole);

/**
 * @swagger
 * tags:
 *  name: Role
 *  description: This is for the main data
 * /api/roles:
 *  post:
 *      tags: [Role]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.post("/roles", deleteRole);

export default router;