const Enquiry = require("../models/Enquiry.model");

const createEnquiry = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    if (!payload.customerName && payload.email) {
      payload.customerName = payload.email.split("@")[0];
    }

    if (!payload.customerName) {
      res.status(400);
      throw new Error("Customer name or email is required");
    }

    const enquiry = await Enquiry.create(payload);

    res.status(201).json({
      success: true,
      message: "Engineering inquiry submitted and logged in database successfully.",
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

const getAllEnquiries = async (req, res, next) => {
  try {
    const { status, enquiryType, search } = req.query;
    const filter = {};

    if (status && status !== "All") {
      filter.status = status;
    }

    if (enquiryType && enquiryType !== "All") {
      filter.enquiryType = enquiryType;
    }

    if (search) {
      filter.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { machineryModel: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};

const getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      res.status(404);
      throw new Error("Enquiry not found");
    }
    res.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

const updateEnquiry = async (req, res, next) => {
  try {
    const updated = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      res.status(404);
      throw new Error("Enquiry not found");
    }
    res.json({
      success: true,
      message: "Enquiry updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEnquiry = async (req, res, next) => {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error("Enquiry not found");
    }
    res.json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
