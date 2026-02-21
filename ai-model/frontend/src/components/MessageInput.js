import "./MessageInput.css" ;

const MessageInput = ({ onSend, value, setValue }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value.trim());
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
    <textarea
  className="chat-input"
  placeholder="Type your message..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  rows="2"
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      if (value.trim()) {
        onSend(value.trim());
        setValue(""); 
      }
    }
  }}
/>


      <button className="send-btn" type="submit">ᯓ➤</button>
    </form>
  );
};

export default MessageInput;
