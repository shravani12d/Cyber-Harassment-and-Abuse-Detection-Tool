import { useState } from "react";

const MessageInput = ({ onSend, value, setValue }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value.trim());
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
