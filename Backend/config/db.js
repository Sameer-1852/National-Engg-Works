const mongoose = require("mongoose");
const dns = require("dns");

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

    // Solve querySrv ECONNREFUSED for MongoDB Atlas clusters across local ISPs and networks
    try {
      dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
    } catch (e) {
      // ignore if environment does not allow setting custom DNS
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    throw err;
  }
};

module.exports = connectDB;
