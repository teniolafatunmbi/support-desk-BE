'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const dotenv_1 = __importDefault(require('dotenv'));
const app_1 = __importDefault(require('./app'));
const config_1 = __importDefault(require('./config/config'));
const logger_1 = __importDefault(require('./config/logger'));
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
const connectToDB = async () => {
  try {
    const conn = await mongoose_1.default.connect(config_1.default.db.URI);
    logger_1.default.info(`Database connected successfully on host: ${conn.connection.host}`);
  } catch (error) {
    logger_1.default.error(error.message);
  }
};
const runServer = () => {
  app_1.default.listen(PORT, () => logger_1.default.info(`Server started on port ${PORT}`));
};
connectToDB().then(() => {
  runServer();
});
//# sourceMappingURL=server.js.map
