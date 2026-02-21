import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-card">
        <h1>AI-Powered Cyber Harassment & Abuse Detection Tool</h1>

        <div className="typing-text">
          <ReactTyped
            strings={[
              "Chat in a safe environment.",
              "Detect abusive and toxic messages instantly.",
              "Ensure safer online conversations with AI.",
            ]}
            typeSpeed={40}
            backSpeed={25}
            loop
          />
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/chat")}
        >
          Start Chat
        </button>
      </div>
    </div>
  );
}

export default Home;
