const Order = require('../models/Order');

const createOrder = async (req, res, next) => {
  try {
    const orderData = { ...req.body };
    if (req.user) orderData.user = req.user._id;
    const order = await Order.create(orderData);
    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    let query = {};
    // If not admin, only show user's own orders
    if (req.user && req.user.role !== 'admin') {
      query.user = req.user._id;
    }
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ order });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const Menu = require('../models/Menu');
    const Booking = require('../models/Booking');

    const [totalOrders, totalBookings, totalMenuItems, totalUsers, revenueData, recentOrders] = await Promise.all([
      Order.countDocuments(),
      Booking.countDocuments(),
      Menu.countDocuments(),
      require('../models/User').countDocuments(),
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
      Order.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.json({
      totalOrders,
      totalRevenue: revenueData[0]?.total || 0,
      totalBookings,
      totalMenuItems,
      totalUsers,
      recentOrders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrders, getMyOrders, updateOrderStatus, deleteOrder, getDashboardStats };
