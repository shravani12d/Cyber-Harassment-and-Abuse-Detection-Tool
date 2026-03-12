import React, { useState } from "react";
import ChatWindow from "../../components/ChatWindow";
import MessageInput from "../../components/MessageInput";
import Popup from "../../components/Popup";
import "./ChatPage.css";

// ---------------- User ID Helper ----------------
function getUserId(key) {
  let id = localStorage.getItem(key);
  if (!id) {
    id = key.toUpperCase() + "_" + Math.floor(Math.random() * 100000);
    localStorage.setItem(key, id);
  }
  return id;
}

function ChatPage() {
  const userId = getUserId("userId");
  const strangerId = getUserId("strangerId");

  const userName = "User";
  const strangerName = "Stranger";

  const [messages, setMessages] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [isStrangerBlocked, setIsStrangerBlocked] = useState(false);
  const [abuseCount, setAbuseCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [replyIndex, setReplyIndex] = useState(0);

  // 🔥 Important states
  const [showAbuseWarning, setShowAbuseWarning] = useState(false);
  const [pendingRecommendation, setPendingRecommendation] = useState("");
  const [pendingMessage, setPendingMessage] = useState("");
  const [inputText, setInputText] = useState("");

  const toxicReplies = [
    "hii loser!!",
    "You will. I saw your pic.",
    "Chill! I'm being nice.",
    "You're just a cheap wannabe.",
    "You look like a witch!! bitch.",
    "Nobody will care about someone like you.",
    "Go and die you piece of shit!!",
  ];

  // ---------------- Send Message ----------------
  const sendMessage = async (text, sender = "user") => {
    const senderId = sender === "user" ? userId : strangerId;
    const senderName = sender === "user" ? userName : strangerName;
    const receiverId = sender === "user" ? strangerId : userId;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // 🚫 Blocked stranger
    if (sender === "other" && isStrangerBlocked) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "🚫 Sender is blocked.", time: currentTime },
      ]);
      return;
    }

  
    if (sender === "other") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { sender, text, time: currentTime }]);
        handlePrediction(text, sender, currentTime);
      }, 1500);
      return;
    }

    // 👤 USER → HOLD MESSAGE
// 👤 USER → HOLD MESSAGE (DO NOT SEND YET)
setPendingMessage(text);
setInputText("");

// Only run abuse detection
await handlePrediction(
  text,
  sender,
  currentTime,
  senderId,
  userName,
  receiverId
);

  };

  // ---------------- Handle Prediction ----------------
  const handlePrediction = async (
    text,
    sender,
    currentTime,
    senderId,
    senderName,
    receiverId
  ) => {
    try {
      const response = await fetch("http://localhost:8080/abuse/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, senderId, senderName, receiverId }),
      });

      const data = await response.json();

      let recommendation = "Please maintain respectful communication.";

      if (data.abuseDetected) {
        recommendation =
          sender === "user"
            ? "⚠️ Your message is abusive. Please avoid such language."
            : "⚠️ Abusive message detected. Avoid engagement or block sender.";
      }

      if(sender === "other" && data.abuseDetected && !isStrangerBlocked){
        setPopupMessage("⚠️ This sender looks abusive. Consider blocking them or stop engaging.");
      }
      if (
        sender === "other" &&
        data.abuseDetected &&
        (data.severity === "High" || data.severity === "Medium")
        
      ) {
        setAbuseCount((prev) => {
          const count = prev + 1;
          if (count === 3) {
  setIsStrangerBlocked(true);

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // ✅ SHOW IN CHATBOX
  setMessages((prev) => [
    ...prev,
    {
      sender: "bot",
      text: "🚫 User has been auto-blocked due to repeated abusive messages.",
      time,
    },
  ]);


  setPopupMessage(
    "🚫👤Sender auto-blocked after repeated abusive messages."
  );
}

          return count;
        });
      }

      
      if (data.abuseDetected && sender === "user") {
        setPendingRecommendation(
          `🔥 Abuse Detected
        🔍 Nature: ${data.labels.join(", ")}
        ⚠️ Severity: ${data.severity}
        🛡️ Recommendation: ${recommendation}`
        );
        setShowAbuseWarning(true);
        return;
      }

     )
if (sender === "user") {
  setMessages((prev) => [
    ...prev,
    {
      sender: "bot",
      text: data.abuseDetected
        ? `🔥 Abuse Detected\n🔍 Nature: ${data.labels.join(
            ", "
          )}\n⚠️ Severity: ${data.severity}\n🛡️ Recommendation: ⚠️ Avoid abusive language.`
        : "✅ Message is clean.",
      time: currentTime,
    },
  ]);
  return;
}


// 🤖 STRANGER MESSAGE FLOW
setMessages((prev) => [
  ...prev,
  {
    sender: "bot",
    text: data.abuseDetected
      ? `🔥 Abuse Detected
🔍 Nature: ${data.labels.join(", ")}
⚠️ Severity: ${data.severity}
🛡️ Recommendation: ${recommendation}`
      : "✅ Message is clean.",
    time: currentTime,
  },
]);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error processing message." },
      ]);
    }
  };

  // ---------------- Simulate Stranger ----------------
  const simulateStrangerReply = () => {
    if (replyIndex >= toxicReplies.length || isStrangerBlocked) return;
    sendMessage(toxicReplies[replyIndex], "other");
    setReplyIndex(replyIndex + 1);
  };
const handleBlock = () => {
  if (isStrangerBlocked) return;

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  setIsStrangerBlocked(true);

  setMessages((prev) => [
    ...prev,
    {
      sender: "bot",
      text: "🚫 User has been blocked.",
      time,
    },
  ]);
};

const handleUnblock = () => {
  if (!isStrangerBlocked) return;

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  setIsStrangerBlocked(false);

  setMessages((prev) => [
    ...prev,
    {
      sender: "bot",
      text: "🔓 User has been unblocked.",
      time,
    },
  ]);
};

  return (
    <div className="chat-layout">
      
      <div className="sidebar">
      <h2>🛡️SafeTalk 💭</h2>

      {!isStrangerBlocked ? (
        <button onClick={handleBlock} className="block-btn">
          🚫 Block
        </button>
      ) : (
        <button onClick={handleUnblock} className="unblock-btn">
          🔓 Unblock
        </button>
      )}

      <button onClick={simulateStrangerReply} className="simulate-btn">
        Simulate Message
      </button>
    </div>

    {/* RIGHT CHAT AREA */}
    <div className="chat-area">

      <div className="chat-header">
        Stranger
      </div>

      <div className="chat-body">
        <ChatWindow messages={messages} isTyping={isTyping} />
      </div>

      <div className="chat-footer">
        <MessageInput
          onSend={sendMessage}
          value={inputText}
          setValue={setInputText}
        />
      </div>

    </div>

  
    {popupMessage && (
      <Popup
        type="stranger"
        message={popupMessage}
        onClose={() => setPopupMessage("")}
      />
    )}

    {showAbuseWarning && (
      <Popup
        type="user"
        message="⚠️ This message looks abusive."
        onRephrase={() => {
          setShowAbuseWarning(false);
          setInputText(pendingMessage);
        }}
        onSendAnyway={() => {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  setMessages((prev) => [
    ...prev,
    { sender: "user", text: pendingMessage, time },
    { sender: "bot", text: pendingRecommendation, time },
  ]);

  setPendingMessage("");
  setPendingRecommendation("");
  setShowAbuseWarning(false);
}}
      />
    )}

  </div>
);
}

export default ChatPage;
