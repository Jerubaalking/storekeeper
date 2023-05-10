
const LocalStrategy = require('passport-local').Strategy;
const { passwordHashVerify } = require('../backend/controllers/services/service');
const users = require('../database/models/users');
// const session = require('express-session');
// const SessionStore = require('session-file-store')(session);
const roles = require('../database/models/roles');
const passport = require('passport');
const sessions = require('../database/models/sessions');
const languages = require('../database/models/languages');
// this.use(flash());
module.exports = {
    authenticateUser: async function (req, email, password, done) {
        // console.log(email, password);
        try {


            const user = await users.findAll({ where: { email: email }, include: [{ model: roles }, { model: languages }] });
            const session = JSON.parse(JSON.stringify(await sessions.findOne({ where: { status: 1 } })));
            const _user = JSON.parse(JSON.stringify(await user))[0];
            let passVerify = await passwordHashVerify(password, _user.salt, _user.hash);
            if (user.length <= 0) {
                return done(null, false, { message: 'user do not exist!' });
            }
            if (passVerify) {
                console.log('...password verified!');
                let userData = {
                    id: _user.id,
                    name: _user.name,
                    email: _user.email,
                    role: _user.roles[0],
                    userId: _user.id,
                    session: session.name,
                    sessionId: session.id,
                    language: _user.language
                }
                global.language = _user.languages[0];
                console.log(global.language);
                return done(null, userData);
            } else {
                return done(null, false, {
                    message: 'incorrect password!'
                });
            };
        } catch (err) {
            return done(null, false, {
                message: err.message
            });
        }
    },
    isLoggedIn: async (req, res, next) => {
        try {
            if (req.isAuthenticated()) {
                return next();
            } else {
                return res.redirect('/auth/signin');
            }
        } catch (err) {
            console.log(err);
            return res.redirect('/auth/signin');
        }
    }
} 
