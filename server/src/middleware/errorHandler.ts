import { Response, NextFunction } from "express";
import CustomError from "../errors/customError";
import { StatusCodes } from "http-status-codes";

const errorHandler = (err: { statusCode: number; message: string; }, req: any, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  }
};

export default errorHandler;
