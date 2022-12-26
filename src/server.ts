import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import config from './config/config';
import logger from './config/logger';

dotenv.config();

const PORT = process.env.PORT || 8000;

const connectToDB = async () => {
  try {
    logger.info(config.jwt.secret);
    const conn = await mongoose.connect(config.db.URI);
    logger.info(`Database connected successfully on host: ${conn.connection.host}`);
  } catch (error) {
    logger.error(error.message);
  }
};

const runServer = () => {
  app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
};

connectToDB().then(() => {
  runServer();
});
