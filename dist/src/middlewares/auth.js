'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const jsonwebtoken_1 = require('jsonwebtoken');
const token_model_1 = __importDefault(require('../models/token.model'));
const user_model_1 = __importDefault(require('../models/user.model'));
const token_service_1 = __importDefault(require('../services/token.service'));
const ApiError_1 = __importDefault(require('../utils/ApiError'));
const catchAsync_1 = __importDefault(require('../utils/catchAsync'));
const authGuard = (0, catchAsync_1.default)(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // eslint-disable-next-line prefer-destructuring
      token = authorization.split(' ')[1];
      const decodedToken = await new token_service_1.default().decodeToken(token);
      if (typeof decodedToken !== 'string') {
        req.user = await user_model_1.default.findById(decodedToken.sub).select('-password');
      }
      next();
    } catch (error) {
      if (error instanceof jsonwebtoken_1.TokenExpiredError) {
        try {
          // use refresh token
          token = req.cookies['refresh-token'];
          const tokenInDb = await token_model_1.default.findOne({ token, blacklisted: false });
          if (!tokenInDb) {
            throw new ApiError_1.default(401, 'Unauthorized');
          }
          const decodedToken = await new token_service_1.default().decodeToken(token);
          if (typeof decodedToken !== 'string') {
            req.user = await user_model_1.default.findById(decodedToken.sub).select('-password');
          }
          next();
        } catch (err) {
          await token_model_1.default.updateOne({ token }, { blacklisted: true });
          throw new ApiError_1.default(401, 'Unauthorized');
        }
      } else {
        throw new ApiError_1.default(401, 'Unauthorized');
      }
    }
  }
  if (!token) {
    throw new ApiError_1.default(401, 'Unauthorized');
  }
});
exports.default = authGuard;
//# sourceMappingURL=auth.js.map
