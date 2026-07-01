import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}

      <section className="hero">
        <div className="hero-content">
          <h1>
            Manage Events.
            <br />
            Sell Tickets.
            <br />
            <span>Create Memories.</span>
          </h1>

          <p>
            EventPro helps you create, manage, book tickets
            and analyze events with ease.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">
              Explore Events
            </button>

            <button className="btn-secondary">
              Create Event
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"
            alt="Event"
          />
        </div>
      </section>

      {/* Statistics Section */}

      <section className="stats-section">
        <div className="stat-card">
          <h2>250+</h2>
          <p>Events Created</p>
        </div>

        <div className="stat-card">
          <h2>25K+</h2>
          <p>Happy Users</p>
        </div>

        <div className="stat-card">
          <h2>50K+</h2>
          <p>Tickets Sold</p>
        </div>

        <div className="stat-card">
          <h2>98%</h2>
          <p>Success Rate</p>
        </div>
      </section>

      {/* Featured Events */}

      <section className="featured-events">
        <h2>Featured Events</h2>

        <div className="event-grid">

          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=500"
              alt="Tech Conference"
            />
            <h3>Tech Conference 2026</h3>
            <p>📍 Bangalore, India</p>
          </div>

          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500"
              alt="Music Concert"
            />
            <h3>Live Music Concert</h3>
            <p>📍 Mumbai, India</p>
          </div>

          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=500"
              alt="Business Seminar"
            />
            <h3>Business Seminar</h3>
            <p>📍 Delhi, India</p>
          </div>

        </div>
      </section>
    </>
  );
}

export default Home;