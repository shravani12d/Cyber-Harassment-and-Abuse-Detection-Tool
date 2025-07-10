import "./ChatMessage.css";

const ChatMessage = ({ message }) => {
  const { text, sender, time, status, result } = message;

  const isUser = sender === "user";
  const isStranger = sender === "other";
  const isBot = sender === "bot";

  let rowClass = "message-row";
  if (isUser) rowClass += " user";
  else if (isStranger) rowClass += " stranger";
  else rowClass += " bot";

  const formattedLabels =
    result?.labels && result.labels.length > 0
      ? result.labels.join(", ")
      : "None";

  return (
    <div className={rowClass}>
      {/* Left Avatar */}
      {!isUser && <div className="avatar">{isStranger ? "S" : "🤖"}</div>}

      {/* Chat Bubble */}
      <div className={`chat-bubble ${isUser ? "user-bubble" : isStranger ? "stranger-bubble" : "bot-bubble"}`}>
        <div className="message-text">{text}</div>


        {/* Abuse Meta */}
        {isBot && result && (
          <div className="message-meta">
            <p><strong>Severity:</strong> {result.severity}</p>
            <p><strong>Labels:</strong> {formattedLabels}</p>
            <p><strong>Confidence:</strong> {result.confidence}</p>
            <p><strong>Recommendation:</strong> {result.recommendation}</p>
          </div>
        )}

        {/* Timestamp + Status (with tick icons) */}
        <div className="message-footer">
          <span className="timestamp">{time}</span>
        {isUser && status === "seen" &&( <span className ="status seen-tick">✓✓</span>)}
          
        </div>
      </div>

      {/* Right Avatar */}
      {isUser && <div className="avatar user-avatar">U</div>}
    </div>
  );
};

export default ChatMessage;
