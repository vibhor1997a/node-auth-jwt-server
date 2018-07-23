import express from 'express';
let router = express.Router();
import { auth } from '../config/auth';

router.get('/', auth, (req, res, next) => {
    res.send({
        status: 'success',
        data: 'protected data!'
    });
});

export { router as protected }