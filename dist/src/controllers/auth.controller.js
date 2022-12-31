'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const jsonwebtoken_1 = require('jsonwebtoken');
const moment_1 = __importDefault(require('moment'));
const config_1 = __importDefault(require('../config/config'));
const token_model_1 = __importDefault(require('../models/token.model'));
const user_model_1 = __importDefault(require('../models/user.model'));
const auth_service_1 = __importDefault(require('../services/auth.service'));
const token_service_1 = __importDefault(require('../services/token.service'));
const user_service_1 = __importDefault(require('../services/user.service'));
const ApiError_1 = __importDefault(require('../utils/ApiError'));
const catchAsync_1 = __importDefault(require('../utils/catchAsync'));
class AuthController {
  constructor() {
    this.userService = new user_service_1.default();
    this.tokenService = new token_service_1.default();
    this.authService = new auth_service_1.default();
    /**
     *
     * @desc Register a new user
     * @route POST /api/auth/register
     * @access Public
     */
    this.register = (0, catchAsync_1.default)(async (req, res) => {
      const newUser = await this.userService.createUser(req.body);
      const { access, refresh } = await this.tokenService.generateAuthTokens(newUser);
      res.cookie('refresh-token', refresh.token, {
        expires: refresh.expires,
        httpOnly: true,
        secure: config_1.default.env === 'production',
        sameSite: 'strict',
      });
      return res.status(201).json({
        data: {
          _id: newUser._id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
        },
        tokens: { access },
      });
    });
    /**
     *
     * @desc Login a user
     * @route POST /api/auth/login
     * @access Public
     */
    // eslint-disable-next-line class-methods-use-this
    this.login = (0, catchAsync_1.default)(async (req, res) => {
      const user = await this.authService.loginUser(req.body);
      const { access, refresh } = await this.tokenService.generateAuthTokens(user);
      res.cookie('refresh-token', refresh.token, {
        expires: refresh.expires,
        httpOnly: true,
        secure: config_1.default.env === 'production',
        sameSite: 'strict',
      });
      return res.status(200).json({
        data: {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
        tokens: { access },
      });
    });
    /**
     *
     * @desc Logs a user out
     * @route POST /api/auth/logout
     * @access Private
     */
    // eslint-disable-next-line class-methods-use-this
    this.logout = (0, catchAsync_1.default)(async (req, res) => {
      const { user } = req;
      const token = req.cookies['refresh-token'];
      await token_model_1.default.updateOne({ user: user._id, token }, { blacklisted: true });
      res.clearCookie('refresh-token');
      return res.status(200).json({
        message: 'User logged out successfully',
      });
    });
    /**
     *
     * @desc Refresh access token
     * @route POST /api/auth/refresh-token
     * @access Private
     */
    // eslint-disable-next-line class-methods-use-this
    this.refreshAccessToken = (0, catchAsync_1.default)(async (req, res) => {
      const token = req.cookies['refresh-token'];
      let decodedToken;
      let newToken;
      let newTokenExpiry;
      let user;
      try {
        decodedToken = await new token_service_1.default().decodeToken(token);
      } catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
          await token_model_1.default.updateOne({ token }, { blacklisted: true });
        }
        throw new ApiError_1.default(401, error.message);
      }
      if (typeof decodedToken !== 'string') {
        user = await user_model_1.default.findById(decodedToken.sub).select('-password');
        newTokenExpiry = (0, moment_1.default)().add(config_1.default.jwt.accessTokenExpiryMinutes, 'minutes');
        newToken = await this.tokenService.generateToken(
          user._id.toString(),
          newTokenExpiry,
          'access',
          config_1.default.jwt.secret
        );
      }
      const expiryInSeconds = (newTokenExpiry.valueOf() - parseInt((0, moment_1.default)().format('x'), 10)) / 1000;
      return res.status(200).json({
        user: {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
        token: newToken,
        expires_in: expiryInSeconds,
      });
    });
  }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map
