import * as z from "zod";

const maxLength = 1000;

export const addJournalEntrySchema = z.object({
  content: z.string("Content must be a valid string").max(maxLength),
  succeeded: z.boolean("Succeeded must be a boolean"),
  targetDate: z.date("Target date must"),
});

export const updateJournalEntrySchema = z.object({
  entryId: z
    .number("Entry ID must be a number")
    .gte(0, "Entry ID must be a valid ID"),
  addictionId: z
    .number("Addiction ID must be a number")
    .gte(0, "addiction ID must be a valid ID"),
  content: z.string("Content must be a valid string").max(maxLength),
  succeeded: z.boolean("Succeeded must be a boolean"),
  targetDate: z.date("Target date must"),
});
