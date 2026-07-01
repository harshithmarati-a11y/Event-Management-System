import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  getEvents,
  deleteEvent,
} from "../services/eventService";
import "../styles/Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEvent(id);

      alert("Event Deleted Successfully");

      fetchEvents();
    } catch (error) {
      alert("Delete Failed");
    }
  };

  return (
    <div className="events-container">
      <Sidebar />

      <div className="events-content">

        <h1>All Events</h1>

        {loading ? (
          <h2>Loading Events...</h2>
        ) : events.length === 0 ? (
          <h2>No Events Found</h2>
        ) : (
          <div className="events-grid">

            {events.map((event) => (

              <div className="event-card" key={event._id}>

               <img
  className="event-image"
  src={
    event.image
      ? `http://localhost:5000${event.image}`
      : "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
  }
  alt={event.title}
/>

                <div className="event-info">

                  <h2>{event.title}</h2>

                  <p>
                    <strong>Category:</strong> {event.category}
                  </p>

                  <p>📍 {event.venue}</p>

                  <p>
                    📅 {new Date(event.date).toLocaleDateString()}
                  </p>

                  <p>🕒 {event.time}</p>

                  <p>🎟 ₹ {event.price}</p>

                  <p>
                    Available Tickets : {event.availableTickets}
                  </p>

                  <div className="event-buttons">

                    <Link to={`/event/${event._id}`}>
                      <button className="view-btn">
                        View Details
                      </button>
                    </Link>

                    <Link to={`/edit-event/${event._id}`}>
                      <button className="edit-btn">
                        Edit
                      </button>
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Events;