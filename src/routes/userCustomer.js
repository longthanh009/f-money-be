import express from "express";
import { userCustomerRegistration } from "../controllers/userCustomer";
const router = express.Router();

router.post("/userLender/register", userCustomerRegistration);
// router.post("/userLender/login", userLenderLogin);
// router.post("/userLender/change-password", userLenderChangePassword);
// router.put("/userLender/:id", updateUserLender);
// router.delete("/userLender/:id", deleteUserLender);
// router.get("/userLender/:id", getUserLender);
// router.get("/userLender", getUsersLenders);
// router.get("/userLender/logout", logoutUsersLenders);


export default router;