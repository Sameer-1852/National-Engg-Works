const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { protect } = require("../Middleware/auth.middleware");
const { adminOnly } = require("../Middleware/admin.middleware");

router.get("/", getAllCategories);
router.post("/", protect, adminOnly, createCategory);
router.put("/:id", protect, adminOnly, updateCategory);
router.delete("/:id", protect, adminOnly, deleteCategory);

module.exports = router;
