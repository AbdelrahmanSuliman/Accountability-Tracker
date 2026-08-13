import { journalEntries } from "./../db/schema";
import db from "../db/index";
import * as t from "../db/schema";
import { eq, lt, gte, ne, and, asc, exists } from "drizzle-orm";
import { AppError, ConflictError, NotFoundError } from "../util/error";

export async function addJournalEntryService(
  userId: string,
  addictionId: string,
  succeeded: boolean,
  content: string,
  targetDate: string,
) {
  try {
    const [authorizedAddiction] = await db
      .select()
      .from(t.addictions)
      .where(
        and(eq(t.addictions.id, addictionId), eq(t.addictions.userId, userId)),
      )
      .limit(1);

    if (!authorizedAddiction) {
      throw new NotFoundError("Addiction record not found or access denied");
    }

    const [entryExistsThatDate] = await db
      .select()
      .from(t.journalEntries)
      .where(
        and(
          eq(t.journalEntries.date, targetDate),
          eq(t.journalEntries.addictionId, addictionId),
        ),
      );

    if (entryExistsThatDate)
      throw new ConflictError(
        "Entry already exists for that day for that addiction",
      );

    const [newEntry] = await db
      .insert(t.journalEntries)
      .values({ content, succeeded, addictionId, date: targetDate })
      .returning();

    return newEntry;
  } catch (err) {
    throw err;
  }
}

export async function getAllJournalEntriesService(
  userId: string,
  addictionId: string,
  page: number = 1,
  limit: number = 10,
) {
  try {
    const offset = (page - 1) * limit;

    const journalEntries = await db
      .select({
        id: t.journalEntries.id,
        content: t.journalEntries.content,
        succeeded: t.journalEntries.succeeded,
        date: t.journalEntries.date,
        addictionId: t.journalEntries.addictionId,
        createdAt: t.journalEntries.createdAt,
        updatedAt: t.journalEntries.updatedAt,
      })
      .from(t.journalEntries)
      .innerJoin(
        t.addictions,
        eq(t.journalEntries.addictionId, t.addictions.id),
      )
      .where(
        and(
          eq(t.journalEntries.addictionId, addictionId),
          eq(t.addictions.userId, userId),
        ),
      )
      .orderBy(asc(t.journalEntries.date))
      .limit(limit)
      .offset(offset);

    return journalEntries;
  } catch (err) {
    throw err;
  }
}


export async function updateJournalEntryService(
  userId: string,
  entryId: string,
  addictionId: string,
  succeeded: boolean,
  content: string,
  targetDate: string,
) {
  try {
    const [authorizedAddiction] = await db
      .select()
      .from(t.addictions)
      .where(
        and(eq(t.addictions.id, addictionId), eq(t.addictions.userId, userId)),
      )
      .limit(1);

    if (!authorizedAddiction) {
      throw new NotFoundError("Addiction record not found or access denied");
    }

    const result = await db
      .update(t.journalEntries)
      .set({ content, succeeded, date: targetDate })
      .where(
        and(
          eq(t.journalEntries.id, entryId),
          eq(t.journalEntries.addictionId, addictionId),
        ),
      )
      .returning();

    if (result.length === 0) {
      throw new NotFoundError("Journal entry not found");
    }

    return result[0];
  } catch (err) {
    throw err;
  }
}

export async function deleteJournalEntryService(
  userId: string,
  entryId: string,
  addictionId: string,
) {
  try {
    await db.delete(t.journalEntries).where(
      and(
        eq(t.journalEntries.id, entryId),
        eq(t.journalEntries.addictionId, addictionId),
        exists(
          db
            .select()
            .from(t.addictions)
            .where(
              and(
                eq(t.addictions.id, addictionId),
                eq(t.addictions.userId, userId),
              ),
            ),
        ),
      ),
    );
  } catch (err) {
    throw err;
  }
}
