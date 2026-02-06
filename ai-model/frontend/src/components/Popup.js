import React from "react";
import "./popup.css";

function Popup({ type, message, onRephrase, onSendAnyway, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>🚨 Safety Alert</h3>
        <p>{message}</p>

        <div className="popup-actions">
          {type === "user" ? (
            <>
              <button onClick={onRephrase}>Rephrase</button>
              <button className="danger" onClick={onSendAnyway}>
                Send Anyway
              </button>
            </>
          ) : (
            <button onClick={onClose}>Got it</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;
