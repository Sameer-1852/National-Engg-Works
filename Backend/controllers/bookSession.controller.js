const BookSession = require("../Models/BookSession.model");

const createBookSession = async (req, res, next) => {
  try {
    const { name, phone, email, notes } = req.body;

    const clientName = name || req.body.customerName;
    const clientPhone = phone || req.body.mobileNumber;
    const clientEmail = email;

    if (!clientName || !clientPhone || !clientEmail) {
      res.status(400);
      throw new Error(
        "Name, Mobile Number, and Email are required to book a 1-on-1 session"
      );
    }

    const session = await BookSession.create({
      name: clientName.trim(),
      phone: clientPhone.trim(),
      email: clientEmail.trim().toLowerCase(),
      notes:
        notes ||
        "Free 1-on-1 Consultation Session Request from Start Business Page",
    });

    res.status(201).json({
      success: true,
      message: "1-on-1 free session booked and saved in MongoDB successfully!",
      data: session,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBookSessions = async (req, res, next) => {
  try {
    const sessions = await BookSession.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    next(error);
  }
};

const updateBookSession = async (req, res, next) => {
  try {
    const session = await BookSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!session) {
      res.status(404);
      throw new Error("Booked session record not found in MongoDB");
    }
    res.json({
      success: true,
      message: "Session updated successfully",
      data: session,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBookSession = async (req, res, next) => {
  try {
    const session = await BookSession.findByIdAndDelete(req.params.id);
    if (!session) {
      res.status(404);
      throw new Error("Booked session record not found in MongoDB");
    }
    res.json({
      success: true,
      message: "Session deleted successfully from MongoDB",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBookSession,
  getAllBookSessions,
  updateBookSession,
  deleteBookSession,
};
