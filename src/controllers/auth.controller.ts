import type { NextFunction, Request, Response } from "express";
import { signupService, loginService } from "../services/auth.services";
import { StatusCodes } from "http-status-codes";
import generateToken from "../util/generateToken";

export async function signupController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, email, password } = req.body;

  try {
    const user = await signupService(username, email, password);
    const token = generateToken(user.id, user.username);
    res.status(StatusCodes.CREATED).send({ message: "User signed up successfully", data: {user, token}});
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
    const user = await loginService(email, password);
    const token = generateToken(user.id, user.username);
    res.status(StatusCodes.OK).send({message: "User logged in successfully", data: {user, token}});
  } catch (err) {
    next(err);
  }
}
