'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const joi_1 = __importDefault(require('joi'));
const ApiError_1 = __importDefault(require('../utils/ApiError'));
/**
 * Validate an incoming request against the Joi schema
 * @param schema
 * @returns
 */
const validate = (schema) => (req, res, next) => {
  //   const validSchema = pick(schema, ['params', 'query', 'body']);
  //   const object = pick(req, Object.keys(validSchema));
  const { value, error } = joi_1.default
    .compile(schema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(req.body);
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError_1.default(422, error.name, errorMessage));
  }
  Object.assign(req, value);
  return next();
};
exports.default = validate;
//# sourceMappingURL=validate.js.map
