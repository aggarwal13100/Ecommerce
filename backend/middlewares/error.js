const ErrorHandler = require('../utils/errorHandler');

// In below function we expecting a object 'err' of class 'ErrorHandler'
module.exports = (err , req , res , next) => {
    // default code - 500 (Internal server error)
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // MongoDB error 
    if(err.name === "CastError") {
        const message = `Resource not found . Invalid : ${err.path}`;
        err = new ErrorHandler(message , 400);
    }


    //Mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }

    //Wrong JWT error
    if(err.code === "JsonWebTokenError"){
        const message = `Json web token is invalid, try again`;
        err = new ErrorHandler(message,400);
    }

    //JWT Expire error
    if(err.code === "TokenExpiredError"){
        const message = `Json web token is Expired, try again`;
        err = new ErrorHandler(message,400);
    }


    res.status(err.statusCode).json({
        success : false ,
        message : err.message ,
        error : err.stack ,
    });
}