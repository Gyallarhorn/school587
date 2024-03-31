import mongoose from 'mongoose';

const AdminSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Admin = mongoose.model('admin', AdminSchema);

export default Admin;
