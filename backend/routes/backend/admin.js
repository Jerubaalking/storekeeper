const express = require('express');
const admin = require('../../controllers/superadmin/admin');
const router = express.Router();

const { isLoggedIn } = require('../../../passport/passport');
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, admin.index);
router.get('/list', isLoggedIn, admin.list);
router.get('/create', isLoggedIn, admin.create);
router.post('/create', isLoggedIn, userImage().none(), admin.create);
router.get('/edit/:id', isLoggedIn, admin.edit);
router.post('/activate/:id', isLoggedIn, admin.activateSession);
router.post('/edit/:id', isLoggedIn, userImage().none(), admin.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;