import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import Order from '../models/Order.js';
import Restaurant from '../models/Restaurant.js';
import FoodItem from '../models/FoodItem.js';

const router = express.Router();

router.post('/place', authenticate, authorize(['user']), async (req, res) => {
  const { restaurantId, items } = req.body;
  const order = new Order({
    user: req.user.id,
    restaurant: restaurantId,
    items
  });
  await order.save();
  res.json({ msg: 'Your order is placed. It will be delivered in 30 minutes.' });
});

router.post('/:id/status', authenticate, authorize(['owner']), async (req, res) => {
  const { status } = req.body;
  await Order.findByIdAndUpdate(req.params.id, { status });
  res.json({ msg: 'Order status updated' });
});

export default router; 