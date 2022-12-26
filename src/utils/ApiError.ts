class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message, stack = '', name = '') {
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

export default ApiError;
