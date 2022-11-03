import express from "express";
import { deleteService, createService, listService, updateService } from "../controllers/servicePack";
const router = express.Router();


/**
 * @swagger
 * tags:
 *  name: Service
 *  description: This is for the main data
 * /api/service/:id:
 *  put:
 *      tags: [Service]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.put("/service/:id", updateService);

/**
 * @swagger
 * tags:
 *  name: Service
 *  description: This is for the main data
 * /api/service/:id:
 *  delete:
 *      tags: [Service]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.delete("/service/:id", deleteService);


/**
 * @swagger
 * tags:
 *  name: Service
 *  description: This is for the main data
 * /api/service:
 *  get:
 *      tags: [Service]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/service", listService);

/**
 * @swagger
 * tags:
 *  name: Service
 *  description: This is for the main data
 * /api/service:
 *  post:
 *      tags: [Service]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.post("/service", createService);

export default router;