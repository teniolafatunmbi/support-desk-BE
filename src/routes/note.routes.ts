import { Router } from 'express';
import NoteController from '../controllers/note.controller';
import authGuard from '../middlewares/auth';
import validate from '../middlewares/validate';
import noteSchema from '../validations/note.validation';

const router = Router();

router
  .route('/')
  .get(authGuard, NoteController.getTicketNotes)
  .post(authGuard, validate(noteSchema.createNote), NoteController.createTicket);

export default router;
