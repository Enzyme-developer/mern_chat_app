const customError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err: { statusCode: any; message: any; }, req: any, res: { status: (arg0: any) => { (): any; new(): any; json: { (arg0: { message?: any; err?: any; }): any; new(): any; }; }; }, next: any) => {
  if (err instanceof customError) {
    return res.status(err.statusCode).json({ message: err.message });
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  }
};

export {};
module.exports = errorHandler;
