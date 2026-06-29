import { AppError, AuthenticationError } from "./../util/error";
import { users } from "./../db/schema";
import db from "../db/index";
import * as t from "../db/schema";
import bcrypt from "bcrypt";
import config from "../config/index";
import logger from "../util/logger";

export async function signupService(
  username: string,
  email: string,
  password: string,
) {
  const saltRounds = Number(config.saltRounds);
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await db.query.users.findFirst({
      where: {
        email,
      },
    });

    if (user) throw new AuthenticationError("User already exists");

    const [newUser] = await db
      .insert(t.users)
      .values({ username, email, passwordHash })
      .returning({
        id: users.id,
        username: users.username,
        email: users.email,
      });

    return newUser;
  } catch (err) {
    if (err instanceof AuthenticationError) {
      throw err;
    } else {
      throw new AppError("Something went wrong during signup", 500);
    }
  }
}

export async function loginService(email: string, password: string) {
  try {
    const user = await db.query.users.findFirst({
      where: {
        email,
      },
      columns: {
        id: true,
        email: true,
        passwordHash: true,
      },
    });

    if (!user) throw new AuthenticationError();

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AuthenticationError();
    }

    return {
      id: user.id,
      email: user.email,
    };
  } catch (err) {
    if (err instanceof AuthenticationError) {
      throw err;
    } else {
      throw new AppError("Something went wrong during login", 500);
    }
  }
}
