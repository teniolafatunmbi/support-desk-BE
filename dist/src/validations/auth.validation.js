'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const joi_1 = __importDefault(require('joi'));
const register = joi_1.default.object().keys({
  first_name: joi_1.default.string().required(),
  last_name: joi_1.default.string().required(),
  email: joi_1.default.string().required().email(),
  password: joi_1.default.string().required().min(6),
});
const login = joi_1.default.object().keys({
  email: joi_1.default.string().required().email(),
  password: joi_1.default.string().required(),
});
const authSchema = { register, login };
exports.default = authSchema;
//# sourceMappingURL=auth.validation.js.map
