import type { NextFunction, Request, Response } from "express";
import { signupService, loginService } from "../services/auth.services";
import { StatusCodes } from "http-status-codes";
import generateToken from "../util/generateToken";
import config from "../config";

export async function signupController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, email, password } = req.body;

  try {
    const user = await signupService(username, email, password);
    const token = generateToken(user.id, user.username);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: config.nodeEnv === 'production',
      maxAge: 360000,
      path: '/'
    })
    res.status(StatusCodes.CREATED).send({ message: "User signed up successfully", data: {user}});
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
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: config.nodeEnv === "production",
      maxAge: 360000,
      path: "/",
    });
    res.status(StatusCodes.OK).send({message: "User logged in successfully", data: {user}});
  } catch (err) {
    next(err);
  }
}
