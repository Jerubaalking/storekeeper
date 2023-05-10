const express = require('express');
const Controllers = require('../controllers/models/control');
const creates = require('../controllers/models/creates');
const findby = require('../controllers/models/findBy');
const Finds = require('../controllers/models/finds');
const router = express.Router();
const { spawnJwtToken, isLoggedIn } = require('../controllers/services/handlers');
const upload = require('../controllers/services/multerConfig');
const { passwordHash, passwordHashVerify } = require('../controllers/services/service');
const { business_addresses, users, roles } = require('../../database/models/module_exporter');
const localStore = require('store2');
const { LocalStorage } = require('node-localstorage');
const passport = require('passport');
const i18n = require('../helpers/languages/i18n.config');
router.get('/signin', (req, res) => {
    console.log(req.session);
    res.render('auth/login', {
        layout: "auth",
        locale: i18n.getLocale(),
    })
});
router.get('/signup', async (req, res) => {
    let oldUser = JSON.parse(JSON.stringify(await (await new Finds())._businesses()));
    res.render('auth/register', {
        layout: "auth", business: oldUser,
        locale: i18n.getLocale(),
    })
});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/superadmin',
    failureRedirect: '/auth/signin',
    failureFlash: true
}));

router.get('/logout', async (req, res) => {
    await req.logOut(async (err) => {
        if (!err) {
            await res.redirect('/');
        }
    });
});
// router.post('/:id', route.settings);
// router.delete('/:id', route.settings);
// router.delete('/trash/:id', route.settings);

module.exports = router;