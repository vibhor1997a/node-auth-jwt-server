import express from 'express';
let router = express.Router();
import multer from 'multer';
import crypto from 'crypto';
let mime = require('mime');

let storage = multer.diskStorage({
    destination: './images',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
        });
    }
});

let upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req, res, next) => {
    res.send({ status: 'success' });
});

export { router as upload };