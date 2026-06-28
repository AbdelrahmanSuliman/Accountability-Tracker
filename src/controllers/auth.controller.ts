import type { NextFunction, Request, Response } from "express";
import { signupService, loginService } from "../services/auth.services";
import { StatusCodes } from "http-status-codes";

export async function signupController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, email, password } = req.body;

  try {
    const user = await signupService(username, email, password);
    res.status(StatusCodes.CREATED).send({ user });
  } catch (err) {
    next(err);
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body;
  try {
    const user = await loginService(email, password)
    res.status(StatusCodes.OK).send({user})
  } catch (err) {
    next(err)
  }
}
