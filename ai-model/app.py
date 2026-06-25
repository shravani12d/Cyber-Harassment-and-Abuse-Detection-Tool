from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
import csv
import io
import re
import string
import nltk
import numpy as np
import random
from transformers import DistilBertForSequenceClassification, DistilBertTokenizerFast
import torch
from nltk.corpus import stopwords


MODEL_PATH = r"C:\Users\ASUS\OneDrive\Desktop\CyberHarassmentAbuseDetectionTool\ai-model\saved_model"


model = DistilBertForSequenceClassification.from_pretrained(MODEL_PATH)
tokenizer = DistilBertTokenizerFast.from_pretrained(MODEL_PATH)
model.eval()
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

app = Flask(__name__)
CORS(app)


LABELS = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']

SEXUAL_KEYWORDS = [
    "nude",
    "nudes",
    "send nudes",
    "send me pictures",
    "send pics",
    "send photos",
    "show me your body",
    "sexy body",
    "sleep with you",
    "have sex",
    "hook up",
    "kiss me",
    "hot babe",
    "hot girl",
    "come to my room",
    "you look so hot",
    "you are hot",
    "you're hot",
    "come over tonight"
]

def detect_sexual_harassment(text):
    text = text.lower()

    for keyword in SEXUAL_KEYWORDS:
        if keyword in text:
            return True

    return False
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

def predict_labels(text):
    inputs = tokenizer(
        text,
        return_tensors="pt",
        padding=True,
        truncation=True,
        max_length=128
    )

    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.sigmoid(outputs.logits)[0]

    preds = (probs > 0.5).int().tolist()

    labels_detected = [LABELS[i] for i, p in enumerate(preds) if p == 1]

    if detect_sexual_harassment(text):
        labels_detected.append("sexual_harassment")

    labels_detected = list(set(labels_detected))

    abuse_detected = bool(labels_detected)

    confidence_scores = [probs[i].item() for i, p in enumerate(preds) if p == 1]
    confidence = round(float(np.mean(confidence_scores)), 2) if confidence_scores else 0.0

    return labels_detected, abuse_detected, confidence
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
        labels_detected, abuse_detected, confidence = predict_labels(raw_text)

        HIGH_CONFIDENCE_THRESHOLD = 0.8
        LOW_CONFIDENCE_THRESHOLD = 0.5

        if not labels_detected:
             severity = "Not Abusive"
             recommendation = "No action needed."

        elif "sexual_harassment" in labels_detected:
             severity = "High"
             recommendation = "Immediately report and block the user."

        elif confidence < LOW_CONFIDENCE_THRESHOLD:
             severity = "Not Abusive"
             recommendation = "No action needed."

        elif confidence >= HIGH_CONFIDENCE_THRESHOLD:
             severity = "High"
             recommendation = "Immediately report and block the user."

        elif any(label in labels_detected for label in [
    "severe_toxic",
    "threat",
    "identity_hate"
]):
         severity = "High"
         recommendation = "Immediately report and block the user."

        elif any(label in labels_detected for label in ["toxic", "obscene", "insult"]):
          severity = "Medium"
          recommendation = "Warn the user or report if repeated."
        else:
          severity = "Not Abusive"
          recommendation = "No action needed."
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

# Stranger Reply Simulation
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

        # Analyzing the generated reply using model
        labels_detected, abuse_detected, confidence = predict_labels(reply)

        
        # Determine severity and recommendation
        HIGH_CONFIDENCE_THRESHOLD = 0.8
        LOW_CONFIDENCE_THRESHOLD = 0.5

        if not labels_detected:
          severity = "Not Abusive"
          recommendation = "No action needed."

        elif "sexual_harassment" in labels_detected:
          severity = "High"
          recommendation = "Immediately report and block the user."

        elif confidence < LOW_CONFIDENCE_THRESHOLD:
          severity = "Not Abusive"
          recommendation = "No action needed."

        elif confidence >= HIGH_CONFIDENCE_THRESHOLD:
            severity = "High"
            recommendation = "Immediately report and block the user."
        elif any(label in labels_detected for label in [
             "severe_toxic",
             "obscene",
             "threat",
             "identity_hate"
]):
            severity = "High"
            recommendation = "Immediately report and block the user."
        elif any(label in labels_detected for label in ["toxic", "insult"]):
            severity = "Medium"
            recommendation = "Warn the user or report if repeated."
        else:
            severity = "Not Abusive"
            recommendation = "No action needed."

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
    
@app.route('/download_abuse_evidence')
def download_abuse_evidence():
    response= requests.get("http://localhost:8080/admin/logs",timeout = 5)
    data = response.json()
    if not data:
        return jsonify({"error": "No abuse evidence found"}), 404
    si = io.StringIO()
    cw = csv.DictWriter(si, fieldnames=data[0].keys())
    cw.writeheader()
    cw.writerows(data)
    output = io.BytesIO()
    output.write(si.getvalue().encode('utf-8'))
    output.seek(0)
    return send_file(output, mimetype='text/csv', as_attachment=True, download_name='abuse_evidence.csv')

@app.route('/download_blocked_users')
def download_blocked_users():
    response= requests.get("http://localhost:8080/admin/blocked-users",timeout= 5)
    data = response.json()
    if not data:
        return jsonify({"error": "No blocked users found"}), 404
    si = io.StringIO()
    cw = csv.DictWriter(si, fieldnames=data[0].keys())
    cw.writeheader()
    cw.writerows(data)
    output = io.BytesIO()
    output.write(si.getvalue().encode('utf-8'))
    output.seek(0)
    return send_file(output, mimetype='text/csv', as_attachment=True, download_name='blocked_users.csv')

if __name__ == "__main__":
    app.run(debug=True)
