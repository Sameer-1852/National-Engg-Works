const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiry.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

router.post("/", createEnquiry);
router.get("/", protect, adminOnly, getAllEnquiries);
router.get("/:id", protect, adminOnly, getEnquiryById);
router.put("/:id", protect, adminOnly, updateEnquiry);
router.delete("/:id", protect, adminOnly, deleteEnquiry);

module.exports = router;
