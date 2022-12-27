import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import config from '../config/config';
import logger from '../config/logger';
import AuthService from '../services/auth.service';
import TokenService from '../services/token.service';
import UserService from '../services/user.service';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';

class AuthController {
  protected userService = new UserService();

  protected tokenService = new TokenService();

  protected authService = new AuthService();

  /**
   *
   * @desc Register a new user
   * @route /api/auth/register
   * @access Public
   */
  public register = catchAsync(async (req: Request, res: Response) => {
    const newUser = await this.userService.createUser(req.body);
    const { access, refresh } = await this.tokenService.generateAuthTokens(newUser);

    res.cookie('refresh-token', refresh.token, {
      expires: refresh.expires,
      httpOnly: true,
      secure: config.env === 'production',
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
   * @route /api/auth/login
   * @access Public
   */
  // eslint-disable-next-line class-methods-use-this
  public login = catchAsync(async (req: Request, res: Response) => {
    const user = await this.authService.loginUser(req.body);
    const { access, refresh } = await this.tokenService.generateAuthTokens(user);

    logger.info(moment(refresh.expires).format('x'));
    res.cookie('refresh-token', refresh.token, {
      expires: refresh.expires,
      httpOnly: true,
      secure: config.env === 'production',
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
}

export default new AuthController();
