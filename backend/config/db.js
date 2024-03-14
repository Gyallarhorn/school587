import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connect to db ✅');
  } catch (error) {
    console.log(`Failed to connect 🤬 ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
