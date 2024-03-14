import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  letter: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  social: {
    type: String,
    trim: true,
  },
  almaMater: {
    type: String,
    trim: true,
  },
  economicActivity: {
    type: String,
    trim: true,
  },
  position: {
    type: String,
    trim: true,
  },
  workplace: {
    type: String,
    trim: true,
  },
  success: {
    type: String,
    trim: true,
  },
  isSuccess: {
    type: String,
    trim: true,
  },
  achievement: {
    type: String,
    trim: true,
  },
  defineSuccess: {
    type: String,
    trim: true,
  },
  successSource: {
    type: String,
    trim: true,
  },
  mistakes: {
    type: String,
    trim: true,
  },
  wish: {
    type: String,
    trim: true,
  },
  wishToGraduates: {
    type: String,
    trim: true,
  },
  photo: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isChecked: {
    type: Boolean,
    required: true,
    default: false,
  },
  isPermitted: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
