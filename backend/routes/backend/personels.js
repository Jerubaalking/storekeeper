const express = require('express');
const personel = require('../../controllers/superadmin/personels');
const router = express.Router();

const { isLoggedIn } = require('../../controllers/services/handlers');
const { userImage, userCsv } = require('../../controllers/services/multerConfig');

router.get('/', personel.index);
router.get('/profile/:id', personel.profile);
router.get('/list', personel.list);
router.get('/create', personel.create);

router.post('/create', userImage().none(), personel.create);

router.get('/edit/:id', personel.edit);
router.post('/edit/:id', userImage().none(), personel.edit);
// router.get('/list', isLoggedIn, route.settings);
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, image.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
// router.delete('/:id', isLoggedIn, route.settings);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;