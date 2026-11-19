const express = require("express");
const router = express.Router();
const {
  getDashboardOverview,
  getAdminUsers,
  getAdminAnalytics,
} = require("../controllers/admin.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

router.get("/dashboard", protect, adminOnly, getDashboardOverview);
router.get("/users", protect, adminOnly, getAdminUsers);
router.get("/analytics", protect, adminOnly, getAdminAnalytics);

module.exports = router;
