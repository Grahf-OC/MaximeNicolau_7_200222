const express = require('express');
const router = express.Router();
const messCtrl = require('../controllers/mess');



router.get('/', messCtrl.getAllMess);
router.get('/:id', messCtrl.getOneMess);
router.post('/', messCtrl.createMess);
router.put('/:id', messCtrl.modifyMess);
router.delete('/:id', messCtrl.deleteMess);
router.post('/:id/like', messCtrl.likeMess);

module.exports = router;