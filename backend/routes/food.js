import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import FoodItem from '../models/FoodItem.js';

const router = express.Router();

// Update a food item (owner only)
router.put('/:id', authenticate, authorize(['owner']), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const food = await FoodItem.findById(req.params.id);
    if (!food) return res.status(404).json({ msg: 'Food item not found' });
    // Optionally, check if the owner owns this food item via restaurant
    if (name !== undefined) food.name = name;
    if (price !== undefined) food.price = price;
    if (category !== undefined) food.category = category;
    if (description !== undefined) food.description = description;
    await food.save();
    res.json({ msg: 'Food item updated', food });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Delete a food item (owner only)
router.delete('/:id', authenticate, authorize(['owner']), async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id);
    if (!food) return res.status(404).json({ msg: 'Food item not found' });
    await food.deleteOne();
    res.json({ msg: 'Food item deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

export default router; 