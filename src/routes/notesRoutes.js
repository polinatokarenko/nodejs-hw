import { Router } from "express";
import { celebrate } from "celebrate";

import { getAllNotes } from "../controllers/notesController.js";
import { getNoteById } from "../controllers/notesController.js";
import { createNote } from "../controllers/notesController.js";
import { deleteNote } from "../controllers/notesController.js";
import { updateNote } from "../controllers/notesController.js";

import { getAllNotesSchema } from "../validations/notesValidation.js";
import { noteIdSchema } from "../validations/notesValidation.js";
import { createNoteSchema } from "../validations/notesValidation.js";
import { updateNoteSchema } from "../validations/notesValidation.js";

import { authenticate } from "../middleware/authenticate.js";

const notesRouter = Router();

notesRouter.use('/notes', authenticate);

notesRouter.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

notesRouter.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

notesRouter.post('/notes', celebrate(createNoteSchema), createNote);

notesRouter.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

notesRouter.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default notesRouter;
