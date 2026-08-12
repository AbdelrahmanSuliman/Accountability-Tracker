import express from "express";
import { validateData } from "../middleware/validation.middleware";
import {
  CreateAddictionSchema,
  UpdateAddictionSchema,
} from "../schema/addiction.schema";
import {
  createAddictionController,
  fetchAddictionsController,
  deleteAddictionController,
  updateAddictionController,
} from "../controllers/addiction.controller";
import verifyToken from "../middleware/verifyToken.middleware";
import { AddictionIdParamSchema, IDParamSchema } from "../schema/validation.schema";

const addictionRouter = express.Router();

addictionRouter.post(
  "/",
  verifyToken,
  validateData({ body: CreateAddictionSchema }),
  createAddictionController,
);
addictionRouter.get("/", verifyToken, fetchAddictionsController);
addictionRouter.delete(
  "/:addictionId",
  verifyToken,
  validateData({ params: AddictionIdParamSchema }),
  deleteAddictionController,
);
addictionRouter.patch(
  "/:addictionId",
  verifyToken,
  validateData({ body: UpdateAddictionSchema, params: AddictionIdParamSchema }),
  updateAddictionController,
);

export default addictionRouter;
