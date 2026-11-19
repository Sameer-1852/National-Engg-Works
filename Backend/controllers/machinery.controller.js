const mongoose = require("mongoose");
const Machinery = require("../models/Machinery.model");

const getAllMachinery = async (req, res, next) => {
  try {
    const {
      search,
      category,
      matrixCategory,
      capacity,
      alloy,
      drive,
      hydration,
      throughput,
      automation,
      featuredOnHome,
      featuredOnMatrix,
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { machineryName: { $regex: search, $options: "i" } },
        { modelCode: { $regex: search, $options: "i" } },
        { homeTitle: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All Machinery" && category !== "All") {
      filter.category = category;
    }

    if (matrixCategory && matrixCategory !== "All Equipment") {
      filter.matrixCategory = matrixCategory;
    }

    if (capacity) {
      const capList = capacity.split(",").map((c) => c.trim()).filter(Boolean);
      if (capList.length > 0) filter.capacityRating = { $in: capList };
    }

    if (alloy) {
      const alloyList = alloy.split(",").map((a) => a.trim()).filter(Boolean);
      if (alloyList.length > 0) filter.sanitaryAlloy = { $in: alloyList };
    }

    if (drive) {
      const driveList = drive.split(",").map((d) => d.trim()).filter(Boolean);
      if (driveList.length > 0) filter.driveTransmission = { $in: driveList };
    }

    if (hydration && hydration !== "Any Hydration Rating") {
      filter.hydrationProfile = { $regex: hydration, $options: "i" };
    }

    if (throughput && throughput !== "All Production Volumes") {
      filter.throughputTier = { $regex: throughput, $options: "i" };
    }

    if (automation && automation !== "All Automation Architectures") {
      filter.automationTier = { $regex: automation, $options: "i" };
    }

    if (featuredOnHome === "true") {
      filter.featuredOnHome = true;
    }

    if (featuredOnMatrix === "true") {
      filter.featuredOnMatrix = true;
    }

    const machinery = await Machinery.find(filter).sort({ catalogOrder: 1, createdAt: 1 });
    res.json({
      success: true,
      count: machinery.length,
      data: machinery,
    });
  } catch (error) {
    next(error);
  }
};

const getMachineryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let item = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      item = await Machinery.findById(id);
    }

    if (!item) {
      item = await Machinery.findOne({
        $or: [
          { modelCode: { $regex: `^${id}$`, $options: "i" } },
          { homeCode: { $regex: `^${id}$`, $options: "i" } },
        ],
      });
    }

    if (!item) {
      res.status(404);
      throw new Error("Machinery system not found");
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

const createMachinery = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      const imgUrl = `/uploads/${req.file.filename}`;
      payload.catalogImage = imgUrl;
      payload.homeImage = imgUrl;
      payload.detailMainImage = imgUrl;
      payload.images = [imgUrl];
    }
    const created = await Machinery.create(payload);
    res.status(201).json({
      success: true,
      message: "Machinery system added successfully",
      data: created,
    });
  } catch (error) {
    next(error);
  }
};

const updateMachinery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };
    if (req.file) {
      const imgUrl = `/uploads/${req.file.filename}`;
      payload.catalogImage = imgUrl;
      payload.homeImage = imgUrl;
      payload.detailMainImage = imgUrl;
      payload.images = [imgUrl];
    }

    const updated = await Machinery.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404);
      throw new Error("Machinery system not found");
    }

    res.json({
      success: true,
      message: "Machinery system updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMachinery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Machinery.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404);
      throw new Error("Machinery system not found");
    }
    res.json({
      success: true,
      message: "Machinery system deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMachinery,
  getMachineryById,
  createMachinery,
  updateMachinery,
  deleteMachinery,
};
