const express = require("express");

const router = express.Router();

const {
  bookTicket,
  getTickets,
  getTicket,
  deleteTicket,
} = require("../controllers/ticketController");

// Book Ticket
router.post("/", bookTicket);

// Get All Tickets
router.get("/", getTickets);

// Get Single Ticket
router.get("/:id", getTicket);

// Delete Ticket
router.delete("/:id", deleteTicket);

module.exports = router;