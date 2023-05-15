
const { engine } = require("express-handlebars");
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const session = require('express-session');
// const SessionStore = require('session-file-store')(session);
const passport = require('passport');
const flash = require('express-flash');
const { passportInit, authenticateUser } = require('./passport/passport');
const LocalStrategy = require('passport-local').Strategy;

const cors = require('cors');

const app = require('./applications/app');
app.use(cors({
    origin: ['https://www.saincrafttechnologies.com','https://storekeeper.builds.saincrafttechnologies.com', 'http://storekeeper.builds.saincrafttechnologies.com', 'https://captain.builds.saincrafttechnologies.com', 'https://saincrafttechnologies-static-public-2023.fra1.cdn.digitaloceanspaces.com/'],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    authenticateUser));

passport.serializeUser(function (user, done) {
    return done(null, user);
});
passport.deserializeUser(function (user, done) {
    // console.log('am deserializing', user.id);
    try {
        return users.findOne({ where: { id: user.id }, include: [{ model: roles }, { model: languages }] }).then(user => {
            let _user = JSON.parse(JSON.stringify(user));
            let userData = {
                id: _user.id,
                name: _user.name,
                email: _user.email,
                role: _user.roles[0],
                userId: _user.id,
                language: _user.language
            }
            http.globalAgent = { language: _user.language };
            return done(null, userData);
        });
    } catch (err) {
        return done(err)
    }
});
app.use(passport.initialize());
app.use(passport.session())
// console.log(path.resolve(__dirname + '/config/config.env'));
dotenv.config({ path: './config/config.env' });
app.use(flash());
app.use('/public', express.static(path.resolve(__dirname + process.env.D_PUBLIC)));
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine('hbs', engine({
    defaultLayout: 'layout',
    layoutsDir: 'views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: require('./backend/helpers/handle_bar').helpers,
    registerPartial: "home",
    extname: '.hbs',
    registerPartial: 'settings'
}));

require('./routeManager')(app);
const Query = require('./database/queries');
app.use('/auth', require('./backend/routes/auth'));
// require('./passport/passport')(passport);
const executiveQueries = require('./database/executiveQueries');
const users = require('./database/models/users');
const roles = require('./database/models/roles');
const languages = require('./database/models/languages');
// routeManager(app);

const port = process.env.PORT || 3001;
const _env = process.env.NODE_ENV;

http.createServer(app)
    .listen(port, async () => {
        // let Q = new Query();
        // await Q.syncTable();
        // await executiveQueries();
        console.log(`server running in ${_env} mode on port ${port}`);
    });
