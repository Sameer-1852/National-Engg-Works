const express = require("express");
const router = express.Router();

router.get("/Demo", (req, res) => {
  res.json({ message: "Demo API" });
});

module.exports = router;