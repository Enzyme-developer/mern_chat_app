import customError from "./customError";
import { StatusCodes } from "http-status-codes";

class UnauthenticatedError extends customError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
