const User = require("../Models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "new_engineering_jwt_secret_2026", {
    expiresIn: "30d",
  });
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, companyName, role } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide name, email, and password");
    }

    const normalizedEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists with this email in MongoDB");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      plainPassword: password,
      phone: phone || "",
      companyName: companyName || "NEW – National Engineering Works",
      role: role || "Admin",
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        companyName: user.companyName,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (e) {
      isMatch = false;
    }

    if (!isMatch && (user.plainPassword === password || user.password === password)) {
      isMatch = true;
    }

    if (isMatch) {
      const userRole = (user.role || "").toLowerCase();
      if (userRole !== "admin" && userRole !== "author") {
        res.status(403);
        throw new Error("Access Denied: Only Admin or Author accounts are permitted to access Dashboard");
      }

      res.json({
        success: true,
        data: {
          _id: user._id,
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          phone: user.phone,
          companyName: user.companyName,
          role: user.role,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
