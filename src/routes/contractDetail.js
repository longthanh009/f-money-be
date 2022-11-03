import express from "express";
import { getContractDetails, createContractDetails, updateContractDetail, deleteContractDetail, getContractDetail } from "../controllers/contractDetail"
const router = express.Router();



/**
 * @swagger
 * tags:
 *  name: contractDetail
 *  description: This is for the main data
 * /api/contractDetail/:id:
 *  put:
 *      tags: [contractDetail]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.put("/contractDetail/:id", updateContractDetail);

/**
 * @swagger
 * tags:
 *  name: contractDetail
 *  description: This is for the main data
 * /api/contractDetail/:id:
 *  delete:
 *      tags: [contractDetail]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.delete("/contractDetail/:id", deleteContractDetail);

/**
 * @swagger
 * tags:
 *  name: contractDetail
 *  description: This is for the main data
 * /api/contractDetail/:id:
 *  get:
 *      tags: [contractDetail]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/contractDetail/:id", getContractDetail);

/**
 * @swagger
 * tags:
 *  name: contractDetail
 *  description: This is for the main data
 * /api/contractDetail:
 *  get:
 *      tags: [contractDetail]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/contractDetails", getContractDetails);

/**
 * @swagger
 * tags:
 *  name: contractDetail
 *  description: This is for the main data
 * /api/contractDetail:
 *  post:
 *      tags: [contractDetail]
 *      parameters:
 *     
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.post("/contractDetails", createContractDetails)

export default router;