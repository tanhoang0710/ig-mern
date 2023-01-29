const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

passport.use(
    new LocalStrategy((username, password, done) => {
        console.log('🚀 ~ file: passport.config.js:8 ~ password', password);
        User.findOne({ username }, async (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done({ message: 'Username is not existed' }, false);
            }
            if (user) {
                const checkCorrectPassword = await bcrypt.compare(
                    password,
                    user.password
                );
                if (checkCorrectPassword) {
                    return done(null, user);
                }
                return done(
                    { message: 'Username or password is invalid' },
                    false
                );
            }
        });
    })
);

module.exports = passport;
