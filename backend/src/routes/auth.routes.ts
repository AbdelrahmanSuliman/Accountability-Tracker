import express from "express";
import { loginController, signupController } from "../controllers/auth.controller";
import { validateData } from "../middleware/validation.middleware";
import {UserLoginSchema, UserSignupSchema} from '../schema/auth.schema'

const authRouter = express.Router();

authRouter.post("/signup", validateData({body: UserSignupSchema}), signupController);
authRouter.post("/login", validateData({body: UserLoginSchema}), loginController)

export default authRouter