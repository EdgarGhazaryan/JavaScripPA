const glob = require('glob-promise');
const mime = require('mime-types');
const path = require('path');

module.exports = (root) => {
    return async (req, res, next) => {
        let files = await glob(root + '/**/*');

        if(!files.includes(root + req.path)) {
            return next();
        }

        const contentType = mime.lookup(req.path);
        res.setHeader('Content-Type', contentType);
        res.sendFile(path.resolve(root + req.path));
    };
}