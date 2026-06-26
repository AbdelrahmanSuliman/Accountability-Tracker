import { AppError, AuthenticationError } from "./../util/error";
import { users } from "./../db/schema";
import db from "../db/index";
import * as t from "../db/schema";
import bcrypt from "bcrypt";
import config from "../config/index";

export async function signupService(
  username: string,
  email: string,
  password: string,
) {
  try {
    const passwordHash = await bcrypt.hash(password, config.saltRounds);
    const [newUser] = await db
      .insert(t.users)
      .values({ username, email, passwordHash })
      .returning({
        id: t.users.id,
        username: t.users.username,
        email: t.users.email,
      });
    return newUser;
  } catch (err) {
    if (err instanceof AuthenticationError) {
      throw err;
    } else {
      throw new AppError("Something went wrong during login", 500);
    }
  }
}

export async function loginService(email: string, password: string) {
  try {
    const user = await db.query.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new AuthenticationError();
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AuthenticationError();
    }
  } catch (err) {
    if (err instanceof AuthenticationError) {
      throw err;
    } else {
      throw new AppError("Something went wrong during login", 500);
    }
  }
}
