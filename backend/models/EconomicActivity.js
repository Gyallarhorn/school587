import mongoose from 'mongoose';

const economicActivitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

export default mongoose.model('Activity', economicActivitySchema);
