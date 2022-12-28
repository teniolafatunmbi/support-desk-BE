import { Router } from 'express';
import logger from '../config/logger';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import ticketRoutes from './ticket.routes';

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
  {
    path: '/tickets',
    route: ticketRoutes,
  },
];

ROUTES.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
