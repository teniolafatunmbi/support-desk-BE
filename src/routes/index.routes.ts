import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

const ROUTES = [
  {
    path: '/auth',
    route: authRoutes,
  },
];

ROUTES.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
