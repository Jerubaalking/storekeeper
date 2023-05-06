const express = require('express');
const clients = require('../../controllers/superadmin/clients');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { user } = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, clients.index);
router.get('/list', isLoggedIn, clients.list);
router.get('/create', isLoggedIn, clients.create);
router.post('/create', isLoggedIn, user().none(), clients.create);
router.get('/edit/:id', isLoggedIn, clients.edit);
router.post('/activate/:id', isLoggedIn, clients.activateSession);
router.post('/edit/:id', isLoggedIn, user().none(), clients.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;