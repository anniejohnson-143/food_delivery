import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import Order from '../models/Order.js';

const router = express.Router();

router.get('/orders', authenticate, authorize(['user']), async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('restaurant', 'name')
      .populate('items');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router; 