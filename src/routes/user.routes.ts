import { Router } from 'express';
import userController from '../controllers/user.controller';
import authGuard from '../middlewares/auth';
import validate from '../middlewares/validate';

const router = Router();

router.get('/me', authGuard, userController.getCurrentUser);

export default router;
