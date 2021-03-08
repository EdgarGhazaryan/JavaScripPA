function error(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    return res.status(err.statusCode).json({
        message: err.message
    });
}

function error404(req, res, next) {
    return res.status(404).json({
        message: 'Page not found'
    });
}


module.exports = {error, error404};