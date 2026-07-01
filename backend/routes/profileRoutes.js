const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

// Get Profile
router.get("/:id", getProfile);

// Update Profile
router.put(
  "/:id",
  upload.single("image"),
  updateProfile
);

module.exports = router;