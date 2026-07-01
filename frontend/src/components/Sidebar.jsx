import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">

      <h2 className="logo">
        EMS
      </h2>

      <Link to="/dashboard">
        Dashboard
      </Link>

      <Link to="/events">
        Events
      </Link>

      <Link to="/create-event">
        Create Event
      </Link>

      <Link to="/my-tickets">
        My Tickets
      </Link>

      <Link to="/qr-scanner">
        QR Scanner
      </Link>

      <Link to="/analytics">
        Analytics
      </Link>

      <Link to="/reports">
        Reports
      </Link>

      <Link to="/profile">
        Profile
      </Link>

      <button
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>

    </div>
  );
}

export default Sidebar;