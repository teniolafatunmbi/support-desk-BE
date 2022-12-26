import { Router } from 'express';
import logger from '../config/logger';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const router = Router();

const ROUTES = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
];

ROUTES.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
