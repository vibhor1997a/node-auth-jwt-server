import express from 'express';
let router = express.Router();
import { passport } from '../config/passport';
import { UserModel } from '../interfaces/user-model';

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user: UserModel, info) => {
        if (err) {
            res.status(500).send({ status: 'error' });
        }
        else if (user) {
            let token = user.generateJWT();
            res.send({ status: 'success', token: token });
        }
        else {
            res.status(401).send({ status: 'error', info: info });
        }
    })(req, res);
});

export { router as login };