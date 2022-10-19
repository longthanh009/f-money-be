import express from "express";
import { deleteUserLender, updateUserLender, userLenderChangePassword, userLenderLogin, userLenderRegistration } from "../controllers/userLender";
const router = express.Router();

router.post("/userLender/register", userLenderRegistration);
router.post("/userLender/login", userLenderLogin);
router.post("/userLender/change-password", userLenderChangePassword);
router.put("/userLender/:id", updateUserLender);
router.delete("/userLender/:id", deleteUserLender);
// router.get("/userLender/:id", getUser);
// router.get("/userLender", getUsers);

export default router;