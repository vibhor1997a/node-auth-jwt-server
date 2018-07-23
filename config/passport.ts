import LocalStrategy, { Strategy } from 'passport-local';

import passport from 'passport';
import { userModel as User } from '../controller/db';

let strategy: Strategy = new LocalStrategy.Strategy(
    {
        usernameField: 'uname'
    },
    function (username, password, done) {
        User.findOne({ uname: username }, function (err, user) {
            if (err) { return done(err); }
            // Return if user not found in database
            if (!user) {
                return done(undefined, false, {
                    message: 'User not found'
                });
            }
            // Return if password is wrong
            if (!user.validPassword(password)) {
                return done(undefined, false, {
                    message: 'Password is wrong'
                });
            }
            // If credentials are correct, return the user object
            return done(undefined, user);
        });
    }
);

passport.use(strategy);

export { passport };