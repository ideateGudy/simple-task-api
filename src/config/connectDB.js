import mongoose from "mongoose";
import { logger } from "./winston.js";

const log = logger.child({ file: "connectDB.js" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    log.info("✅ MongoDB connected");
  } catch (error) {
    log.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
