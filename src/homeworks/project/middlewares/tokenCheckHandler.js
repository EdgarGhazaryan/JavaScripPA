const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) {
        return res.redirect(400, '/api/login');
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.userId = decoded.id;
        return next();
    } catch(err) {
        return res.redirect(400, '/api/login');
    }
}