import { addictions } from "../db/schema";
import db from "../db/index";
import * as t from "../db/schema";
import { AppError, ConflictError, NotFoundError } from "../util/error";
import { StatusCodes } from "http-status-codes";

//TODO: make sure to not allow duplicate relationships & enforce on database level
export async function createAddictionService(
  name: string,
  userId: number,
  partnerId: number,
) {
  if (userId === partnerId)
    throw new ConflictError("User and partner cannot have the same ID");
  try {
    const user = await db.query.users.findFirst({
      where: {
        id: userId,
      },
    });
    const partner = await db.query.users.findFirst({
      where: {
        id: partnerId,
      },
    });

    if (!user || !partner) {
      throw new NotFoundError(
        `User with id ${userId} and/or partner with id ${partnerId} does not exist`,
      );
    }

    const [newAddiction] = await db
      .insert(t.addictions)
      .values({ name, userId, partnerId })
      .returning();
    if (!newAddiction)
      throw new AppError(
        "Failed to create addiction",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    return newAddiction;
  } catch (err) {
    throw err;
  }
}
