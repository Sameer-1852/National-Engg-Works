const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = (
      process.env.MONGODB_URL ||
      process.env.MONGODB_URI ||
      process.env.MONGO_URI ||
      process.env.DATABASE_URL ||
      process.env.MONGO_URL ||
      ""
    ).trim();

    if (!uri) {
      throw new Error("MONGODB_URL / MONGODB_URI is not defined in environment variables");
    }
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    throw err;
  }
};

module.exports = connectDB;
