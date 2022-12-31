'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const auth_controller_1 = __importDefault(require('../controllers/auth.controller'));
const auth_1 = __importDefault(require('../middlewares/auth'));
const validate_1 = __importDefault(require('../middlewares/validate'));
const auth_validation_1 = __importDefault(require('../validations/auth.validation'));
const router = (0, express_1.Router)();
router.post('/register', (0, validate_1.default)(auth_validation_1.default.register), auth_controller_1.default.register);
router.post('/login', (0, validate_1.default)(auth_validation_1.default.login), auth_controller_1.default.login);
router.get('/refresh-access-token', auth_controller_1.default.refreshAccessToken);
router.post('/logout', auth_1.default, auth_controller_1.default.logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map
