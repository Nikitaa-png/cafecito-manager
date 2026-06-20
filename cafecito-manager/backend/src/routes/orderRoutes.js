const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getMyOrders, updateOrderStatus, deleteOrder, getDashboardStats } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', createOrder);
router.get('/', protect, adminOnly, getOrders);
router.get('/my', protect, getMyOrders);
router.get('/stats', protect, adminOnly, getDashboardStats);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);
router.delete('/:id', protect, adminOnly, deleteOrder);

module.exports = router;
