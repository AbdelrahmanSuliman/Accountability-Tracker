import express from "express";
import { validateData } from "../middleware/validation.middleware";
import {CreateAddictionSchema} from '../schema/addiction.schema'
import { createAddictionController } from "../controllers/addiction.controller";

const addictionRouter = express.Router()

addictionRouter.post("/", validateData(CreateAddictionSchema), createAddictionController)

export default addictionRouter