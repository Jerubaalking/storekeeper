const express = require('express');
const settings = require('../../controllers/superadmin/settings');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;

const { userImage } = require('../../controllers/services/multerConfig');

router.get('/', settings.index);
router.get('/system', settings.system);
router.post('/system', userImage().none(), settings.system);
router.get('/smtp', isLoggedIn, settings.smtp);
router.post('/smtp/:mail_sender', settings.smtp);
router.post('/smtp', isLoggedIn, userImage().none(), settings.smtp);
router.get('/payment', settings.payment);
router.get('/school', settings.school);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLoggedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;