const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contact.controller");
const { protect } = require("../Middleware/auth.middleware");
const { adminOnly } = require("../Middleware/admin.middleware");

// Public submit from website Contact page
router.post("/", createContact);

// Admin dashboard routes
router.get("/", protect, adminOnly, getAllContacts);
router.get("/:id", protect, adminOnly, getContactById);
router.put("/:id", protect, adminOnly, updateContact);
router.delete("/:id", protect, adminOnly, deleteContact);

module.exports = router;
