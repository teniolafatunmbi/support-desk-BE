'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
class ApiError extends Error {
  constructor(statusCode, message, stack = '', name = '') {
    super(message);
    this.statusCode = statusCode;
    if (name) {
      this.name = name;
    }
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
exports.default = ApiError;
//# sourceMappingURL=ApiError.js.map
