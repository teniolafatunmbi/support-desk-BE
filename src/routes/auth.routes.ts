import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import validate from '../middlewares/validate';
import authSchema from '../validations/auth.validation';

const router = Router();

// CREATE USER
router.post('/register', validate(authSchema.register), AuthController.register);
router.post('/login', validate(authSchema.login), AuthController.login);

export default router;
