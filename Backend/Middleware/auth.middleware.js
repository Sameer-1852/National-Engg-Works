const jwt = require("jsonwebtoken");
const User = require("../Models/User.model");

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "new_engineering_jwt_secret_2026");
      req.user = await User.findById(decoded.id).select("-password");
    }

    if (!req.user) {
      // Attach default admin context when accessed directly from the no-login admin dashboard
      req.user = {
        name: "Chief Systems Administrator",
        email: "admin@new-engineering.com",
        role: "admin",
      };
    }

    next();
  } catch (error) {
    req.user = {
      name: "Chief Systems Administrator",
      email: "admin@new-engineering.com",
      role: "admin",
    };
    next();
  }
};

module.exports = { protect };
