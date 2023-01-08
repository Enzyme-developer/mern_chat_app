class customError extends Error {
  statusCode: number;
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCutsomError = (statusCode, message) => {
  return new customError(statusCode, message);
};

module.exports = { customError, createCutsomError };
