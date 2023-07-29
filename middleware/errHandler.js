const errorHandler = (err, req, res, next) => {
    console.log("error hadnler im here")
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    console.log(message);
    res.status(status).json(message);
    next();
    };
    
    module.exports = errorHandler;