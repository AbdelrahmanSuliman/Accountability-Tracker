import express from "express";
import { validateData } from "../middleware/validation.middleware";
import {CreateAddictionSchema, UpdateAddictionSchema} from '../schema/addiction.schema'
import { createAddictionController, fetchAddictionsController, deleteAddictionController, updateAddictionController } from "../controllers/addiction.controller";
import verifyToken from "../middleware/verifyToken.middleware";

const addictionRouter = express.Router()

addictionRouter.post("/", verifyToken, validateData(CreateAddictionSchema), createAddictionController)
addictionRouter.get("/", verifyToken, fetchAddictionsController)    
addictionRouter.delete("/:id", verifyToken, deleteAddictionController)
addictionRouter.patch("/:id", verifyToken, validateData(UpdateAddictionSchema), updateAddictionController)

export default addictionRouter