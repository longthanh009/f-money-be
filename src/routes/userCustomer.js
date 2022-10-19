import express from "express";
import { userCustomerLogin, userCustomerRegistration } from "../controllers/userCustomer";
const router = express.Router();

router.post("/userCustomer/register", userCustomerRegistration);
router.post("/userCustomer/login", userCustomerLogin);
// router.post("/userCustomer/change-password", userLenderChangePassword);
// router.put("/userCustomer/:id", updateUserLender);
// router.delete("/userCustomer/:id", deleteUserLender);
// router.get("/userCustomer/:id", getUserLender);
// router.get("/userCustomer", getUsersLenders);
// router.get("/userCustomer/logout", logoutUsersLenders);


export default router;