import { Request, Response, NextFunction } from 'express';
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
    const tokens = await this.tokenService.generateAuthTokens(newUser);

    res.cookie('refresh-token', tokens.refresh.token, { maxAge: tokens.refresh.expires.getMilliseconds() });
    return res.status(201).json({
      data: {
        _id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        ...tokens,
      },
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
    const tokens = await this.tokenService.generateAuthTokens(user);

    res.cookie('refresh-token', tokens.refresh.token, { maxAge: tokens.refresh.expires.getMilliseconds() });
    return res.status(201).json({
      data: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        ...tokens,
      },
    });
  });
}

export default new AuthController();
