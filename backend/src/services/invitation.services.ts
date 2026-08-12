import { and, eq, asc } from "drizzle-orm";
import db from "../db/index";
import * as t from "../db/schema";
import { ConflictError, ForbiddenError, NotFoundError } from "../util/error";
import logger from "../util/logger";

export type InvitationStatusEnum = "accepted" | "pending" | "rejected";

//TODO: make a function to get invitations that you received
export async function fetchSentInvitationsService(
  userId: string,
  status: InvitationStatusEnum,
  page: number = 1,
  pageSize: number = 10,
) {
  try {
    return await db
      .select()
      .from(t.invitations)
      .where(
        and(
          eq(t.invitations.status, status),
          eq(t.invitations.senderId, userId),
        ),
      )
      .orderBy(asc(t.invitations.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize);
  } catch (err) {
    throw err;
  }
}

export async function createInvitationService(
  senderId: string,
  receiverId: string,
  addictionId: string,
) {
  try {
    const [existingInvitation] = await db
      .select()
      .from(t.invitations)
      .where(
        and(
          eq(t.invitations.senderId, senderId),
          eq(t.invitations.receiverId, receiverId),
          eq(t.invitations.addictionId, addictionId),
          eq(t.invitations.status, "pending"),
        ),
      );

    if (existingInvitation) {
      throw new ConflictError("Invitation to the receiver already exists.");
    }
    const [newInvitation] = await db
      .insert(t.invitations)
      .values({
        senderId,
        receiverId,
        addictionId,
      })
      .returning();
    logger.info(newInvitation)
    return newInvitation;
  } catch (err) {
    throw err;
  }
}

//TODO: refactor so the accepting is a link that has the invitations UUID in the url
export async function acceptInvitationService(
  currentUserId: string,
  invitationId: string,
) {
  try {
    const [invitation] = await db
      .select()
      .from(t.invitations)
      .where(eq(t.invitations.id, invitationId));

    
    if (!invitation)
      throw new NotFoundError("Invitation does not exist.")

    if (invitation.receiverId !== currentUserId)
      throw new ForbiddenError("You are not authorized to accept this invitation.")

    if (invitation.status !== "pending")
      throw new ConflictError(`Cannot accept invitation with status ${invitation.status}.`)
    await db.transaction(async (tx) => {
      await tx
        .update(t.invitations)
        .set({ status: "accepted" })
        .where(eq(t.invitations.id, invitation.id));
      await tx
        .update(t.addictions)
        .set({ partnerId: currentUserId })
        .where(eq(t.addictions.id, currentUserId));
    });
  } catch (err) {
    throw err;
  }
}

export async function deleteInvitationService(
  senderId: string,
  invitationId: string,
) {
  try {
    const [deleted] = await db
      .delete(t.invitations)
      .where(
        and(
          eq(t.invitations.id, invitationId),
          eq(t.invitations.senderId, senderId),
        ),
      )
      .returning();

    if (!deleted) {
      throw new NotFoundError(
        "Invitation not found or unauthorized to delete.",
      );
    }
  } catch (err) {
    throw err;
  }
}
