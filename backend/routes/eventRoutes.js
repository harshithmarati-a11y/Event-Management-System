const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

// Create Event with Image Upload
router.post(
  "/",
  upload.single("image"),
  createEvent
);

// Get All Events
router.get("/", getEvents);

// Get Single Event
router.get("/:id", getEventById);

// Update Event with Image Upload
router.put(
  "/:id",
  upload.single("image"),
  updateEvent
);

// Delete Event
router.delete("/:id", deleteEvent);

module.exports = router;