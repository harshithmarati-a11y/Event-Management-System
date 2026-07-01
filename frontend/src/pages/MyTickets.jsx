import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  getTickets,
  deleteTicket,
} from "../services/ticketService";
import "../styles/MyTickets.css";

function MyTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (error) {
      alert("Failed to load tickets");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this ticket?")) return;

    try {
      await deleteTicket(id);

      alert("Ticket Deleted Successfully");

      fetchTickets();
    } catch (error) {
      alert("Delete Failed");
    }
  };

  const downloadQR = (qrCode, ticketId) => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `Ticket-${ticketId}.png`;
    link.click();
  };

  return (
    <div className="tickets-container">
      <Sidebar />

      <div className="tickets-content">

        <h1>My Tickets</h1>

        {tickets.length === 0 ? (
          <h2>No Tickets Found</h2>
        ) : (
          <div className="ticket-grid">

            {tickets.map((ticket) => (

              <div
                className="ticket-card"
                key={ticket._id}
              >

                {ticket.event?.image && (
                  <img
                    className="ticket-image"
                    src={`https://event-management-system-p1cp.onrender.com${ticket.event.image}`}
                    alt={ticket.event.title}
                  />
                )}

                <h2>{ticket.event?.title}</h2>

                <p>📍 {ticket.event?.venue}</p>

                <p>
                  📅{" "}
                  {new Date(
                    ticket.bookingDate
                  ).toLocaleDateString()}
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

                <p>
                  Status :
                  {" "}
                  {ticket.isUsed ? (
                    <span
                      style={{ color: "red" }}
                    >
                      Used
                    </span>
                  ) : (
                    <span
                      style={{ color: "#10b981" }}
                    >
                      Valid
                    </span>
                  )}
                </p>

                {ticket.qrCode && (
                  <div className="qr-section">

                    <img
                      className="qr-image"
                      src={ticket.qrCode}
                      alt="QR Code"
                    />

                    <button
                      className="download-btn"
                      onClick={() =>
                        downloadQR(
                          ticket.qrCode,
                          ticket._id
                        )
                      }
                    >
                      Download QR
                    </button>

                  </div>
                )}

                <button
                  className="delete-ticket-btn"
                  onClick={() =>
                    handleDelete(ticket._id)
                  }
                >
                  Delete Ticket
                </button>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyTickets;