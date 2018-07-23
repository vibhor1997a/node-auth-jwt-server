import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

let app = express();
import { default as api } from './routes/api';
import { NextFunction } from 'express-serve-static-core';
mongoose.connect('mongodb://localhost:27017/user');

app.locals.mongoose = mongoose;

app.listen(3000, () => {
    console.log('Listening!');
});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', api);

function errorHandler(err: Error | any, req: any, res: any, next: NextFunction) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({
            status: 'error', info: {
                message: 'Invalid Token!'
            }
        });
    }
    else {
        res.status(500).send({
            status: 'error',
            info: {
                message: err
            }
        });
    }
}

app.use(errorHandler);

export default app;