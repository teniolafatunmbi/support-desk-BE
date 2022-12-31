'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const bcryptjs_1 = __importDefault(require('bcryptjs'));
const ApiError_1 = __importDefault(require('../utils/ApiError'));
const user_service_1 = __importDefault(require('./user.service'));
class AuthService {
  constructor() {
    this.userService = new user_service_1.default();
  }
  /* eslint-disable class-methods-use-this */
  async loginUser(user) {
    const existingUser = await this.userService.getUserByEmail(user.email);
    if (!existingUser) {
      throw new ApiError_1.default(401, 'Invalid Credentials');
    }
    const matchingPass = await bcryptjs_1.default.compare(user.password, existingUser.password);
    if (!matchingPass) {
      throw new ApiError_1.default(401, 'Invalid Credentials');
    }
    return existingUser;
  }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map
