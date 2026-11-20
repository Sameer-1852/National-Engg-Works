const express = require("express");
const router = express.Router();
const {
  getDashboardOverview,
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  getAdminAnalytics,
} = require("../controllers/admin.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

router.get("/dashboard", protect, adminOnly, getDashboardOverview);
router.get("/users", protect, adminOnly, getAdminUsers);
router.post("/users", protect, adminOnly, createAdminUser);
router.put("/users/:id", protect, adminOnly, updateAdminUser);
router.delete("/users/:id", protect, adminOnly, deleteAdminUser);
router.get("/analytics", protect, adminOnly, getAdminAnalytics);

module.exports = router;
