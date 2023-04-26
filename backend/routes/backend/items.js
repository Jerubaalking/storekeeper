const express = require('express');
const items = require('../../controllers/superadmin/items');
const router = express.Router();

// const { isLoggedIn } = require('../controllers/services/handlers');
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/', items.index);
router.get('/list/:category', items.list);
router.get('/create', items.create);
router.post('/create', userImage().none(), items.create);
router.get('/edit/:id', items.edit);
router.post('/edit/:id', userImage().none(), items.edit);
router.get('/list/categories/:category', items.item_categoriesStores);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;