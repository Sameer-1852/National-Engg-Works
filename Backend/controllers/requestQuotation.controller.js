const RequestQuotation = require("../models/RequestQuotation.model");

const createRequestQuotation = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    if (!payload.customerName && payload.name) {
      payload.customerName = payload.name;
    }
    if (!payload.customerName && payload.clientName) {
      payload.customerName = payload.clientName;
    }
    if (!payload.customerName && payload.email) {
      payload.customerName = payload.email.split("@")[0];
    }

    if (!payload.customerName || !payload.email || !payload.phone) {
      res.status(400);
      throw new Error("Client name, email address, and mobile number are required");
    }

    const quotation = await RequestQuotation.create(payload);

    res.status(201).json({
      success: true,
      message: "Request quotation submitted and recorded in MongoDB RequestQuotation collection successfully.",
      data: quotation,
    });
  } catch (error) {
    next(error);
  }
};

const getAllRequestQuotations = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== "All") {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { machineryModel: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const quotations = await RequestQuotation.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: quotations.length,
      data: quotations,
    });
  } catch (error) {
    next(error);
  }
};

const getRequestQuotationById = async (req, res, next) => {
  try {
    const quotation = await RequestQuotation.findById(req.params.id);
    if (!quotation) {
      res.status(404);
      throw new Error("Request quotation record not found in MongoDB");
    }
    res.json({
      success: true,
      data: quotation,
    });
  } catch (error) {
    next(error);
  }
};

const updateRequestQuotation = async (req, res, next) => {
  try {
    const updated = await RequestQuotation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      res.status(404);
      throw new Error("Request quotation record not found");
    }
    res.json({
      success: true,
      message: "Request quotation updated successfully in MongoDB",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRequestQuotation = async (req, res, next) => {
  try {
    const deleted = await RequestQuotation.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error("Request quotation record not found");
    }
    res.json({
      success: true,
      message: "Request quotation permanently deleted from MongoDB RequestQuotation collection",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRequestQuotation,
  getAllRequestQuotations,
  getRequestQuotationById,
  updateRequestQuotation,
  deleteRequestQuotation,
};
