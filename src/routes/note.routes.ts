import { Router } from 'express';
import NoteController from '../controllers/note.controller';
import authGuard from '../middlewares/auth';

const router = Router();

router.route('/').get(authGuard, NoteController.getNotes);

export default router;
