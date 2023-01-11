const customError= require('./customError')
const { StatusCodes } = require('http-status-codes')

class BadRequest extends customError {
    constructor(message: string) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export {};
module.exports = BadRequest;