import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { bookTicket } from "../services/ticketService";
import "../styles/TicketBooking.css";

function TicketBooking() {
  const navigate = useNavigate();
  const location = useLocation();

  const event = location.state?.event;

  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return (
      <div className="booking-container">
        <Sidebar />
        <div className="booking-content">
          <h2>No Event Selected</h2>
        </div>
      </div>
    );
  }

  const total = quantity * event.price;

  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await bookTicket({
        user: user._id,
        event: event._id,
        quantity,
      });

      alert("Ticket Booked Successfully");

      navigate("/my-tickets");

    } catch (error) {
      alert(error.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <div className="booking-container">
      <Sidebar />

      <div className="booking-content">

        <h1>{event.title}</h1>

        <img
          src={
            event.image
              ? `https://event-management-system-p1cp.onrender.com${event.image}`
              : "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
          }
          alt={event.title}
          className="booking-image"
        />

        <div className="booking-card">

          <h2>Ticket Booking</h2>

          <p>
            <strong>Venue:</strong> {event.venue}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(event.date).toLocaleDateString()}
          </p>

          <p>
            <strong>Price:</strong> ₹ {event.price}
          </p>

          <p>
            <strong>Available:</strong>{" "}
            {event.availableTickets}
          </p>

          <label>Quantity</label>

          <input
            type="number"
            min="1"
            max={event.availableTickets}
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
          />

          <h2>Total : ₹ {total}</h2>

          <button
            className="book-btn"
            onClick={handleBooking}
          >
            Book Ticket
          </button>

        </div>

      </div>
    </div>
  );
}

export default TicketBooking;