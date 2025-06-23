import { Lightbulb, Wrench, LayoutDashboard, Star } from "lucide-react";
import "./about.css";

const About = () => {
  return (
    <section className="about-section">
      <h2 className="about-title">About This Scheduler App</h2>

      <div className="about-block">
        <div className="about-header">
          <Lightbulb className="about-icon" size={24} />
          <h3 className="about-subtitle">Purpose & Vision</h3>
        </div>
        <p className="about-text">
          This app is designed to help students, developers, and educators understand how CPU scheduling algorithms work. It provides hands-on interaction through editable job tables, dynamic Gantt charts, and detailed process analysis.
        </p>
      </div>

      <div className="about-block">
        <div className="about-header">
          <Wrench className="about-icon" size={24} />
          <h3 className="about-subtitle">Key Features</h3>
        </div>
        <ul className="about-list">
          <li>Editable job input table with add/delete</li>
          <li className="about-nested-heading">Supports major algorithms:</li>
          <ul className="about-sublist">
            <li>First Come First Serve</li>
            <li>Shortest Job First</li>
            <li>Shortest Remaining Time First</li>
            <li>Priority (Preemptive & Non-Preemptive)</li>
            <li>Round Robin with quantum input</li>
          </ul>
          <li>Gantt chart with idle time blocks</li>
          <li>Theme toggle for dark/light modes</li>
          <li>Responsive UI and animated transitions</li>
        </ul>
      </div>

      <div className="about-block">
        <div className="about-header">
          <LayoutDashboard className="about-icon" size={24} />
          <h3 className="about-subtitle">Tech Stack</h3>
        </div>
        <p className="about-text">
          Built using <strong>React</strong>, <strong>Redux</strong>, and modern CSS. It follows component-based architecture, uses animation and glassmorphism, and is fully responsive across devices.
        </p>
      </div>

      <div className="about-block">
        <div className="about-header">
          <Star className="about-icon" size={24} />
          <h3 className="about-subtitle">Future Enhancements</h3>
        </div>
        <ul className="about-list">
          <li>Job state saving to local storage</li>
          <li>Export Gantt chart as image</li>
          <li>Show system resource usage (CPU/memory)</li>
          <li>Allow custom scheduling algorithm modules</li>
        </ul>
      </div>

      <p className="about-footer">
        Crafted to simplify learning and visualizing scheduling logic. Whether you're exploring operating systems or building projects, this tool offers a clean, intuitive experience. 🚀
      </p>
    </section>
  );
};

export default About;


