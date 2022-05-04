const express = require('express');

const router = express.Router();
const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.delete('/:id', userCtrl.delete);
router.put('/:id', userCtrl.updateAccount);

module.exports = router;
