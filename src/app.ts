import express, { urlencoded, json } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import dotenv from 'dotenv';

import apiRoutes from './routes/index.routes';
import errorHandler from './middlewares/error';
import logger from './config/logger';

dotenv.config();

const app = express();

app.use(urlencoded({ extended: true }));

app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use(cors({ origin: ['*'] }));
} else {
  const whitelist = [
    'http://localhost:5173',
    'https://support-desk-tau.vercel.app',
    'https://support-desk-tau.vercel.app/',
    'https://support-desk-devteni.vercel.app',
    'https://support-desk-devteni.vercel.app/',
    'https://support-desk-git-main-devteni.vercel.app',
    'https://support-desk-git-main-devteni.vercel.app/',
  ];
  const corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  app.use(
    cors({
      ...corsOptions,
      credentials: true,
      allowedHeaders: ['access-control-allow-credentials', 'authorization', 'content-type', 'access-control-allow-origin'],
    })
  );
}

app.use(json());

app.use(helmet());

app.use(morgan('tiny'));

app.use('/api/', apiRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' });
});

app.get('*', (req, res) => {
  res.status(200).json({ message: 'Route not found' });
});

export default app;
