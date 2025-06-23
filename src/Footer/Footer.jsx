import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import "./Footer.css";

function Footer({ darkMode, setDarkMode }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="section logo-info">
          <Link to="/" className="footer-logo">
            <img src="/gear.svg" alt="Scheduler Logo" />
            <span>SCHEDULAR</span>
          </Link>
          <p>Scheduling made simple. Visualize. Analyze. Optimize.</p>
        </div>

        <div className="footer-inline">
          <div className="section links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/about" className="nav-link">About</Link></li>
            </ul>
          </div>

          <div className="section theme">
            <h4>Theme</h4>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              <img
                src={darkMode ? "/sun.svg" : "/moon.svg"}
                alt="Toggle Theme"
                className="theme-icon"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 SCHEDULAR. All rights reserved.</p>
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to Top"
        >
          <ArrowUp size={18} /> Back to Top
        </button>
      </div>
    </footer>
  );
}

export default Footer;
