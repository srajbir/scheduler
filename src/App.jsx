import { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
import InputTable from "./Job-Hub/InputTable";
import SchedulerDashboard from "./Job-Hub/SchedulerDashboard";
import About from "./About/About";
import "./App.css";

// Scroll to top logic inline
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Router>
      <ScrollAndRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
    </Router>
  );
}

// This wraps routing + scroll behaviors
function ScrollAndRoutes({ darkMode, setDarkMode }) {
  const location = useLocation();

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = document.querySelector(".scroll-progress");
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollValue = (window.scrollY / totalHeight) * 100;
      if (scrollProgress) scrollProgress.style.width = `${scrollValue}%`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      <div className="scroll-progress" />
      <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={
            <>
              <InputTable />
              <SchedulerDashboard />
            </>
        }/>
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
    </>
  );
}

export default App;
