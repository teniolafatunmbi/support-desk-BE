import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import Token from '../models/token.model';
import User from '../models/user.model';
import TokenService from '../services/token.service';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';

const authGuard = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let token: string;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // eslint-disable-next-line prefer-destructuring
      token = authorization.split(' ')[1];
      const decodedToken = await new TokenService().decodeToken(token);
      if (typeof decodedToken !== 'string') {
        req.user = await User.findById(decodedToken.sub).select('-password');
      }

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        try {
          // use refresh token
          token = req.cookies['refresh-token'];
          const tokenInDb = await Token.findOne({ token, blacklisted: false });

          if (!tokenInDb) {
            throw new ApiError(401, 'Unauthorized');
          }

          const decodedToken = await new TokenService().decodeToken(token);
          if (typeof decodedToken !== 'string') {
            req.user = await User.findById(decodedToken.sub).select('-password');
          }

          next();
        } catch (err) {
          await Token.updateOne({ token }, { blacklisted: true });
          throw new ApiError(401, 'Unauthorized');
        }
      } else {
        throw new ApiError(401, 'Unauthorized');
      }
    }
  }

  if (!token) {
    throw new ApiError(401, 'Unauthorized');
  }
});

export default authGuard;
