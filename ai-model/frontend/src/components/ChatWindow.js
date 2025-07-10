import React from "react";
import "./ChatWindow.css";

function ChatWindow({ messages, isTyping }) {
  return (
    <div className="chat-window">
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.sender}`}>
            {msg.sender === "user" && (
              <>
                <div className="bubble user">{msg.text}</div>
                <div className="avatar user">U</div>
              </>
            )}

            {msg.sender === "other" && (
              <>
                <div className="avatar other">S</div>
                <div className="bubble other">{msg.text}</div>
              </>
            )}

            {msg.sender === "bot" && (
              <>
                <div className="avatar bot">🤖</div>
                <div className="bubble bot">{msg.text}</div>
              </>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="message-row other">
            <div className="avatar other">S</div>
            <div className="bubble other typing-indicator">Typing...</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatWindow;