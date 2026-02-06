import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToChat = () => {
    navigate("/chat");
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>AI-Powered Cyber Harassment & Abuse Detection Tool</h1>
      <p>
        Welcome! Detect abusive, toxic, or threatening messages in real-time
        and ensure safe conversations.
      </p>

      <button
        onClick={goToChat}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          backgroundColor: "#9b59b6",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Start Chat
      </button>
    </div>
  );
}

export default Home;
