const express = require('express');
const sessions = require('../../controllers/superadmin/sessions');
const router = express.Router();

const { isLoggedIn } = require('../../controllers/services/handlers');
const upload = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, sessions.index);
router.get('/list', isLoggedIn, sessions.list);
router.get('/create', isLoggedIn,sessions.create);
router.post('/create', isLoggedIn,upload.userImage().none(), sessions.create);
router.get('/edit/:id', isLoggedIn,sessions.edit);
router.post('/activate/:id', isLoggedIn,sessions.activateSession);
router.post('/edit/:id', isLoggedIn,upload.userImage().none(), sessions.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;