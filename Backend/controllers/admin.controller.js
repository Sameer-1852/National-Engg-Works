const Enquiry = require("../Models/Enquiry.model");
const Product = require("../Models/Product.model");
const Machinery = require("../Models/Machinery.model");
const Category = require("../Models/Category.model");
const User = require("../Models/User.model");
const bcrypt = require("bcryptjs");

const getDashboardOverview = async (req, res, next) => {
  try {
    const [
      totalEnquiries,
      totalProducts,
      totalMachinery,
      totalCategories,
      recentEnquiries,
      allEnquiries,
    ] = await Promise.all([
      Enquiry.countDocuments(),
      Product.countDocuments(),
      Machinery.countDocuments(),
      Category.countDocuments(),
      Enquiry.find().sort({ createdAt: -1 }).limit(8),
      Enquiry.find(),
    ]);

    const uniqueCustomers = new Set(
      allEnquiries.map((e) => (e.email || e.customerName || "").toLowerCase()).filter(Boolean)
    ).size;

    const statusCounts = {
      New: 0,
      Pending: 0,
      Contacted: 0,
      "In Progress": 0,
      Completed: 0,
      Rejected: 0,
    };

    const typeCounts = {};

    allEnquiries.forEach((enq) => {
      const st = enq.status || "New";
      statusCounts[st] = (statusCounts[st] || 0) + 1;
      const tp = enq.enquiryType || "Business Enquiry";
      typeCounts[tp] = (typeCounts[tp] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        totalEnquiries,
        totalProducts,
        totalMachinery,
        totalCategories,
        totalCustomers: Math.max(uniqueCustomers, 4),
        statusCounts,
        typeCounts,
        recentEnquiries,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAdminUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    const formatted = users.map((u) => ({
      _id: u._id,
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      phone: u.phone || "",
      companyName: u.companyName,
      role: u.role || "Admin",
      password: u.plainPassword || "Admin@123",
      createdAt: u.createdAt,
    }));
    res.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    next(error);
  }
};

const createAdminUser = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, companyName } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide name, email, and password");
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      res.status(400);
      throw new Error("User already exists in MongoDB with this email");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      plainPassword: password,
      role: role || "Admin",
      phone: phone || "",
      companyName: companyName || "NEW – National Engineering Works",
    });

    res.status(201).json({
      success: true,
      message: "Admin/Author user created successfully in MongoDB",
      data: {
        _id: newUser._id,
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        password: newUser.plainPassword,
        phone: newUser.phone,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateAdminUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, name, phone, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw new Error("User not found in MongoDB");
    }

    if (role) user.role = role;
    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (password) {
      user.plainPassword = password;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({
      success: true,
      message: "User updated successfully in MongoDB",
      data: {
        _id: user._id,
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.plainPassword || "Admin@123",
        phone: user.phone,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdminUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw new Error("User not found in MongoDB");
    }

    await User.findByIdAndDelete(id);
    res.json({
      success: true,
      message: `User ${user.email} deleted successfully from MongoDB`,
    });
  } catch (error) {
    next(error);
  }
};

const getAdminAnalytics = async (req, res, next) => {
  try {
    const [enquiries, machinery] = await Promise.all([
      Enquiry.find(),
      Machinery.find(),
    ]);

    const categoryBreakdown = {};
    machinery.forEach((m) => {
      categoryBreakdown[m.category] = (categoryBreakdown[m.category] || 0) + 1;
    });

    const statusBreakdown = {
      New: 0,
      Pending: 0,
      Contacted: 0,
      "In Progress": 0,
      Completed: 0,
      Rejected: 0,
    };
    enquiries.forEach((e) => {
      statusBreakdown[e.status] = (statusBreakdown[e.status] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        categoryBreakdown,
        statusBreakdown,
        totalEnquiries: enquiries.length,
        totalMachinery: machinery.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardOverview,
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  getAdminAnalytics,
};
