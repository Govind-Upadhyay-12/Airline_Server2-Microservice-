import express from "express";
import UserSchema from "../../models/User.js";

const router = express.Router();

import { SignUp,SignIn } from "../../controllers/Authentication.js";
router.post("/signup",SignUp);
router.post("/signin",SignIn);
export default router;
