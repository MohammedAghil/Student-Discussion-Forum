const rateLimit = require("express-rate-limit");

exports.loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 5, // start blocking after 5 requests
    handler: (req, res, next) =>{
        let err = new Error("Too many login requests from this IP, please try again after sometime");
        err.status = 429;
        return next(err);
    }   
});
