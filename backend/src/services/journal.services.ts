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
  pageNumber: number = 10,
) {
  try {
    const journalEntries = await db
      .select()
      .from(t.journalEntries)
      .where(
        and(
          eq(t.journalEntries.addictionId, addictionId),
          eq(t.addictions.userId, userId),
        ),
      )
      .orderBy(asc(t.journalEntries.date))
      .limit(page)
      .offset(pageNumber);
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

    const [entryExistsThatDate] = await db
      .select()
      .from(t.journalEntries)
      .where(
        and(
          eq(t.journalEntries.date, targetDate),
          eq(t.journalEntries.addictionId, addictionId),
        ),
      );

    if (!entryExistsThatDate)
      throw new NotFoundError("Entry you are trying to update does not exist");

    await db
      .update(t.journalEntries)
      .set({ content, succeeded })
      .where(eq(t.journalEntries.id, entryId));
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
