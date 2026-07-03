import type { NextFunction, Request, Response } from "express";
import { createAddictionService } from "../services/addiction.services";
import { StatusCodes } from "http-status-codes";

export async function createAddictionController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, userId, partnerId } = req.body;
  try {
    const newAddiction = await createAddictionService(
      name,
      userId,
      partnerId,
    );
    res.status(StatusCodes.CREATED).send({ message:"Addiction created successfully", data: newAddiction});
  } catch (err) {
    next(err);
  }
}
