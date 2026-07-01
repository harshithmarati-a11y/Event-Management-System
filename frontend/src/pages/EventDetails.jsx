import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getEvent, deleteEvent } from "../services/eventService";
import "../styles/EventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvent();
  }, []);

  const loadEvent = async () => {
    try {
      const data = await getEvent(id);
      setEvent(data);
    } catch (error) {
      alert("Unable to load event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEvent(id);

      alert("Event Deleted Successfully");

      navigate("/events");
    } catch (error) {
      alert("Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="event-details-container">
        <Sidebar />
        <div className="event-details-content">
          <h2>Loading Event...</h2>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-details-container">
        <Sidebar />
        <div className="event-details-content">
          <h2>Event Not Found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="event-details-container">
      <Sidebar />

      <div className="event-details-content">

       <img
  className="event-banner"
  src={
    event.image
      ? `http://localhost:5000${event.image}`
      : "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
  }
  alt={event.title}
/>

        <h1>{event.title}</h1>

        <div className="details-grid">

          <div className="detail-card">
            <h3>Category</h3>
            <p>{event.category}</p>
          </div>

          <div className="detail-card">
            <h3>Date</h3>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>

          <div className="detail-card">
            <h3>Time</h3>
            <p>{event.time}</p>
          </div>

          <div className="detail-card">
            <h3>Venue</h3>
            <p>{event.venue}</p>
          </div>

          <div className="detail-card">
            <h3>Ticket Price</h3>
            <p>₹ {event.price}</p>
          </div>

          <div className="detail-card">
            <h3>Available Tickets</h3>
            <p>{event.availableTickets}</p>
          </div>

        </div>

        <div className="description-box">
          <h2>Description</h2>
          <p>{event.description}</p>
        </div>

        <div className="event-buttons">

          <Link to={`/edit-event/${event._id}`}>
            <button className="edit-btn">
              Edit Event
            </button>
          </Link>

          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            Delete Event
          </button>

         <Link
  to="/book-ticket"
  state={{ event }}
>
            <button className="book-ticket-btn">
              Book Ticket
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default EventDetails;