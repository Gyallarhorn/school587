import mongoose from 'mongoose';

const universitySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
});

export default mongoose.model('University', universitySchema);
