import express from "express";
import { deleteBank, createBank, listBank, updateBank, getBank } from "../controllers/bankAccount";
const router = express.Router();

router.get("/bankAccount/:id", getBank);
/**
 * @swagger
 * tags:
 *  name: bankAccount
 *  description: This is for the main data
 * /api/bankAccount/:id:
 *  put:
 *      tags: [bankAccount]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.put("/bankAccount/:id", updateBank);

/**
 * @swagger
 * tags:
 *  name: bankAccount
 *  description: This is for the main data
 * /api/bankAccount/:id:
 *  delete:
 *      tags: [bankAccount]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.delete("/bankAccount/:id", deleteBank);


/**
 * @swagger
 * tags:
 *  name: bankAccount
 *  description: This is for the main data
 * /api/bankAccount:
 *  get:
 *      tags: [bankAccount]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/bankAccount", listBank);

/**
 * @swagger
 * tags:
 *  name: bankAccount
 *  description: This is for the main data
 * /api/bankAccount:
 *  post:
 *      tags: [bankAccount]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.post("/bankAccount", createBank);

export default router;