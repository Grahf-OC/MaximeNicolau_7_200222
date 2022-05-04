const express = require('express');

const router = express.Router();
const messCtrl = require('../controllers/mess');

router.get('/', messCtrl.getAllMess);
router.get('/:messageId', messCtrl.getOneMess);
router.post('/', messCtrl.createMess);
router.put('/:messageId', messCtrl.updateMess);
router.delete('/:messageId', messCtrl.deleteMess);
router.post('/:messageId/like', messCtrl.likeMess);

module.exports = router;
