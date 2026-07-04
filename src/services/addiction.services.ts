import { eq, and, desc } from "drizzle-orm";
import db from "../db/index";
import * as t from "../db/schema";
import { AppError, ConflictError, NotFoundError } from "../util/error";
import { StatusCodes } from "http-status-codes";
import logger from "../util/logger";

export async function createAddictionService(
  name: string,
  userId: number,
  partnerId: number,
) {
  if (userId === partnerId)
    throw new ConflictError("User and partner cannot have the same ID");
  try {
    const [existingRelationship] = await db
      .select()
      .from(t.addictions)
      .where(
        and(
          eq(t.addictions.userId, userId),
          eq(t.addictions.partnerId, partnerId),
        ),
      )
      .limit(1);
    if (existingRelationship)
      throw new ConflictError("This addiction relationship already exists");
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

export async function fetchAllAddictionsService(
  userId: number,
  page: number = 1,
  pageSize: number = 10,
) {
  const addictions = await db
    .select()
    .from(t.addictions)
    .where(eq(t.addictions.userId, userId))
    .orderBy(desc(t.addictions.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
  return addictions;
}
