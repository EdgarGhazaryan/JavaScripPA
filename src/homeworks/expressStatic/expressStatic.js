const mime = require('mime-types');
const path = require('path');

module.exports = (root) => {
    return async (req, res, next) => {
        try {
            const contentType = mime.lookup(req.path);
            res.setHeader('Content-Type', contentType);
            res.sendFile(path.resolve(root + req.path));
        } catch (err) {
            return next();
        }
    };
}