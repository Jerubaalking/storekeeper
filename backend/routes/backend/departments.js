const express = require('express');
const departments = require('../../controllers/superadmin/departments');
const router = express.Router();

const { isLoggedIn } = require('../../controllers/services/handlers');
const upload = require('../../controllers/services/multerConfig');

router.get('/', departments.index);
router.get('/list', departments.list);
router.get('/create', departments.create);
router.post('/create', upload.userImage().none(), departments.create);
router.get('/edit/:id', departments.edit);
router.post('/edit/:id', upload.userImage().none(), departments.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;