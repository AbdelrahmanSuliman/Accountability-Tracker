import { and, eq, asc } from "drizzle-orm";
import db from "../db/index";
import * as t from "../db/schema";
import { ConflictError, NotFoundError } from "../util/error";

type InvitationStatusEnum = "accepted" | "pending" | "rejected";

export async function fetchInvitationsService(
  userId: number,
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
  senderId: number,
  receiverId: number,
  addictionId: number,
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
    return newInvitation;
  } catch (err) {
    throw err;
  }
}

export async function acceptInvitationService(
  senderId: number,
  receiverId: number,
  addictionId: number,
) {
  try {
    const [existingInvitation] = await db
      .select()
      .from(t.invitations)
      .where(
        and(
          eq(t.invitations.senderId, senderId),
          eq(t.invitations.receiverId, receiverId),
        ),
      );

    if (!existingInvitation) {
      throw new NotFoundError("Invitation not found.");
    }

    if (existingInvitation.status !== "pending") {
      throw new ConflictError(
        `Cannot accept invitation with status '${existingInvitation.status}'.`,
      );
    }

    await db.transaction(async (tx) => {
      await db
        .update(t.invitations)
        .set({ status: "accepted" })
        .where(eq(t.invitations.id, existingInvitation.id));
      await db
        .update(t.addictions)
        .set({ partnerId: receiverId })
        .where(eq(t.addictions.id, addictionId));
    });
    
  } catch (err) {
    throw err;
  }
}

export async function deleteInvitationService(
  senderId: number,
  invitationId: number,
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
