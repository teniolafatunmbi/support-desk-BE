'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const bcryptjs_1 = __importDefault(require('bcryptjs'));
const user_model_1 = __importDefault(require('../models/user.model'));
const ApiError_1 = __importDefault(require('../utils/ApiError'));
class UserService {
  constructor() {
    this.createUser = async (payload) => {
      // check if user with email exists in db
      const userExists = await this.isUserEmailExists(payload.email);
      if (userExists) {
        throw new ApiError_1.default(400, 'User already exists');
      }
      // hash password
      const salt = await bcryptjs_1.default.genSalt(10);
      const hashedPassword = await bcryptjs_1.default.hash(payload.password, salt);
      // save user to db
      const newUser = await user_model_1.default.create({
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: hashedPassword,
      });
      return newUser;
    };
  }
  // eslint-disable-next-line class-methods-use-this
  async isUserEmailExists(email) {
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      return true;
    }
    return false;
  }
  // eslint-disable-next-line class-methods-use-this
  async getUserByEmail(email) {
    const user = await user_model_1.default.findOne({ email });
    return user;
  }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map
