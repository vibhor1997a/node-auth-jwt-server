import { Schema, Model, model } from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

let userSchema: Schema = new Schema({
    uname: {
        type: String,
        unique: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
    , hash: {
        type: String
    }
    , salt: {
        type: String
    }
});

//sets the password into the db in form of hash and salt
userSchema.methods.setPassword = function (password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

//Validates the password by generating and comparing hash
userSchema.methods.validPassword = function (password: string) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

//Generates a JWT
userSchema.methods.generateJWT = function () {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        uname: this.uname,
        name: this.name,
        exp: expiry.getTime() / 1000
    }, '290oasjsdkslskal2e98912kjkaskasl');
}

export { userSchema };
