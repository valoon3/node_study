const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
        async (email, password, done) => {
            try {
                const exUser = await User.findOne({ where: { email } });
            } catch(err) {
                console.error(err);
                done(err);
            }
        }),
    )
}