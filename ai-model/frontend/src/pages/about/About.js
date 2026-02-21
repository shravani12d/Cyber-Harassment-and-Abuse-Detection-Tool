import "./About.css";

const About = () => {
  return (
    <div className="about-wrapper">

     {/* HERO SECTION */}
<section className="hero">
  <div className="hero-content">

    <div className="hero-text">
      <h1>About SafeTalk</h1>
      <p>
        An AI-powered Cyber Harassment and Abuse Detection Tool designed to 
        create safer digital communication environments through real-time 
        monitoring and intelligent intervention.
      </p>
    </div>

  </div>
</section>


      {/* FEATURE CARDS */}
     <section className="features">

  <div className="feature-card">
    <h3>🧠 AI-Based Abuse Detection</h3>
    <p>
      Every chat message is analyzed using an AI model that detects
      abusive language and harmful intent instantly.
    </p>
  </div>

  <div className="feature-card">
    <h3>⚡ Real-Time Intervention</h3>
    <p>
      Users receive warning popups with options to rephrase or send anyway,
      helping reduce harmful communication.
    </p>
  </div>

  <div className="feature-card">
    <h3>🔒 Automatic & Manual Safety Controls</h3>
    <p>
      The system auto-blocks users after three abusive messages and also
      provides manual block/unblock options.
    </p>
  </div>

  <div className="feature-card">
    <h3>🛠️ Admin Panel Management</h3>
    <p>
      Centralized dashboard for monitoring users, reviewing flagged content,
      generating downloadable reports, managing abuse evidences and blocked users.
    </p>
  </div>

</section>


      {/* SYSTEM WORKFLOW SECTION */}
      <section className="details">
        <h2>⚙️ How the System Works</h2>
        <ul>
          <li>Each chat message is analyzed by an AI-based abuse detection model.</li>
          <li>If abusive content is detected, a warning popup appears.</li>
          <li>User can choose: Rephrase Message or Send Anyway.</li>
          <li>Real-time alerts and safety recommendations are generated.</li>
          <li>After three abusive messages, the offender is automatically blocked.</li>
          <li>Users also have manual block and unblock controls.</li>
        </ul>
      </section>

      {/* ADMIN PANEL SECTION */}
      <section className="admin-section">
        <h2>🛠️ Admin Panel Features</h2>
        <ul>
          <li>
            <strong>Abuse Evidence Management:</strong> Stores abusive messages 
            with severity level, date, time, abuse count, and responsible user.
          </li>
          <li>
            <strong>Blocked Users Table:</strong> Displays username, block date, 
            block time, and reason for blocking.
          </li>
          <li>
            <strong>Dashboard Analytics:</strong> Shows total abusive messages, 
            total blocked users, and report generation timestamps.
          </li>
          <li>
            <strong>Downloadable Reports:</strong> Admins can download abuse 
            evidence and blocked user reports for analysis.
          </li>
        </ul>
      </section>

      {/* OBJECTIVE SECTION */}
      <section className="objective">
        <h2>🎯 Project Objective</h2>
        <p>
          The goal of SafeTalk is to demonstrate the ethical and practical use 
          of Artificial Intelligence in detecting cyber harassment, preventing 
          repeated abuse, and empowering both users and administrators to 
          maintain safer online interactions.
        </p>
      </section>
      {/* TECH STACK SECTION */}
<section className="tech-stack">
  <h2>💻 Tech Stack</h2>

  <div className="tech-grid">

    <div className="tech-card">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" />
      <p>Java</p>
    </div>

    <div className="tech-card">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot" />
      <p>Spring Boot</p>
    </div>

    <div className="tech-card">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
      <p>Python</p>
    </div>

    <div className="tech-card">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" />
      <p>Flask</p>
    </div>

    <div className="tech-card">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="ReactJS" />
      <p>ReactJS</p>
    </div>

    <div className="tech-card">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />
      <p>MySQL</p>
    </div>

  </div>
</section>


    </div>
  );
};

export default About;
