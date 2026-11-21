const Category = require("../Models/Category.model");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { categoryName, description, type, status, image, icon } = req.body;
    const slug = (categoryName || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const created = await Category.create({
      categoryName,
      slug,
      description,
      type: type || "both",
      status: status || "Active",
      image: image || "/images/cat-sm250s.png",
      icon: icon || "Cog",
    });
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: created,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      res.status(404);
      throw new Error("Category not found");
    }
    res.json({
      success: true,
      message: "Category updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error("Category not found");
    }
    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
