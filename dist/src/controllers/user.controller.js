'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const auth_service_1 = __importDefault(require('../services/auth.service'));
const token_service_1 = __importDefault(require('../services/token.service'));
const user_service_1 = __importDefault(require('../services/user.service'));
const catchAsync_1 = __importDefault(require('../utils/catchAsync'));
class UserController {
  constructor() {
    this.userService = new user_service_1.default();
    this.tokenService = new token_service_1.default();
    this.authService = new auth_service_1.default();
    /**
     *
     * @desc Get current user
     * @route GET /api/users/me
     * @access Private
     */
    this.getCurrentUser = (0, catchAsync_1.default)(async (req, res) => {
      const user = {
        id: req.user._id,
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
      };
      return res.status(200).json(user);
    });
  }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map
