import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

function Nav({ darkMode, setDarkMode }) {
  const location = useLocation();

  return (
    <div className="nav-container">
      <div className="title-container">
        <img src="/gear.svg" alt="Scheduler" />
        <span>SCHEDULER</span>
      </div>

      <div className="link-container">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          <span className="nav-text">Home</span>
          <img src="/home.svg" alt="Home" className="nav-icon mobile-only" />
        </Link>

        <Link
          to="/about"
          className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
        >
          <span className="nav-text">About</span>
          <img src="/about.svg" alt="About" className="nav-icon mobile-only" />
        </Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle"
          title="Toggle Theme"
        >
          <img
            src={darkMode ? "/sun.svg" : "/moon.svg"}
            alt="Theme Toggle"
            className="theme-icon"
          />
        </button>
      </div>
    </div>
  );
}

export default Nav;
