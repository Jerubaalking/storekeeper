const express = require('express');
const item_categories = require('../../controllers/superadmin/item_categories');
const router = express.Router();

const { isLoggedIn } = require('../../controllers/services/handlers');
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/', isLoggedIn, item_categories.index);
router.get('/list', isLoggedIn, item_categories.list);
router.get('/create', isLoggedIn, item_categories.create);
router.get('/sections/:id', isLoggedIn, item_categories.sections);
router.post('/sections/:id', isLoggedIn, userImage().none(), item_categories.sections);
router.post('/create', isLoggedIn, userImage().none(), item_categories.create);
router.get('/edit/:id', isLoggedIn, item_categories.edit);
router.get('/list/class/:id', isLoggedIn, item_categories.classSection);
router.post('/edit/:id', userImage().none(), item_categories.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;