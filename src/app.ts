import express, { urlencoded, json } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';

import dotenv from 'dotenv';

import apiRoutes from './routes/index.routes';
import errorHandler from './middlewares/error';

dotenv.config();

const app = express();

app.use(urlencoded({ extended: true }));

app.use(cookieParser());

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
