function errorLogger(error, req, res, next) {
    console.error(error);
    next(error);
  };

function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 400;
    res.status(statusCode);
    res.json({
        message: err.message
    });
}

export { errorLogger, errorHandler };