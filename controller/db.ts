import mongoose, { Model } from 'mongoose';
import { UserModel } from '../interfaces/user-model';


let dbURI = 'mongodb://localhost/meanAuth';

if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI || '';
}

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

import { userSchema } from '../schemas/user';

let userModel: Model<UserModel> = mongoose.model('User', userSchema);

export { userModel };