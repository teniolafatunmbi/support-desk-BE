import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  let msg: string;

  if (err.message === 'ValidationError') {
    msg = err.stack.replaceAll('/', '');
  } else {
    msg = err.message;
  }
  return res.status(statusCode).send({
    message: msg,
    stack: process.env.NODE_ENV === 'prod' ? null : err.stack,
  });
};

export default errorHandler;
