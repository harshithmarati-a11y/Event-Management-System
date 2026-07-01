const express = require("express");

const router = express.Router();

const {
  generateTicketQR,
  verifyQRCode,
} = require("../controllers/qrController");

router.get("/generate/:ticketId", generateTicketQR);

router.post("/verify", verifyQRCode);

module.exports = router;