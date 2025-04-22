import mongoose from 'mongoose';

const usageSchema = new mongoose.Schema({
  device:   { type: String, required: true },
  status:   { type: String, enum: ['on','off'], required: true },
  timestamp:{ type: Date, default: Date.now }
});

export default mongoose.model('Usage', usageSchema);
