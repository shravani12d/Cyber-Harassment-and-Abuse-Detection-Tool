import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About the Project</h1>

      <p>
        This project is an <strong>AI-powered Cyber Harassment and Abuse Detection Tool</strong>
        designed to identify, monitor, and control abusive behavior in online communication
        platforms. The system demonstrates how artificial intelligence can be integrated into
        real-time applications to promote safer digital interactions.
      </p>

      <h2>🧪 SafeChat – Simulation Module</h2>
      <p>
        <strong>SafeChat</strong> is a simulated real-time chat environment created to demonstrate
        how this tool can be integrated into social media platforms or chat applications.
        It showcases how abusive messages are detected, how alerts are generated, and how
        safety actions are enforced during live conversations between users.
      </p>

      <h2>⚙️ How the System Works</h2>
      <ul>
        <li>
          Every message sent in the chat is analyzed by an <strong>AI-based abuse detection model</strong>.
        </li>
        <li>
          If a user attempts to send an abusive message, a <strong>warning popup</strong> is shown
          with two options: <em>Rephrase Message</em> or <em>Send Anyway</em>.
        </li>
        <li>
          Abusive messages trigger <strong>real-time alerts and safety recommendations</strong> to the user.
        </li>
        <li>
         The User is provided with <strong>manual block and unblock controls</strong> to manage safety during the conversation.
        </li>
        <li>
          If a stranger sends <strong>three abusive messages</strong>, the system automatically
          blocks the offender.
        </li>
      </ul>

      <h2>🛠️ Admin Panel Features</h2>
      <p>
        The system includes a dedicated <strong>Admin Panel</strong> for monitoring and analysis:
      </p>

      <ul>
        <li>
          <strong>Abuse Evidence Management:</strong> Stores abusive messages along with severity,
          date & time, abuse count, and the user responsible.
        </li>
        <li>
          <strong>Blocked Users Table:</strong> Displays blocked users with username, block date,
          block time, and reason for blocking.
        </li>
        <li>
          <strong>Dashboard Analytics:</strong> Shows total abusive messages, total blocked users,
          and report generation timestamp.
        </li>
        <li>
          <strong>Downloadable Reports:</strong> Admins can download abuse evidence reports and
          blocked users reports for further analysis.
        </li>
      </ul>

      <h2>🎯 Project Objective</h2>
      <p>
        The primary objective of this project is to demonstrate a practical and ethical use of
        AI in detecting cyber harassment, preventing repeated abuse, and giving both users and
        administrators control over online safety.
      </p>

      <p style={{ marginTop: "20px", fontStyle: "italic" }}>
        A simulation-driven approach to building safer, smarter, and more responsible chat platforms.
      </p>
    </div>
  );
};

export default About;


