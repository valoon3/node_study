const passport = require('passport');

const local = require('./localStrategy');
const db = require('../models/index');
const user = db.User;

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        user.findOne({
            where: { id }
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
}