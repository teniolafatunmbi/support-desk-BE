'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let msg;
  if (err.message === 'ValidationError') {
    msg = err.stack.replaceAll('/', '');
  } else {
    msg = err.message;
  }
  return res.status(statusCode).send({
    message: msg,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
exports.default = errorHandler;
//# sourceMappingURL=error.js.map
