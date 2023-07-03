class ErrorHandler extends Error {
    constructor(message , statusCode) {
        // constructor of base class
        super(message);
        // making a property of derived class
        this.statusCode = statusCode

        Error.captureStackTrace(this , this.constructor);
    }
}

module.exports = ErrorHandler;