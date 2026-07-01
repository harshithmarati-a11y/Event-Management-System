const Ticket = require("../models/Ticket");
const generateQRCode = require("../utils/qrGenerator");

// Generate QR Code for a Ticket
const generateTicketQR = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    const qrData = JSON.stringify({
      ticketId: ticket._id,
      event: ticket.event,
      user: ticket.user,
    });

    const qrCode = await generateQRCode(qrData);

    ticket.qrCode = qrCode;
    await ticket.save();

    res.status(200).json({
      message: "QR Generated Successfully",
      qrCode,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Verify QR Code
const verifyQRCode = async (req, res) => {
  try {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId)
      .populate("event")
      .populate("user");

    if (!ticket) {
      return res.status(404).json({
        message: "Invalid Ticket",
      });
    }

    if (ticket.isUsed) {
      return res.status(400).json({
        message: "Ticket Already Used",
      });
    }

    ticket.isUsed = true;
    await ticket.save();

    res.status(200).json({
      message: "Entry Allowed",
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateTicketQR,
  verifyQRCode,
};