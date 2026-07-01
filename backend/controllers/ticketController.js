const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const generateQRCode = require("../utils/qrGenerator");

// ==========================
// Book Ticket
// ==========================
const bookTicket = async (req, res) => {
  try {
    const { user, event, quantity } = req.body;

    const eventData = await Event.findById(event);

    if (!eventData) {
      return res.status(404).json({
        message: "Event Not Found",
      });
    }

    if (eventData.availableTickets < quantity) {
      return res.status(400).json({
        message: "Not enough tickets available",
      });
    }

    const totalAmount = quantity * eventData.price;

    const ticket = await Ticket.create({
      user,
      event,
      quantity,
      totalAmount,
    });

    // Generate QR Code
    const qrData = JSON.stringify({
      ticketId: ticket._id,
    });

    ticket.qrCode = await generateQRCode(qrData);

    await ticket.save();

    eventData.availableTickets -= quantity;

    await eventData.save();

    res.status(201).json({
      message: "Ticket Booked Successfully",
      ticket,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get All Tickets
// ==========================
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("event")
      .populate("user");

    res.json(tickets);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Ticket
// ==========================
const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("event")
      .populate("user");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket Not Found",
      });
    }

    res.json(ticket);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete Ticket
// ==========================
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket Not Found",
      });
    }

    const event = await Event.findById(ticket.event);

    if (event) {
      event.availableTickets += ticket.quantity;
      await event.save();
    }

    await ticket.deleteOne();

    res.json({
      message: "Ticket Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  bookTicket,
  getTickets,
  getTicket,
  deleteTicket,
};