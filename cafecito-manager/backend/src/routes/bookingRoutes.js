const express = require('express');
const router = express.Router();
const { createBooking, getBookings, getMyBookings, updateBookingStatus, deleteBooking } = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', createBooking);
router.get('/', protect, adminOnly, getBookings);
router.get('/my', protect, getMyBookings);
router.put('/:id/status', protect, adminOnly, updateBookingStatus);
router.delete('/:id', protect, adminOnly, deleteBooking);

module.exports = router;
