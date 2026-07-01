import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getEvent, updateEvent } from "../services/eventService";
import "../styles/CreateEvent.css";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    venue: "",
    price: "",
    description: "",
    totalTickets: "",
    availableTickets: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    loadEvent();
  }, []);

  const loadEvent = async () => {
    try {
      const data = await getEvent(id);

      setEventData({
        title: data.title || "",
        category: data.category || "",
        date: data.date ? data.date.split("T")[0] : "",
        time: data.time || "",
        venue: data.venue || "",
        price: data.price || "",
        description: data.description || "",
        totalTickets: data.totalTickets || "",
        availableTickets: data.availableTickets || "",
      });

      if (data.image) {
        setPreview(`https://event-management-system-p1cp.onrender.com${data.image}`);
      }
    } catch (error) {
      alert("Unable to load event.");
    }
  };

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(eventData).forEach((key) => {
        formData.append(key, eventData[key]);
      });

      if (image) {
        formData.append("image", image);
      }

      await updateEvent(id, formData);

      alert("Event Updated Successfully");

      navigate("/events");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="create-event-container">
      <Sidebar />

      <div className="create-event-content">
        <h1>Edit Event</h1>

        <form className="event-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={eventData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option>Conference</option>
              <option>Concert</option>
              <option>Workshop</option>
              <option>Seminar</option>
              <option>Festival</option>
              <option>Sports</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Venue</label>
            <input
              type="text"
              name="venue"
              value={eventData.venue}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Ticket Price (₹)</label>
            <input
              type="number"
              name="price"
              value={eventData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Total Tickets</label>
            <input
              type="number"
              name="totalTickets"
              value={eventData.totalTickets}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Available Tickets</label>
            <input
              type="number"
              name="availableTickets"
              value={eventData.availableTickets}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              rows="5"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Change Event Banner</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginTop: "20px",
                }}
              />
            )}
          </div>

          <button
            type="submit"
            className="create-btn"
          >
            Update Event
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditEvent;