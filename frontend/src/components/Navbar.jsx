import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      
      {/* Logo */}
      <div className="logo">
        🎉 EventPro
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/events">Events</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/features">Features</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Buttons */}
      <div className="nav-buttons">
        <Link to="/login">
          <button className="login-btn">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="signup-btn">
            Sign Up
          </button>
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;