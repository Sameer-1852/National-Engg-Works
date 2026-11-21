const Contact = require("../models/Contact.model");

const createContact = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    if (!payload.customerName && payload.name) {
      payload.customerName = payload.name;
    }
    if (!payload.customerName && payload.email) {
      payload.customerName = payload.email.split("@")[0];
    }

    if (!payload.customerName || !payload.email || !payload.message) {
      res.status(400);
      throw new Error("Customer name, email address, and operational message are required");
    }

    const contact = await Contact.create(payload);

    res.status(201).json({
      success: true,
      message: "Contact inquiry submitted and recorded in MongoDB Contact collection successfully.",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

const getAllContacts = async (req, res, next) => {
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
        { facilityLocation: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact submission record not found in MongoDB");
    }
    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      res.status(404);
      throw new Error("Contact submission record not found");
    }
    res.json({
      success: true,
      message: "Contact submission updated successfully in MongoDB",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error("Contact submission record not found");
    }
    res.json({
      success: true,
      message: "Contact submission permanently deleted from MongoDB Contact collection",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
