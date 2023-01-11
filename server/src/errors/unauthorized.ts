const customError = require("./customError");
const { StatusCodes } = require("http-status-codes");

class UnauthenticatedError extends customError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export {};
module.exports = UnauthenticatedError;
