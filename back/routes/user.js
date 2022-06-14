const express = require('express');

const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.delete('/:id', auth, userCtrl.delete);
router.put('/:id', auth, multer, userCtrl.updateAccount);

module.exports = router;
