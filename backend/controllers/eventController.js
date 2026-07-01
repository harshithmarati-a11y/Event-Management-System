const Event = require("../models/Event");

// ======================
// CREATE EVENT
// ======================
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      venue,
      date,
      time,
      price,
      totalTickets,
      availableTickets,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      category,
      venue,
      date,
      time,
      price,
      totalTickets,
      availableTickets,
      image: req.file ? `/uploads/event-images/${req.file.filename}` : "",
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// GET ALL EVENTS
// ======================
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// GET SINGLE EVENT
// ======================
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event Not Found",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// UPDATE EVENT
// ======================
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event Not Found",
      });
    }

    event.title = req.body.title;
    event.description = req.body.description;
    event.category = req.body.category;
    event.venue = req.body.venue;
    event.date = req.body.date;
    event.time = req.body.time;
    event.price = req.body.price;
    event.totalTickets = req.body.totalTickets;
    event.availableTickets = req.body.availableTickets;

    if (req.file) {
      event.image = `/uploads/event-images/${req.file.filename}`;
    }

    const updatedEvent = await event.save();

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// DELETE EVENT
// ======================
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event Not Found",
      });
    }

    await event.deleteOne();

    res.json({
      message: "Event Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};