const express = require('express');
const router = express.Router();
const { createMessage, getMessages, markRead, deleteMessage } = require('../controllers/messageController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', createMessage);                          // public
router.get('/', protect, adminOnly, getMessages);         // admin
router.put('/:id/read', protect, adminOnly, markRead);    // admin
router.delete('/:id', protect, adminOnly, deleteMessage); // admin

module.exports = router;
