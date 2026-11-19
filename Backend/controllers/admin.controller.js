const Enquiry = require("../models/Enquiry.model");
const Product = require("../models/Product.model");
const Machinery = require("../models/Machinery.model");
const Category = require("../models/Category.model");
const User = require("../models/User.model");

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
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({
      success: true,
      count: users.length,
      data: users,
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
  getAdminAnalytics,
};
