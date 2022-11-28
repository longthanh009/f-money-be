import express from "express";
import { getContracts, createContracts, updateContract, deleteContract, getContract, deleteManyContract, checkCCCD } from "../controllers/contract";
const router = express.Router();


/**
 * @swagger
 * tags:
 *  name: contracts
 *  description: This is for the main data
 * /api/contract/:id:
 *  put:
 *      tags: [contracts]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.put("/contract/:id", updateContract);

/**
 * @swagger
 * tags:
 *  name: contracts
 *  description: This is for the main data
 * /api/contract/:id:
 *  delete:
 *      tags: [contracts]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.delete("/contract/:id", deleteContract);
/**
 * @swagger
 * tags:
 *  name: contracts
 *  description: This is for the main data
 * /api/contract/:id:
 *  delete:
 *      tags: [contracts]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
 router.delete("/contracts/", deleteManyContract);
 
/**
 * @swagger
 * tags:
 *  name: contracts
 *  description: This is for the main data
 * /api/contract/:id:
 *  get:
 *      tags: [contracts]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/contract/:id", getContract);

/**
 * @swagger
 * tags:
 *  name: contracts
 *  description: This is for the main data
 * /api/contracts:
 *  get:
 *      tags: [contracts]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/contracts", getContracts);

/**
 * @swagger
 * tags:
 *  name: contracts
 *  description: This is for the main data
 * /api/contracts:
 *  post:
 *      tags: [contracts]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.post("/contracts", createContracts)
router.get("/checkUser", checkCCCD)

export default router;