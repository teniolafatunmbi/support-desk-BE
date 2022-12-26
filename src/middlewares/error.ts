import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).send({
    message: err.message,
    stack: process.env.NODE_ENV === 'prod' ? null : err.stack,
  });
};

export default errorHandler;
