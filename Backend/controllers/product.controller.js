const mongoose = require("mongoose");
const Product = require("../models/Product.model");

const getAllProducts = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { productName: { $regex: search, $options: "i" } },
        { modelCode: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All" && category !== "All Machinery") {
      filter.category = category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    }
    if (!product) {
      product = await Product.findOne({ modelCode: { $regex: `^${id}$`, $options: "i" } });
    }
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      payload.images = [`/uploads/${req.file.filename}`];
    }
    const created = await Product.create(payload);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: created,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      payload.images = [`/uploads/${req.file.filename}`];
    }
    const updated = await Product.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json({
      success: true,
      message: "Product updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
