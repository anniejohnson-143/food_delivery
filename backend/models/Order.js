import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' }],
  status: { type: String, enum: ['In progress', 'Delivered'], default: 'In progress' },
  orderTime: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema); 