import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  image: String,
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});

export default mongoose.model('FoodItem', foodItemSchema); 