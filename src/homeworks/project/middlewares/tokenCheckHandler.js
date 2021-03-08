const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) {
        return next({statusCode: 401, message: 'Please authorize'});
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.userId = decoded.id;
        return next();
    } catch(err) {
        return next({statusCode: 403, message: 'Please authorize again'});
    }
}