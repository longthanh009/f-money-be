import express from "express";
import { deleteUserCustomer, updateUserCustomer, userCustomerChangePassword, userCustomerLogin, userCustomerRegistration } from "../controllers/userCustomer";
const router = express.Router();

router.post("/userCustomer/register", userCustomerRegistration);
router.post("/userCustomer/login", userCustomerLogin);
router.post("/userCustomer/change-password", userCustomerChangePassword);
router.put("/userCustomer/:id", updateUserCustomer);
router.delete("/userCustomer/:id", deleteUserCustomer);
// router.get("/userCustomer/:id", getUserLender);
// router.get("/userCustomer", getUsersLenders);
// router.get("/userCustomer/logout", logoutUsersLenders);


export default router;