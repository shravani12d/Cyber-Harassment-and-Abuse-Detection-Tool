from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import re
import string
import nltk
import numpy as np
import random

from nltk.corpus import stopwords

nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

app = Flask(__name__)
CORS(app)

# Load model and vectorizer
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

LABELS = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']

# Text cleaner
def clean_text(text):
    text = text.lower()
    text = text.encode("ascii", errors="ignore").decode()
    text = re.sub(r"http\S+|www\S+|https\S+", '', text)
    text = re.sub(r'\@\w+|\#', '', text)
    text = re.sub(r'\d+', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    words = text.split()
    words = [word for word in words if word not in stop_words]
    return " ".join(words)

@app.route("/")
def home():
    return "🚀 Abuse Detection API is running!"

# 🔍 Abuse Detection
@app.route("/abuse/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        if not data or "text" not in data:
            return jsonify({"error": "Missing 'text' in request"}), 400

        raw_text = data["text"]
        cleaned = clean_text(raw_text)
        X = vectorizer.transform([cleaned])

        prediction = model.predict(X)[0]
        probs = model.predict_proba(X)

        labels_detected = [LABELS[i] for i, p in enumerate(prediction) if p == 1]
        abuse_detected = bool(labels_detected)

        confidence_scores = [probs[i][0][1] for i in range(len(LABELS)) if prediction[i]==1]
        confidence = round(float(np.mean(confidence_scores)), 2) if confidence_scores else 0.0

        HIGH_CONFIDENCE_THRESHOLD = 0.8
        LOW_CONFIDENCE_THRESHOLD = 0.5

        if not labels_detected or confidence < LOW_CONFIDENCE_THRESHOLD:
            severity = "Not Abusive"
            recommendation = "No action needed."
        elif confidence >= HIGH_CONFIDENCE_THRESHOLD:
            severity = "High"
            recommendation = "Immediately report and block the user."
        elif any(label in labels_detected for label in ["severe_toxic", "threat", "identity_hate"]):
            severity = "High"
            recommendation = "Immediately report and block the user."
        elif any(label in labels_detected for label in ["toxic", "obscene", "insult"]):
            severity = "Medium"
            recommendation = "Warn the user or report if repeated."

        return jsonify({
            "input": raw_text,
            "cleaned": cleaned,
            "abuseDetected": abuse_detected,
            "labels": labels_detected,
            "confidence": confidence,
            "severity": severity,
            "recommendation": recommendation
        })

    except Exception as e:
        return jsonify({"error": "Internal server error", "message": str(e)}), 500

# 🤖 Stranger Reply Simulation
@app.route("/abuse/simulate", methods=["POST"])
def simulate_reply():
    try:
        user_input = request.get_json().get("text", "").lower()

        # Dynamic reply logic
        if "hi" in user_input or "hello" in user_input:
            reply = random.choice([
                "What do you want?",
                "Yeah, hi whatever.",
                "Ugh, why are you texting me?"
            ])
        elif "how are you" in user_input:
            reply = random.choice([
                "Not your concern.",
                "Better without you.",
                "Mind your own business."
            ])
        elif "stop" in user_input or "leave" in user_input:
            reply = random.choice([
                "Why should I?",
                "Make me.",
                "I'll say whatever I want."
            ])
        else:
            fallback_replies=[
                "You're such a pain.",
                "Just shut up already.",
                "You're wasting my time.",
                "You're annoying.",
                "Nobody asked you.",
                "Don't act smart with me.",
                "Seriously, get lost.",
                "You sound so dumb.",
                "You think you're special?",
                "Grow up."
            ]
            reply = random.choice(fallback_replies)

        # Analyze the generated reply using model
        cleaned = clean_text(reply)
        X = vectorizer.transform([cleaned])
        prediction = model.predict(X)[0]
        probs = model.predict_proba(X)

        labels_detected = [LABELS[i] for i, p in enumerate(prediction) if p == 1]
        abuse_detected = bool(labels_detected)

        confidence_scores = [probs[i][0][1] for i in range(len(LABELS)) if prediction[i] == 1]
        confidence = round(float(np.mean(confidence_scores)), 2) if confidence_scores else 0.0

        # Determine severity and recommendation
        HIGH_CONFIDENCE_THRESHOLD = 0.8
        LOW_CONFIDENCE_THRESHOLD = 0.5

        if not labels_detected or confidence < LOW_CONFIDENCE_THRESHOLD:
            severity = "Not Abusive"
            recommendation = "No action needed."
        elif confidence >= HIGH_CONFIDENCE_THRESHOLD:
            severity = "High"
            recommendation = "Immediately report and block the user."
        elif any(label in labels_detected for label in ["severe_toxic", "obscene", "threat", "identity_hate"]):
            severity = "High"
            recommendation = "Immediately report and block the user."
        elif any(label in labels_detected for label in ["toxic", "insult"]):
            severity = "Medium"
            recommendation = "Warn the user or report if repeated."

        return jsonify({
            "reply": reply,
            "abuseDetected": abuse_detected,
            "labels": labels_detected,
            "confidence": confidence,
            "severity": severity,
            "recommendation": recommendation
        })

    except Exception as e:
        return jsonify({"error": "Simulation failed", "message":str(e)}),500
    # ✅ Run App
if __name__ == "__main__":
    app.run(debug=True)