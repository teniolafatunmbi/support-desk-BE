import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import authGuard from '../middlewares/auth';
import validate from '../middlewares/validate';
import authSchema from '../validations/auth.validation';

const router = Router();

router.post('/register', validate(authSchema.register), AuthController.register);
router.post('/login', validate(authSchema.login), AuthController.login);
router.get('/refresh-access-token', AuthController.refreshAccessToken);
router.post('/logout', authGuard, AuthController.logout);

export default router;
