import React, { useState } from "react";
import ChatWindow from "../../components/ChatWindow";
import MessageInput from "../../components/MessageInput";
import Popup from "../../components/Popup";

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
    "hii loser😒!!",
    "You will. I saw your pic, and damn.🔥",
    "Chill! I'm being nice. You act like some celebrity😒",
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

    // 👤 STRANGER → send directly
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
    setPendingMessage(text);
    setInputText("");

    await handlePrediction(
      text,
      sender,
      currentTime,
      senderId,
      senderName,
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

  // optional popup (keep if you want)
  setPopupMessage(
    "🚫👤Sender auto-blocked after repeated abusive messages."
  );
}

          return count;
        });
      }

      // ⚠️ USER ABUSE → SHOW POPUP FIRST
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

      // NORMAL FLOW
      // ✅ CLEAN USER MESSAGE → SHOW USER MESSAGE FIRST
if (sender === "user" && !data.abuseDetected) {
  setMessages((prev) => [
    ...prev,
    { sender: "user", text, time: currentTime },
    { sender: "bot", text: "✅ Message is clean.", time: currentTime },
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

  return (
    <div className="app">
      <h1>SafeChat 💭 – Cyber Abuse Detection</h1>

      <ChatWindow messages={messages} isTyping={isTyping} />

      <MessageInput
        onSend={sendMessage}
        value={inputText}
        setValue={setInputText}
      />
       <div style={{ marginTop: "10px" }}>
  {!isStrangerBlocked ? (
    <button
      onClick={() => {
        setIsStrangerBlocked(true);
        setPopupMessage("");
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "🚫 Sender blocked." },
        ]);
      }}
      style={{
        background: "#e74c3c",
        color: "#fff",
        padding: "8px 10px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      🚫 Block User
    </button>
  ) : (
    <button
      onClick={() => {
        setIsStrangerBlocked(false);
        setAbuseCount(0);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "🔓 Sender unblocked." },
        ]);
      }}
      style={{
        background: "#2ecc71",
        color: "#fff",
        padding: "8px 12px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      🔓 Unblock Sender
    </button>
  )}
</div>

      <button onClick={simulateStrangerReply}>
        Simulate Sender Message
      </button>

      {/* Stranger popup */}
      {popupMessage && (
        <Popup
          type="stranger"
          message={popupMessage}
          onClose={() => setPopupMessage("")}
        />
      )}

      {/* User warning popup */}
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
