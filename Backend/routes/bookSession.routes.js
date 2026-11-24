const express = require("express");
const router = express.Router();
const {
  createBookSession,
  getAllBookSessions,
  updateBookSession,
  deleteBookSession,
} = require("../controllers/bookSession.controller");

// Public route to book 1-on-1 session from Start Business Page
router.post("/", createBookSession);

// Session management routes
router.get("/", getAllBookSessions);
router.put("/:id", updateBookSession);
router.delete("/:id", deleteBookSession);

module.exports = router;
