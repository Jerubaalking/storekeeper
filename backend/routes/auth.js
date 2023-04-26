const express = require('express');
const businesses = require('../../database/models/businesses');
const Controllers = require('../controllers/models/control');
const creates = require('../controllers/models/creates');
const findby = require('../controllers/models/findBy');
const Finds = require('../controllers/models/finds');
const router = express.Router();
const { spawnJwtToken, isLoggedIn } = require('../controllers/services/handlers');
const upload = require('../controllers/services/multerConfig');
const { passwordHash, passwordHashVerify } = require('../controllers/services/service');

router.get('/signin', (req, res) => {
    res.render('auth/login', { layout: "auth" })
});
router.get('/signup', async (req, res) => {
    let oldUser = JSON.parse(JSON.stringify(await (await new Finds())._businesses()));
    res.render('auth/register', { layout: "auth", business: oldUser })
});
router.get('/', isLoggedIn, (req, res) => {
    res.redirect('/');
})
router.post('/', async (req, res) => {

    const { name, email, password, phone, gender, businessId } = req.body;
    console.log(req.body);

    let oldUser = JSON.parse(JSON.stringify(await (await new findby()).signin({ where: { email: email } })));
    console.log("old User", oldUser);
    if (!oldUser.length <= 0) {
        res.render('auth/register', { layout: 'auth', message: `Users with email ${email} already exist. Please login` });
    } else {
        // finally add new user
        let bodyUser = {};
        bodyUser.name = name;
        bodyUser.password = password;
        bodyUser.phone = phone;
        bodyUser.email = email;
        bodyUser.gender = gender;
        bodyUser.businessId = businessId;
        bodyUser.role = 'admin';
        console.log(bodyUser);
        try {
            let newUser = await (await new creates()).signup(bodyUser);
            console.log("new user::", newUser);
            res.render('auth/login', { layout: 'auth' });
        } catch (err) {
            res.render('auth/register', { layout: 'auth', message: `Failed to create new user! error: ${err}` });
        }
    }


});
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log("this is the body::>>>>>>>>>>:", email, password);

    let oldUser = JSON.parse(JSON.stringify(await (await new findby()).signin({ where: { email: email } })));
    console.log("old User", oldUser);
    // oldUser = oldUser[0];
    if (!oldUser) {
        res.render('auth/login', { layout: 'auth', message: `Users with email ${email} dont exist. Please register` });
    } else {
        //check if password match
        let validPass = await passwordHashVerify(password, oldUser.salt, oldUser.hash);
        console.log('valid password', validPass);
        let session = await (await new Controllers(req).findBy()).session({ where: { status: 1 } });
        session = JSON.parse(JSON.stringify(session[0]));
        console.log('session values::', oldUser);
        const data = {
            name: oldUser.name,
            email: oldUser.email,
            userId: oldUser.id,
            businessId: (oldUser.business) ? oldUser.business.id : null,
            roleId: oldUser.role.id,
            role: oldUser.role.role,
            loginTime: new Date(),
            ip: req.ip,
            sessionId: session.id,
            session: session.name,
            business_name: (oldUser.business) ? oldUser.business.name : 'Saincraft-Tech',
        }
        if (validPass) {
            var token = await spawnJwtToken(data, oldUser.salt, 3000);
            res.cookie("_57or35", token, { maxAge: 3000 * 1000 });
            res.cookie("e5t_", oldUser.salt, { maxAge: 3000 * 1000 });
            res.cookie("ech_", 0, { maxAge: 3000 * 1000 });

            res.redirect('/');
        } else {
            res.render('auth/login', { layout: 'auth', message: `user authentication failed. Make sure you are the right owner of the account` });
        }
    }
});
router.get('/logout', async (req, res) => {
    res.clearCookie("_57or35");
    res.clearCookie("e5t_");
    res.clearCookie("ech_");
    res.redirect('/');
});
// router.post('/:id', route.settings);
// router.delete('/:id', route.settings);
// router.delete('/trash/:id', route.settings);

module.exports = router;