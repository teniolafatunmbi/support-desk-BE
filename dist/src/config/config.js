'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
const path_1 = __importDefault(require('path'));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../../.env') });
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
exports.default = config;
//# sourceMappingURL=config.js.map
