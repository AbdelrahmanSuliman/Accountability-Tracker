import express from "express";
import { loginController, signupController } from "../controllers/auth.controller";
import { validateData } from "../middleware/validation.middleware";
import {userLoginSchema, userSignupSchema} from '../schema/auth.schema'

const authRouter = express.Router();

authRouter.post("/signup", validateData(userSignupSchema), signupController);
authRouter.post("/login", validateData(userLoginSchema), loginController)

export default authRouter