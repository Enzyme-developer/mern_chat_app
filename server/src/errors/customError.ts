class customError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export {};
module.exports = customError