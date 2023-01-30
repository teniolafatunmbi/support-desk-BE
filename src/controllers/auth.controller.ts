import { Request, Response } from 'express';
import { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/config';
import Token from '../models/token.model';
import User from '../models/user.model';
import AuthService from '../services/auth.service';
import TokenService from '../services/token.service';
import UserService from '../services/user.service';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';

const IS_REFRESH_TOKEN_SECURE = config.env === 'development';

class AuthController {
  protected userService = new UserService();

  protected tokenService = new TokenService();

  protected authService = new AuthService();

  /**
   *
   * @desc Register a new user
   * @route POST /api/auth/register
   * @access Public
   */
  public register = catchAsync(async (req: Request, res: Response) => {
    const newUser = await this.userService.createUser(req.body);
    const { access, refresh } = await this.tokenService.generateAuthTokens(newUser);

    res.cookie('refresh-token', refresh.token, {
      expires: refresh.expires,
      httpOnly: true,
      secure: IS_REFRESH_TOKEN_SECURE,
      domain: 'vercel.app',
      sameSite: 'none',
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
  public login = catchAsync(async (req: Request, res: Response) => {
    const user = await this.authService.loginUser(req.body);
    const { access, refresh } = await this.tokenService.generateAuthTokens(user);

    res.cookie('refresh-token', refresh.token, {
      expires: refresh.expires,
      httpOnly: true,
      secure: IS_REFRESH_TOKEN_SECURE,
      domain: 'vercel.app',
      sameSite: 'none',
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
  public logout = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;
    const token = req.cookies['refresh-token'];

    await Token.updateOne({ user: user._id, token }, { blacklisted: true });

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
  public refreshAccessToken = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies['refresh-token'];
    let decodedToken: string | JwtPayload;
    let newToken: string;
    let newTokenExpiry: moment.Moment;
    let user;

    try {
      decodedToken = await new TokenService().decodeToken(token);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        await Token.updateOne({ token }, { blacklisted: true });
      }
      throw new ApiError(401, error.message);
    }
    if (typeof decodedToken !== 'string') {
      user = await User.findById(decodedToken.sub).select('-password');
      newTokenExpiry = moment().add(config.jwt.accessTokenExpiryMinutes, 'minutes');
      newToken = await this.tokenService.generateToken(user._id.toString(), newTokenExpiry, 'access', config.jwt.secret);
    }

    const expiryInSeconds = (newTokenExpiry.valueOf() - parseInt(moment().format('x'), 10)) / 1000;

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

export default new AuthController();
