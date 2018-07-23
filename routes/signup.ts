import express from 'express';
let router = express.Router();
import { userModel } from '../controller/db';

router.post('/', (req, res, next) => {
    let user = new userModel();
    let password = req.body.password;
    delete req.body.password;

    user.name = req.body.name;
    user.uname = req.body.uname;
    user.setPassword(password);
    user.save((err: Error | any) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send({ status: 'success' });
        }
    });
});

export { router as signup };