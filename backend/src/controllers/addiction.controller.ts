import type { NextFunction, Request, Response } from "express";
import {
  createAddictionService,
  fetchAllAddictionsService,
  deleteAddictionService,
  updateAddictionService,
} from "../services/addiction.services";
import { StatusCodes } from "http-status-codes";

export async function createAddictionController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, userId, partnerId } = req.body;
  try {
    const newAddiction = await createAddictionService(name, userId, partnerId);
    res
      .status(StatusCodes.CREATED)
      .send({ message: "Addiction created successfully", data: newAddiction });
  } catch (err) {
    next(err);
  }
}

export async function fetchAddictionsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user!.userId;
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  try {
    const addictions = await fetchAllAddictionsService(userId, page, limit);
    res
      .status(StatusCodes.ACCEPTED)
      .send({ message: "Addictions fetched successfully", data: addictions });
  } catch (err) {
    next(err);
  }
}

export async function deleteAddictionController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const addictionId = Number(req.params.id);
  const userId = req.user!.userId;

  try {
    await deleteAddictionService(addictionId, userId);
    res
      .status(StatusCodes.NO_CONTENT)
      .send({ message: "Addiction deleted successfully" });
  } catch (err) {
    next(err);
  }
}

export async function updateAddictionController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const addictionId = Number(req.params.id);
  const userId = req.user!.userId;
  const { addictionName } = req.body;
  try {
    await updateAddictionService(addictionId, addictionName, userId);

    res
      .status(StatusCodes.NO_CONTENT)
      .send({ message: "Addiction updated successfully" });
  } catch (err) {
    next(err);
  }
}
