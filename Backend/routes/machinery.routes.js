const express = require("express");
const router = express.Router();
const {
  getAllMachinery,
  getMachineryById,
  createMachinery,
  updateMachinery,
  deleteMachinery,
} = require("../controllers/machinery.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");
const upload = require("../utils/upload");

router.get("/", getAllMachinery);
router.get("/:id", getMachineryById);
router.post("/", protect, adminOnly, upload.single("image"), createMachinery);
router.put("/:id", protect, adminOnly, upload.single("image"), updateMachinery);
router.delete("/:id", protect, adminOnly, deleteMachinery);

module.exports = router;
