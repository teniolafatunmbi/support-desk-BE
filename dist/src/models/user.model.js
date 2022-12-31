'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = require('mongoose');
const bcryptjs_1 = __importDefault(require('bcryptjs'));
const userSchema = new mongoose_1.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'First name is required'],
    },
    last_name: {
      type: String,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
/**
 * Checks if the password matches the user's password
 * @param password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = function (password) {
  return bcryptjs_1.default.compare(password, this.password);
};
const User = (0, mongoose_1.model)('User', userSchema);
// export default models.Users || model<IUser>('Users', userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map
