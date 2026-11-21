const express = require("express");
const router = express.Router();
const {
  createRequestQuotation,
  getAllRequestQuotations,
  getRequestQuotationById,
  updateRequestQuotation,
  deleteRequestQuotation,
} = require("../controllers/requestQuotation.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

// Public submit from website Request Quotation forms & modals
router.post("/", createRequestQuotation);

// Admin dashboard routes
router.get("/", protect, adminOnly, getAllRequestQuotations);
router.get("/:id", protect, adminOnly, getRequestQuotationById);
router.put("/:id", protect, adminOnly, updateRequestQuotation);
router.delete("/:id", protect, adminOnly, deleteRequestQuotation);

module.exports = router;
