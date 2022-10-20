import express from "express";
import {userLenderRegistration,userLenderLogin,deleteUserLender, getUserLender, getUsersLenders, logoutUsersLenders, updateUserLender, userLenderChangePassword, userLenderLogin, userLenderRegistration } from "../controllers/userLender";

const router = express.Router();

router.post("/userCustomer/register", userLenderRegistration);
router.post("/userCustomer/login", userLenderLogin);
router.post("/userCustomer/change-password", userLenderChangePassword);
router.put("/userCustomer/:id", updateUserLender);
router.delete("/userCustomer/:id", deleteUserLender);
router.get("/userCustomer/:id", getUserLender);
router.get("/userCustomer", getUsersLenders);
router.get("/userCustomer/logout", logoutUsersLenders);
router.post("/userLender/register", userLenderRegistration);



export default router;