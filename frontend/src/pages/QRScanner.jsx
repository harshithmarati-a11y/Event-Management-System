import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Html5QrcodeScanner } from "html5-qrcode";
import { verifyQR } from "../services/qrService";
import "../styles/QRScanner.css";

function QRScanner() {
  const [result, setResult] = useState("");
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      false
    );

    scanner.render(
      async (decodedText) => {
        try {
          const qr = JSON.parse(decodedText);

          const response = await verifyQR(qr.ticketId);

          setResult(response.message);
          setTicket(response.ticket);

          scanner.clear();

        } catch (error) {

          setResult(
            error.response?.data?.message ||
              "Invalid QR Code"
          );

        }
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="scanner-container">
      <Sidebar />

      <div className="scanner-content">

        <h1>QR Ticket Scanner</h1>

        <div id="reader"></div>

        {result && (
          <div className="result-card">

            <h2>{result}</h2>

            {ticket && (
              <>

                <h3>{ticket.event.title}</h3>

                <p>
                  📍 {ticket.event.venue}
                </p>

                <p>
                  🎟 Quantity : {ticket.quantity}
                </p>

                <p>
                  💰 ₹ {ticket.totalAmount}
                </p>

                <p>
                  Payment : {ticket.paymentStatus}
                </p>

              </>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default QRScanner;