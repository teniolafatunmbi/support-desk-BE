import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import TokenService from '../services/token.service';
import UserService from '../services/user.service';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';

class UserController {
  protected userService = new UserService();

  protected tokenService = new TokenService();

  protected authService = new AuthService();

  /**
   *
   * @desc Get current user
   * @route /api/users/me
   * @access Private
   */
  public getCurrentUser = catchAsync(async (req, res: Response) => {
    const user = {
      id: req.user._id,
      email: req.user.email,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
    };

    return res.status(200).json(user);
  });
}

export default new UserController();
