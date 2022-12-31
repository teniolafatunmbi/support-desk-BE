'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const moment_1 = __importDefault(require('moment'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const config_1 = __importDefault(require('../config/config'));
const token_model_1 = __importDefault(require('../models/token.model'));
const utils_1 = require('../utils');
class TokenService {
  // eslint-disable-next-line class-methods-use-this
  async generateToken(userId, tokenExpiry, tokenType, secret = config_1.default.jwt.secret) {
    const payload = {
      sub: userId,
      iat: (0, moment_1.default)().unix(),
      exp: tokenExpiry.unix(),
      type: tokenType,
    };
    return jsonwebtoken_1.default.sign(payload, secret);
  }
  // eslint-disable-next-line class-methods-use-this
  async decodeToken(token) {
    return jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
  }
  async generateAuthTokens(user) {
    const accessTokenExpiry = (0, moment_1.default)().add(config_1.default.jwt.accessTokenExpiryMinutes, 'minutes');
    const accessToken = await this.generateToken(user._id, accessTokenExpiry, utils_1.tokenTypes.ACCESS);
    const refreshTokenExpiry = (0, moment_1.default)().add(config_1.default.jwt.refreshTokenExpiryDays, 'days');
    const refreshToken = await this.generateToken(user._id, refreshTokenExpiry, utils_1.tokenTypes.REFRESH);
    // save refresh token in db
    await token_model_1.default.create({
      token: refreshToken,
      expires: refreshTokenExpiry.toDate(),
      type: utils_1.tokenTypes.REFRESH,
      user: user._id,
    });
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpiry.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpiry.toDate(),
      },
    };
  }
}
exports.default = TokenService;
//# sourceMappingURL=token.service.js.map
