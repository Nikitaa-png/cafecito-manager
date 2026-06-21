const Message = require('../models/Message');

// POST /api/messages  — public, anyone can send
const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }
    const msg = await Message.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message sent successfully', data: msg });
  } catch (error) { next(error); }
};

// GET /api/messages  — admin only
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ messages });
  } catch (error) { next(error); }
};

// PUT /api/messages/:id/read  — mark as read
const markRead = async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: msg });
  } catch (error) { next(error); }
};

// DELETE /api/messages/:id
const deleteMessage = async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Deleted' });
  } catch (error) { next(error); }
};

module.exports = { createMessage, getMessages, markRead, deleteMessage };
