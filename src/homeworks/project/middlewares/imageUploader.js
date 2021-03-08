const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('uploads', 'images'));
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');
        cb(null, Date.now() + '_' + name);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const imageRegEx = /\.(gif|jpg|jpeg|tiff|png)$/i;
        if (file.originalname.match(imageRegEx)) {
            cb(null, true);
        }
        else {
            cb(new Error('File is not an image'));
        }
    }
});

module.exports = upload;