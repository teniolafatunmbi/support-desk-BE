import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import ticketRoutes from './ticket.routes';
import noteRoutes from './note.routes';

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
  {
    path: '/notes',
    route: noteRoutes,
  },
];

ROUTES.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
