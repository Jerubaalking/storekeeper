const express = require('express');
const { isLoggedIn } = require('../../passport/passport');
const languages = require('../../database/models/languages');
const i18n = require('../helpers/languages/i18n.config');
const router = express.Router();

router.get('/language/list', async (req, res) => {
    let lang = JSON.parse(JSON.stringify(await languages.findAll()));
    // req.session.passport['language'] = lang[0];
    console.log(req.session);
    res.render('superadmin/language/dropdown', { layout: false, languages: lang, current: i18n.getLocale() })
});
router.get('/language/auth/list', async (req, res) => {
    let lang = JSON.parse(JSON.stringify(await languages.findAll()));
    console.log(req.cookies.locale);
    // i18n.setLocale(req.cookies.locale);
    // req.session.passport['language'] = lang[0];
    // console.log(req.session);
    res.render('superadmin/language/authDropdown', { layout: false, languages: lang, current: i18n.getLocale() })
});
router.get('/language/change/:key', async (req, res) => {

    console.log(req.params);
    i18n.setLocale(req.params.key);
    res.cookie('locale', i18n.getLocale());
    res.status(200).json({ status: true, notification: 'language changed!' });
});


module.exports = router;