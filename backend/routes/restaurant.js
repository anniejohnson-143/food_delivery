import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import Restaurant from '../models/Restaurant.js';
import FoodItem from '../models/FoodItem.js';
import Order from '../models/Order.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Get all restaurants owned by the logged-in owner
router.get('/', authenticate, authorize(['owner']), async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ owner: req.user.id });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Get menu for a restaurant
router.get('/:id/menu', async (req, res) => {
  try {
    const items = await FoodItem.find({ restaurant: req.params.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Add a new restaurant
router.post('/add', authenticate, authorize(['owner']), async (req, res) => {
  try {
    const { name, location } = req.body;
    if (!name) {
      return res.status(400).json({ msg: 'Restaurant name is required.' });
    }
    const restaurant = new Restaurant({ name, location, owner: req.user.id });
    await restaurant.save();
    res.json({ msg: 'Restaurant added' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Add a food item to a restaurant
router.post('/:id/food', authenticate, authorize(['owner']), upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const image = req.file ? req.file.path : '';
    if (!name || !price) {
      return res.status(400).json({ msg: 'Name and price are required.' });
    }
    const food = new FoodItem({ name, price, category, description, image, restaurant: req.params.id });
    await food.save();
    await Restaurant.findByIdAndUpdate(req.params.id, { $push: { menu: food._id } });
    res.json({ msg: 'Food item added' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Get orders for a restaurant
router.get('/:id/orders', authenticate, authorize(['owner']), async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const orders = await Order.find({ restaurant: restaurantId })
      .populate('user', 'name')
      .populate('items');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

export default router;