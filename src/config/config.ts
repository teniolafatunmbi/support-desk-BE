import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const config = {
  db: {
    URI: process.env.MONGO_URI,
  },
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMinutes: process.env.JWT_ACCESS_EXPIRY,
    refreshTokenExpiryDays: process.env.JWT_REFRESH_EXPIRY,
  },
};

export default config;
