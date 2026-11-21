const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiry.controller");
const { protect } = require("../Middleware/auth.middleware");
const { adminOnly } = require("../Middleware/admin.middleware");

router.post("/", createEnquiry);
router.get("/", protect, adminOnly, getAllEnquiries);
router.get("/:id", protect, adminOnly, getEnquiryById);
router.put("/:id", protect, adminOnly, updateEnquiry);
router.delete("/:id", protect, adminOnly, deleteEnquiry);

module.exports = router;
