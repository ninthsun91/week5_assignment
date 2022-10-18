export function errorHandler(err, req, res, next) {
    const statusCode = err.status || 400;
    res.status(statusCode);
    res.json({
        message: err.message
    });
}