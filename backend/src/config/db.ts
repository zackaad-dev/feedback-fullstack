import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn("MONGODB_URI not defined, using default localhost URI");
    }
    const conn = await mongoose.connect(
      mongoUri || "mongodb://localhost:27017/feedback"
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    const err = error as Error;
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
