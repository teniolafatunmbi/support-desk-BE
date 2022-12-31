'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const user_controller_1 = __importDefault(require('../controllers/user.controller'));
const auth_1 = __importDefault(require('../middlewares/auth'));
const router = (0, express_1.Router)();
router.get('/me', auth_1.default, user_controller_1.default.getCurrentUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map
