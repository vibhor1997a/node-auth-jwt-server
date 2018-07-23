import express from 'express';
let router = express.Router();
import { login } from './login';
import { signup } from './signup';
import { upload } from './upload';
import { protected as protectedResource } from './protected';

router.use('/login', login);
router.use('/signup', signup);
router.use('/upload', upload);
router.use('/protected', protectedResource);

export default router;