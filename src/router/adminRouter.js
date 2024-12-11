import { Router } from "express";
import { registerUser,loginUser

 } from "../controller/adminController.js";
const adminRouter = Router();

adminRouter.post("/reg-user", registerUser);
adminRouter.post("/login-user",loginUser);
// adminRouter.get("/verify-user", getUser);

export default adminRouter;