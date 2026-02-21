import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import "./ChatWindow.css";


function ChatWindow({ messages, isTyping }) {
    const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="chat-window">
      <div className="message-list">
        


        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}

        {isTyping && (
    <div className="message-row stranger">
    <div className="avatar">S</div>
    <div className="chat-bubble stranger-bubble typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
)}
 <div ref={bottomRef}></div>

      </div>
    </div>
  );
}

export default ChatWindow;
