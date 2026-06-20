const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

const User = require('../models/User');
const Menu = require('../models/Menu');
const Order = require('../models/Order');
const Booking = require('../models/Booking');

const menuItems = [
  { name: 'Espresso', description: 'Rich, bold shot of pure coffee perfection', category: 'Coffee', price: 3.50, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400', available: true },
  { name: 'Cappuccino', description: 'Espresso topped with steamed milk foam', category: 'Coffee', price: 4.50, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', available: true },
  { name: 'Latte', description: 'Smooth espresso blended with creamy steamed milk', category: 'Coffee', price: 5.00, image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400', available: true },
  { name: 'Americano', description: 'Espresso diluted with hot water for a milder taste', category: 'Coffee', price: 3.75, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400', available: true },
  { name: 'Cold Brew', description: 'Slow-steeped cold coffee, smooth and refreshing', category: 'Coffee', price: 5.50, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', available: true },
  { name: 'Mocha', description: 'Espresso with chocolate sauce and steamed milk', category: 'Coffee', price: 5.25, image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400', available: true },
  { name: 'Green Tea Latte', description: 'Matcha blended with creamy oat milk', category: 'Tea', price: 4.75, image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400', available: true },
  { name: 'Chai Latte', description: 'Spiced tea concentrate with steamed milk', category: 'Tea', price: 4.50, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', available: true },
  { name: 'Earl Grey', description: 'Classic bergamot-scented black tea', category: 'Tea', price: 3.25, image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400', available: true },
  { name: 'Avocado Toast', description: 'Smashed avocado on sourdough with chili flakes', category: 'Snacks', price: 8.50, image: 'https://images.unsplash.com/photo-1603046891744-1f7a5e787616?w=400', available: true },
  { name: 'Croissant', description: 'Buttery, flaky French pastry', category: 'Snacks', price: 4.00, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', available: true },
  { name: 'Banana Bread', description: 'Moist, homemade slice with walnuts', category: 'Snacks', price: 3.75, image: 'https://images.unsplash.com/photo-1568471173242-461f0a730452?w=400', available: true },
  { name: 'Chocolate Cake', description: 'Rich layered chocolate cake with ganache', category: 'Desserts', price: 6.50, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', available: true },
  { name: 'Tiramisu', description: 'Classic Italian coffee-soaked dessert', category: 'Desserts', price: 7.00, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', available: true },
  { name: 'Cheesecake', description: 'New York style creamy cheesecake', category: 'Desserts', price: 6.75, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400', available: true },
  { name: 'Mango Smoothie', description: 'Fresh mango blended with yogurt', category: 'Beverages', price: 6.00, image: 'https://images.unsplash.com/photo-1553530666-ba11a90a3e3a?w=400', available: true },
  { name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', category: 'Beverages', price: 5.00, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', available: true },
  { name: 'Sparkling Water', description: 'Premium sparkling mineral water', category: 'Beverages', price: 2.50, image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400', available: true },
];

const seed = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Menu.deleteMany({});
    await Order.deleteMany({});
    await Booking.deleteMany({});

    console.log('Cleared existing data...');

    // Create admin user — change this password before deploying to production
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@cafecito.com',
      password: 'Caf3c!t0@Admin#2024',
      role: 'admin',
    });

    // Create test customer
    const customer = await User.create({
      name: 'John Customer',
      email: 'customer@cafecito.com',
      password: 'customer123',
      role: 'customer',
    });

    console.log('Created users...');

    // Seed menu items
    const createdMenu = await Menu.insertMany(menuItems);
    console.log(`Seeded ${createdMenu.length} menu items...`);

    // Seed sample orders
    await Order.create([
      {
        user: customer._id,
        customerName: 'John Customer',
        phone: '+1234567890',
        email: 'customer@cafecito.com',
        items: [
          { menuItem: createdMenu[0]._id, name: 'Espresso', price: 3.50, quantity: 2 },
          { menuItem: createdMenu[2]._id, name: 'Latte', price: 5.00, quantity: 1 },
        ],
        totalAmount: 12.00,
        status: 'Delivered',
      },
      {
        customerName: 'Jane Smith',
        phone: '+0987654321',
        email: 'jane@example.com',
        items: [
          { menuItem: createdMenu[1]._id, name: 'Cappuccino', price: 4.50, quantity: 1 },
          { menuItem: createdMenu[10]._id, name: 'Croissant', price: 4.00, quantity: 2 },
        ],
        totalAmount: 12.50,
        status: 'Preparing',
      },
    ]);

    // Seed sample bookings
    await Booking.create([
      {
        user: customer._id,
        name: 'John Customer',
        phone: '+1234567890',
        email: 'customer@cafecito.com',
        date: '2026-07-15',
        time: '14:00',
        guests: 4,
        status: 'Approved',
      },
      {
        name: 'Sarah Johnson',
        phone: '+1122334455',
        email: 'sarah@example.com',
        date: '2026-07-20',
        time: '11:00',
        guests: 2,
        status: 'Pending',
      },
    ]);

    console.log('Seeded orders and bookings...');
    console.log('\n✅ Database seeded successfully!');
    console.log('\nAdmin credentials:');
    console.log('  Email: admin@cafecito.com');
    console.log('  Password: admin123');
    console.log('\nCustomer credentials:');
    console.log('  Email: customer@cafecito.com');
    console.log('  Password: customer123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
