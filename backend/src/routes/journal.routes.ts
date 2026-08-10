import express from "express";
import verifyToken from "../middleware/verifyToken.middleware";
import { addJournalEntryController, deleteJournalEntryController, getAllJournalEntriesController, updateJournalEntryController } from "../controllers/journal.controller";
import { validateData } from "../middleware/validation.middleware";
import { addJournalEntrySchema, updateJournalEntrySchema } from "../schema/journal.schema";


const journalRouter = express.Router()


journalRouter.post("/", validateData(addJournalEntrySchema), verifyToken, addJournalEntryController)
journalRouter.patch("/:entryId", validateData(updateJournalEntrySchema), verifyToken, updateJournalEntryController)
journalRouter.get("/:addictionId", verifyToken, getAllJournalEntriesController)
journalRouter.delete("/addictions/:addictionId/entries/:entryId", verifyToken, deleteJournalEntryController)

export default journalRouter