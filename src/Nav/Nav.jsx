import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import gearIcon from '../assets/gear.svg';
import homeIcon from '../assets/home.svg';
import aboutIcon from '../assets/about.svg';
import moonIcon from '../assets/moon.svg';
import sunIcon from '../assets/sun.svg';

function Nav({ darkMode, setDarkMode }) {
  const location = useLocation();

  return (
    <div className="nav-container">
      <div className="title-container">
        <img src={gearIcon} alt="Scheduler" />
        <span>SCHEDULER</span>
      </div>

      <div className="link-container">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          <span className="nav-text">Home</span>
          <img src={homeIcon} alt="Home" className="nav-icon mobile-only" />
        </Link>

        <Link
          to="/about"
          className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
        >
          <span className="nav-text">About</span>
          <img src={aboutIcon} alt="About" className="nav-icon mobile-only" />
        </Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle"
          title="Toggle Theme"
        >
          <img
            src={darkMode ? {sunIcon} : {moonIcon}}
            alt="Theme Toggle"
            className="theme-icon"
          />
        </button>
      </div>
    </div>
  );
}

export default Nav;
