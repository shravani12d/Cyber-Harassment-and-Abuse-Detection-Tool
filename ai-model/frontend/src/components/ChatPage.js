// ChatPage.js
import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import Popup from "./Popup";

// ✅ Define getUserId here to fix "not defined" error
function getUserId(key) {
  let id = localStorage.getItem(key);
  if (!id) {
    id = key.toUpperCase() + "_" + Math.floor(Math.random() * 100000);
    localStorage.setItem(key, id);
  }
  return id;
}

function ChatPage() {
  const userId = getUserId("userId");          // logged-in user
  const strangerId = getUserId("strangerId"); // simulated sender

  const userName = "User";
  const strangerName = "Stranger";

  const [messages, setMessages] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [isStrangerBlocked, setIsStrangerBlocked] = useState(false);
  const [abuseCount, setAbuseCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [replyIndex, setReplyIndex] = useState(0);
  const [conversationStarted, setConversationStarted] = useState(false);

  const toxicReplies = [
    "hii loser😒!!",
    "You will.I saw your pic, and damn.🔥",
    "Chill! I'm being nice.You act like some celebrity😒",
    "You're just a cheap wannabe.Thinking you're hot.Lmao.",
    "You look like a witch!! bitch.",
    " Nobody will care about someone like you anyway.Just shut up.",
    "Go and die you piece of shit!!"
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

    if (sender === "other" && isStrangerBlocked) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "🚫 Stranger is blocked. Message not delivered.",
          time: currentTime,
        },
      ]);
      return;
    }

    if (sender === "other") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const strangerMsg = { sender, text, time: currentTime };
        setMessages((prev) => [...prev, strangerMsg]);
        handlePrediction(text, sender, currentTime);
      }, 1500);
      return;
    }

    const userMessage = { sender, text, time: currentTime, status: null };
    setMessages((prev) => [...prev, userMessage]);

    await handlePrediction(text, sender, currentTime, senderId, senderName, receiverId);
  };

  // ---------------- Handle Prediction ----------------
  const handlePrediction = async (text, sender, currentTime, senderId, senderName, receiverId) => {
    try {
      const response = await fetch("http://localhost:8080/abuse/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, senderId, senderName, receiverId }),
      });

      const data = await response.json();
      let recommendation = data.recommendation;

      // Override recommendation if user sends abusive message
      if (sender === "user" && data.abuseDetected) {
        if (data.severity === "High") {
          recommendation = " ⚠️Please avoid abusive language. This may lead to action.";
        } else if (data.severity === "Medium") {
          recommendation = "😐 That message seems inappropriate. Kindly keep it respectful.";
        } else {
          recommendation = "🙂 Please maintain a friendly tone.";
        }
      }

      const messageText = data.abuseDetected
        ? `🔥 Abuse Detected!\n🔍 Nature: ${data.labels.join(", ")}\n⚠️ Severity: ${data.severity}\n🛡️ Action: ${recommendation}`
        : "✅ Message is clean.";

      const botReply = { sender: "bot", text: messageText, time: currentTime };

      setMessages((prev) => {
        const updated = [...prev];
        for (let i = updated.length - 1; i >= 0; i--) {
          if (updated[i].sender === "user" && !updated[i].status) {
            updated[i] = { ...updated[i], status: "seen" };
            break;
          }
        }
        return [...updated, botReply];
      });

      if (sender === "user" && conversationStarted) {
        setTimeout(() => simulateStrangerReply(), 2000);
      }

      // Show popup for High severity messages from stranger
      if (sender === "other" && data.abuseDetected && data.severity === "High") {
        setPopupMessage(
          "🚨 This chat contains language that is considered abusive, threatening, or emotionally harmful.⚠️Do not engage."
        );
      }

      // Auto-block logic
      if (sender === "other" && data.abuseDetected && (data.severity === "High" || data.severity === "Medium")) {
        const newCount = abuseCount + 1;
        setAbuseCount(newCount);

        if (newCount >= 3 && !isStrangerBlocked) {
          setIsStrangerBlocked(true);
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: (
                <>
                  🚫 <b>Sender has been auto-blocked</b> for violating community guidelines.
                  <br />
                  You will no longer receive messages from this user.
                </>
              ),
              time: currentTime,
            },
          ]);
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error processing message.", time: currentTime },
      ]);
    }
  };

  // ---------------- Simulate Stranger ----------------
  const simulateStrangerReply = async () => {
    if (replyIndex >= toxicReplies.length || isStrangerBlocked) return;
    const reply = toxicReplies[replyIndex];
    setReplyIndex(replyIndex + 1);
    sendMessage(reply, "other");
    setConversationStarted(true);
  };

  // ---------------- Popup handler ----------------
  const closePopup = () => setPopupMessage("");

  // ---------------- Manual Block ----------------
  const handleBlock = () => {
    setIsStrangerBlocked(true);
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: (
          <>
            🔒 <b><i>Sender has been blocked successfully.</i></b>
          </>
        ),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
      },
    ]);
  };

  // ---------------- Manual Unblock ----------------
  const handleUnblock = () => {
    setIsStrangerBlocked(false);
    setAbuseCount(0);
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: (
          <>
            🔓 <b><i>Sender has been unblocked successfully.</i></b>
          </>
        ),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
      },
    ]);
  };

  // ---------------- JSX ----------------
  return (
    <div className="app">
      <h1>SafeChat 💭 - Abuse Detection simulation</h1>

      <ChatWindow messages={messages} isTyping={isTyping} />

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={simulateStrangerReply}
          style={{
            margin: "10px auto",
            padding: "8px 16px",
            backgroundColor: "#9b59b6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Simulate sender Message
        </button>

        {!isStrangerBlocked ? (
          <button
            onClick={handleBlock}
            style={{
              margin: "10px",
              padding: "8px 16px",
              backgroundColor: "#555",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Block Sender
          </button>
        ) : (
          <button
            onClick={handleUnblock}
            style={{
              margin: "10px",
              marginBottom: "20px",
              padding: "8px 16px",
              backgroundColor: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Unblock Sender
          </button>
        )}
      </div>

      <MessageInput onSend={sendMessage} />

      {popupMessage && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
}

export default ChatPage;
