import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' }]
});

export default mongoose.model('Restaurant', restaurantSchema); 