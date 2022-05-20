const express = require('express');

const router = express.Router();
const messageCtrl = require('../controllers/message');

router.get('/', messageCtrl.getAllMessages);
router.get('/:messageId', messageCtrl.getOneMessage);
router.post('/', messageCtrl.createMessage);
router.put('/:messageId', messageCtrl.updateMessage);
router.delete('/:messageId', messageCtrl.deleteMessage);
// router.post('/:messageId/like', messageCtrl.likeMessage);

module.exports = router;
