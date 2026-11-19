const connectDB = require("../config/db");

const Connection = async () => {
  return await connectDB();
};

module.exports = { Connection };
